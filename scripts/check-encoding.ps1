$ErrorActionPreference = "Stop"

$patterns = @(
    "Ã",
    "Â",
    "â€",
    "â†",
    "ðŸ",
    "�"
)

$folders = @(
    ".\app",
    ".\components",
    ".\lib"
)

$extensions = @(
    ".tsx",
    ".ts",
    ".css",
    ".js",
    ".jsx"
)

$found = $false

foreach ($folder in $folders) {

    if (-not (Test-Path $folder)) {
        continue
    }

    $files = Get-ChildItem `
        -Path $folder `
        -Recurse `
        -File

    foreach ($file in $files) {

        if ($extensions -notcontains $file.Extension) {
            continue
        }

        $content =
            [System.IO.File]::ReadAllText(
                $file.FullName,
                [System.Text.Encoding]::UTF8
            )

        foreach ($pattern in $patterns) {

            if (
                $content.IndexOf(
                    $pattern,
                    [System.StringComparison]::Ordinal
                ) -ge 0
            ) {
                Write-Host `
                    "[ENCODING] $($file.FullName) contains '$pattern'" `
                    -ForegroundColor Red

                $found = $true
            }
        }
    }
}

if ($found) {
    Write-Host ""
    Write-Host "Encoding problems found." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[OK] Swedish text encoding looks clean." -ForegroundColor Green

exit 0
