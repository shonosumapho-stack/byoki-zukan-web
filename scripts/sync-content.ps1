$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$src = Join-Path $root "byoki_zukan\app\src\main\assets\diseases.json"
$dst = Join-Path $PSScriptRoot "..\public\assets\diseases.json"
Copy-Item -Force $src $dst
Write-Host "Synced diseases.json"
