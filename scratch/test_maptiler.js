const https = require('https');
const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || "WZ8VL38FgUJGHkn2mlNa";
const lng1 = -71.0589, lat1 = 42.3601; // Boston
const lng2 = -71.8023, lat2 = 42.2626; // Worcester

const url = `https://api.maptiler.com/routes/v1/driving/${lng1},${lat1};${lng2},${lat2}?key=${apiKey}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    const json = JSON.parse(data);
    if(json.routes && json.routes.length > 0) {
      console.log("Distance (m):", json.routes[0].distance);
      console.log("Distance (miles):", json.routes[0].distance * 0.000621371);
    } else {
      console.log(json);
    }
  });
});
