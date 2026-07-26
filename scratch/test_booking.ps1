$json = @"
{
  "email": "saadalmikhlafi53@gmail.com",
  "otp": "000000",
  "name": "Test Saad",
  "phone": "617-555-0100",
  "date": "2026-08-15",
  "time": "14:00",
  "eventType": "Birthday Party",
  "address": "100 Main St",
  "city": "Boston",
  "zip": "02101",
  "distance": 5,
  "distanceFee": 0,
  "packageId": "truck-classic",
  "extraGuests": 0,
  "routingMode": "SINGLE",
  "basePrice": 390,
  "weekendFee": 0,
  "extraGuestFee": 0,
  "routingFee": 0,
  "totalAmount": 390
}
"@

try {
    $response = Invoke-RestMethod -Uri 'https://www.weicecreamtruck.com/api/bookings' -Method POST -Body $json -ContentType 'application/json'
    Write-Host "SUCCESS:"
    $response | ConvertTo-Json
} catch {
    Write-Host "ERROR: $($_.Exception.Message)"
    try {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Host "Response: $($reader.ReadToEnd())"
    } catch {}
}
