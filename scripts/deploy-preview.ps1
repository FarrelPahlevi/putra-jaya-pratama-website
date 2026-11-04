param(
    [string]$Project = 'pjp-glass-preview'
)

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
Push-Location $root
try {
    Write-Host 'Building safe public preview...' -ForegroundColor Cyan
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) { throw 'BUILD_FAILED' }

    if (Test-Path (Join-Path $root 'dist\assets\pjp-preview')) {
        throw 'SECURITY_CHECK_FAILED: Unverified photographs found in public build.'
    }

    if (!(Test-Path (Join-Path $root 'dist\index.html'))) {
        throw 'DIST_INDEX_MISSING'
    }

    Write-Host 'Uploading to Cloudflare Pages...' -ForegroundColor Cyan
    & npx.cmd --yes wrangler@4 pages deploy dist --project-name $Project --branch main
    if ($LASTEXITCODE -ne 0) { throw 'CLOUDFLARE_DEPLOY_FAILED' }

    Write-Host 'Website: https://pjp-glass-preview.pages.dev/' -ForegroundColor Green
}
finally {
    Pop-Location
}
