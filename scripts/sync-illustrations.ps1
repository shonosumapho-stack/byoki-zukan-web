$ErrorActionPreference = "Stop"
$webRoot = Split-Path $PSScriptRoot -Parent
$diyRoot = Split-Path $webRoot -Parent
$src = Join-Path $diyRoot "byoki_zukan\app\src\main\res\drawable-nodpi"
$dst = Join-Path $webRoot "public\assets\illustrations"

if (-not (Test-Path $src)) {
    Write-Error "Android illustrations not found: $src"
}

@("parts", "diseases", "causes") | ForEach-Object {
    New-Item -ItemType Directory -Force -Path (Join-Path $dst $_) | Out-Null
}

$copied = 0
Get-ChildItem $src -Filter "*.png" | ForEach-Object {
    $name = $_.Name
    if ($name -match '^ill_parts_(.+)\.png$') {
        Copy-Item $_.FullName (Join-Path $dst "parts\$($Matches[1]).png") -Force
        $copied++
    }
    elseif ($name -match '^ill_diseases_(.+)\.png$') {
        Copy-Item $_.FullName (Join-Path $dst "diseases\$($Matches[1]).png") -Force
        $copied++
    }
    elseif ($name -match '^ic_cause_(.+)\.png$') {
        Copy-Item $_.FullName (Join-Path $dst "causes\$($Matches[1]).png") -Force
        $copied++
    }
    elseif ($name -eq "ill_body_map.png") {
        Copy-Item $_.FullName (Join-Path $dst "body-map.png") -Force
        $copied++
    }
}

Write-Host "Copied $copied illustration PNGs to public/assets/illustrations"
