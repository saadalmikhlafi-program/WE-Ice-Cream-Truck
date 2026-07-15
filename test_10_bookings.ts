import { prisma } from './src/lib/prisma';
import { sendBookingPendingEmail, sendOwnerNewBookingEmail } from './src/lib/email';

const testCases = [
  {
    firstName: "John",
    lastName: "Corporate",
    email: "test1.corporate@example.com",
    phone: "617-555-0101",
    eventType: "Corporate",
    eventDate: new Date("2026-08-10T00:00:00Z"),
    startTime: "12:00",
    address: "100 Financial Dist",
    city: "Boston",
    zip: "02110",
    guests: 250,
    totalAmount: 1200
  },
  {
    firstName: "Sarah",
    lastName: "Birthday",
    email: "test2.birthday@example.com",
    phone: "617-555-0102",
    eventType: "Birthday",
    eventDate: new Date("2026-08-12T00:00:00Z"),
    startTime: "15:00",
    address: "200 Suburb Ln",
    city: "Newton",
    zip: "02458",
    guests: 30,
    totalAmount: 350
  },
  {
    firstName: "Emily",
    lastName: "Wedding",
    email: "test3.wedding@example.com",
    phone: "617-555-0103",
    eventType: "Wedding",
    eventDate: new Date("2026-09-05T00:00:00Z"),
    startTime: "19:00",
    address: "300 Harbor Way",
    city: "Seaport",
    zip: "02210",
    guests: 120,
    totalAmount: 850
  },
  {
    firstName: "Principal",
    lastName: "Skinner",
    email: "test4.school@example.com",
    phone: "617-555-0104",
    eventType: "School",
    eventDate: new Date("2026-09-15T00:00:00Z"),
    startTime: "11:30",
    address: "400 Education Blvd",
    city: "Cambridge",
    zip: "02138",
    guests: 500,
    totalAmount: 2100
  },
  {
    firstName: "Mike",
    lastName: "Nightowl",
    email: "test5.party@example.com",
    phone: "617-555-0105",
    eventType: "Private Party",
    eventDate: new Date("2026-08-20T00:00:00Z"),
    startTime: "21:00",
    address: "500 Downtown St",
    city: "Boston",
    zip: "02108",
    guests: 50,
    totalAmount: 400
  },
  {
    firstName: "Jane",
    lastName: "Neighbor",
    email: "test6.community@example.com",
    phone: "617-555-0106",
    eventType: "Community",
    eventDate: new Date("2026-08-22T00:00:00Z"),
    startTime: "13:00",
    address: "600 Main St",
    city: "Somerville",
    zip: "02143",
    guests: 150,
    totalAmount: 600
  },
  {
    firstName: "Retail",
    lastName: "Manager",
    email: "test7.retail@example.com",
    phone: "617-555-0107",
    eventType: "Corporate",
    eventDate: new Date("2026-08-25T00:00:00Z"),
    startTime: "14:00",
    address: "700 Shopping Center",
    city: "Burlington",
    zip: "01803",
    guests: 300,
    totalAmount: 1500
  },
  {
    firstName: "Senior",
    lastName: "Class",
    email: "test8.grad@example.com",
    phone: "617-555-0108",
    eventType: "Graduation",
    eventDate: new Date("2027-06-15T00:00:00Z"),
    startTime: "16:00",
    address: "800 Campus Dr",
    city: "Wellesley",
    zip: "02481",
    guests: 100,
    totalAmount: 500
  },
  {
    firstName: "HR",
    lastName: "Dept",
    email: "test9.hr@example.com",
    phone: "617-555-0109",
    eventType: "Corporate",
    eventDate: new Date("2026-08-30T00:00:00Z"),
    startTime: "12:30",
    address: "900 Office Park",
    city: "Waltham",
    zip: "02451",
    guests: 80,
    totalAmount: 450
  },
  {
    firstName: "Mystery",
    lastName: "Client",
    email: "test10.other@example.com",
    phone: "617-555-0110",
    eventType: "Other",
    eventDate: new Date("2026-09-01T00:00:00Z"),
    startTime: "10:00",
    address: "1000 Secret Ave",
    city: "Brookline",
    zip: "02445",
    guests: 40,
    totalAmount: 300
  }
];

async function run() {
  const pkg = await prisma.package.findFirst();
  
  for (const tc of testCases) {
    console.log(`\n========================================`);
    console.log(`Executing: ${tc.eventType} - ${tc.firstName}`);
    
    try {
      let customer = await prisma.customer.findFirst({
        where: { email: tc.email }
      });
      if (!customer) {
        customer = await prisma.customer.create({
          data: {
            firstName: tc.firstName,
            lastName: tc.lastName,
            email: tc.email,
            phone: tc.phone,
            address: tc.address,
            city: tc.city,
            zip: tc.zip
          }
        });
      }

      const bookingNumber = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
      const booking = await prisma.booking.create({
        data: {
          bookingNumber,
          customerId: customer.id,
          packageId: pkg ? pkg.id : null,
          status: "PENDING_REVIEW",
          eventDate: tc.eventDate,
          startTime: tc.startTime,
          durationMins: 60,
          address: tc.address,
          city: tc.city,
          zip: tc.zip,
          guests: tc.guests,
          eventType: tc.eventType,
          totalAmount: tc.totalAmount,
        },
        include: { customer: true, package: true, vehicle: true }
      });

      console.log(`✅ Created DB Booking: ${bookingNumber}`);

      // SEND EMAILS
      await sendBookingPendingEmail(tc.email, tc.firstName, bookingNumber, {}, booking.id);
      await sendOwnerNewBookingEmail(booking);
      console.log(`📧 Emails sent successfully for ${bookingNumber}`);
      
    } catch (err) {
      console.error(`❌ Error:`, err);
    }
    
    // wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n🎉 All 10 test bookings completed.`);
}

run().catch(console.error).finally(() => prisma.$disconnect());
