Set-Location -Path .\csv
Get-ChildItem -Filter *.xlsx | Foreach-Object{
$NewName = $_.Name -replace "(.*) \([^\)]*\).xlsx","`$1.xlsx"
 Write-Host $NewName
Rename-Item -Path $_.FullName -NewName $NewName
 
}
Set-Location -Path ..