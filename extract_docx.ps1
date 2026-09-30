Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead("Marvglobal_Freight_Brand_Website_Content.docx")
$entry = $zip.GetEntry("word/document.xml")
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xml = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

# Extract text inside <w:t> tags
$regex = [regex]'<w:t[^>]*>(.*?)</w:t>'
$matches = $regex.Matches($xml)
$output = foreach ($m in $matches) { $m.Groups[1].Value }
$fullText = $output -join "`n"
[System.IO.File]::WriteAllText("docx_extracted.txt", $fullText, [System.Text.Encoding]::UTF8)
Write-Output "Successfully extracted docx to docx_extracted.txt"
