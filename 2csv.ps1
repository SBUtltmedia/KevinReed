& ((Split-Path $MyInvocation.InvocationName) + "\rename.ps1")
$files = Get-ChildItem ".\csv\*.xlsx"
foreach ($f in $files){node .\xlsx2csv.js "$f"}