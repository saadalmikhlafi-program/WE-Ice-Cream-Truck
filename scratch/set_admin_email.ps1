$val = 'info@weicecreamtruck.com'
$tmpFile = "scratch\tmp_admin_email.txt"
Set-Content -Path $tmpFile -Value $val -Encoding ascii -NoNewline

try { npx vercel env rm ADMIN_EMAIL production -y 2>&1 | Out-Null } catch {}

Get-Content $tmpFile | npx vercel env add ADMIN_EMAIL production
Remove-Item $tmpFile -Force -ErrorAction SilentlyContinue
Write-Host "Done!"
