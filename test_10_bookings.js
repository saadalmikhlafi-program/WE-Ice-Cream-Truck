import fetch from "node-fetch"; // requires node 18+ which has built-in fetch usually, we'll use global fetch

const API_URL = "http://localhost:3000/api/bookings";

const testCases = [
  {
    desc: "1. Corporate Event - Large Group",
    payload: {
      firstName: "John",
      lastName: "Corporate",
      email: "test1.corporate@example.com",
      phone: "617-555-0101",
      eventType: "Corporate",
      eventDate: "2026-08-10",
      startTime: "12:00",
      address: "100 Financial Dist",
      city: "Boston",
      zip: "02110",
      guests: 250,
      packageId: "cm5eajs8w00043b71x4xeqi0i", // Assuming generic package ID, will omit if fails or use dynamic
      notes: "Please arrive 30 mins early."
    }
  },
  {
    desc: "2. Birthday Party - Small",
    payload: {
      firstName: "Sarah",
      lastName: "Birthday",
      email: "test2.birthday@example.com",
      phone: "617-555-0102",
      eventType: "Birthday",
      eventDate: "2026-08-12",
      startTime: "15:00",
      address: "200 Suburb Ln",
      city: "Newton",
      zip: "02458",
      guests: 30,
      notes: "It's a surprise party!"
    }
  },
  {
    desc: "3. Wedding - Medium",
    payload: {
      firstName: "Emily",
      lastName: "Wedding",
      email: "test3.wedding@example.com",
      phone: "617-555-0103",
      eventType: "Wedding",
      eventDate: "2026-09-05",
      startTime: "19:00",
      address: "300 Harbor Way",
      city: "Seaport",
      zip: "02210",
      guests: 120,
      notes: "Serve dessert after dinner."
    }
  },
  {
    desc: "4. School Event - Huge",
    payload: {
      firstName: "Principal",
      lastName: "Skinner",
      email: "test4.school@example.com",
      phone: "617-555-0104",
      eventType: "School",
      eventDate: "2026-09-15",
      startTime: "11:30",
      address: "400 Education Blvd",
      city: "Cambridge",
      zip: "02138",
      guests: 500,
      notes: "Need 2 trucks if possible."
    }
  },
  {
    desc: "5. Private Party - Late Night",
    payload: {
      firstName: "Mike",
      lastName: "Nightowl",
      email: "test5.party@example.com",
      phone: "617-555-0105",
      eventType: "Private Party",
      eventDate: "2026-08-20",
      startTime: "21:00",
      address: "500 Downtown St",
      city: "Boston",
      zip: "02108",
      guests: 50,
      notes: "Music will be loud."
    }
  },
  {
    desc: "6. Community Block Party",
    payload: {
      firstName: "Jane",
      lastName: "Neighbor",
      email: "test6.community@example.com",
      phone: "617-555-0106",
      eventType: "Community",
      eventDate: "2026-08-22",
      startTime: "13:00",
      address: "600 Main St",
      city: "Somerville",
      zip: "02143",
      guests: 150,
      notes: ""
    }
  },
  {
    desc: "7. Customer Appreciation",
    payload: {
      firstName: "Retail",
      lastName: "Manager",
      email: "test7.retail@example.com",
      phone: "617-555-0107",
      eventType: "Corporate",
      eventDate: "2026-08-25",
      startTime: "14:00",
      address: "700 Shopping Center",
      city: "Burlington",
      zip: "01803",
      guests: 300,
      notes: "Handing out free ice cream to our shoppers."
    }
  },
  {
    desc: "8. Graduation Party",
    payload: {
      firstName: "Senior",
      lastName: "Class",
      email: "test8.grad@example.com",
      phone: "617-555-0108",
      eventType: "Graduation",
      eventDate: "2026-06-15", // Past date, let's make it future
      startTime: "16:00",
      address: "800 Campus Dr",
      city: "Wellesley",
      zip: "02481",
      guests: 100,
      notes: "Class of 2026!"
    }
  },
  {
    desc: "9. Employee Appreciation",
    payload: {
      firstName: "HR",
      lastName: "Dept",
      email: "test9.hr@example.com",
      phone: "617-555-0109",
      eventType: "Corporate",
      eventDate: "2026-08-30",
      startTime: "12:30",
      address: "900 Office Park",
      city: "Waltham",
      zip: "02451",
      guests: 80,
      notes: "Vegan options required."
    }
  },
  {
    desc: "10. Unknown/Other Event",
    payload: {
      firstName: "Mystery",
      lastName: "Client",
      email: "test10.other@example.com",
      phone: "617-555-0110",
      eventType: "Other",
      eventDate: "2026-09-01",
      startTime: "10:00",
      address: "1000 Secret Ave",
      city: "Brookline",
      zip: "02445",
      guests: 40,
      notes: "Special flavor requests."
    }
  }
];

// Ensure graduation is in the future
testCases[7].payload.eventDate = "2027-06-15";

async function run() {
  // First, get a valid package ID just to be safe
  let validPackageId = null;
  try {
    const pkgRes = await fetch("http://localhost:3000/api/packages");
    if (pkgRes.ok) {
      const data = await pkgRes.json();
      if (data && data.length > 0) {
         validPackageId = data[0].id;
      }
    }
  } catch (e) {
    console.log("Could not fetch packages", e);
  }

  for (const tc of testCases) {
    if (validPackageId) {
      tc.payload.packageId = validPackageId;
    }
    console.log(`\n========================================`);
    console.log(`Executing: ${tc.desc}`);
    
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tc.payload)
      });
      
      const text = await res.text();
      console.log(`Status: ${res.status}`);
      if (res.ok) {
        console.log(`✅ Success! Data: ${text.substring(0, 100)}...`);
      } else {
        console.error(`❌ Failed! Response: ${text}`);
      }
    } catch (err) {
      console.error(`❌ Error during fetch:`, err);
    }
    
    // Wait 2 seconds between bookings to not overwhelm the system/email API
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log(`\n🎉 All 10 test bookings completed.`);
}

run();
