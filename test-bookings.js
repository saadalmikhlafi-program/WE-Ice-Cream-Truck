const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  console.log('Testing AI Booking Scenarios...');
  
  let customer = await prisma.customer.findFirst({ where: { email: 'test@example.com' } });
  if (!customer) {
    customer = await prisma.customer.create({
      data: { firstName: 'Test', lastName: 'User', email: 'test@example.com', phone: '123' }
    });
  }

  const scenarios = [
    { name: 'Standard valid inputs', eventDate: '2026-07-20', guests: '50' },
    { name: 'Human written date', eventDate: 'July 20th 2026', guests: '50' },
    { name: 'Slashes date, string guests', eventDate: '07/20/2026', guests: 'Fifty' },
    { name: 'ISO date, float guests', eventDate: '2026-08-01T14:00:00.000Z', guests: '100.5' },
    { name: 'Words for date, no guests', eventDate: 'next friday', guests: undefined },
    { name: 'Empty strings', eventDate: '', guests: '' },
    { name: 'Garbage date', eventDate: 'I do not know yet', guests: '10' },
    { name: 'Only numbers in date', eventDate: '12345678', guests: '200' },
    { name: 'Missing date key', guests: '100' },
  ];

  for (let i = 0; i < scenarios.length; i++) {
    const args = scenarios[i];
    try {
      const eDate = args.eventDate || '';
      const dateStr = eDate.includes('T') ? eDate : `${eDate}T00:00:00.000Z`;
      let parsedDate = new Date(dateStr);
      if (isNaN(parsedDate.getTime())) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        parsedDate = tomorrow;
      }

      let parsedGuests = parseInt(args.guests || '');
      if (isNaN(parsedGuests)) parsedGuests = 50;

      const booking = await prisma.booking.create({
        data: {
          bookingNumber: 'TEST-' + Math.floor(Math.random()*100000),
          customerId: customer.id,
          status: 'PENDING',
          eventDate: parsedDate,
          startTime: '12:00 PM',
          durationMins: 60,
          guests: parsedGuests,
          eventType: 'Test',
          totalAmount: 0,
        }
      });
      console.log(`✅ [${args.name}] Passed -> Saved Date: ${booking.eventDate.toISOString().split('T')[0]}, Guests: ${booking.guests}`);
    } catch (e) {
      console.error(`❌ [${args.name}] FAILED -> `, e.message);
    }
  }
}
test().catch(console.error).finally(() => prisma.$disconnect());
