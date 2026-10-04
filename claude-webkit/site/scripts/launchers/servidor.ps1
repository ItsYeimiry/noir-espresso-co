$root = $PSScriptRoot
$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try { $listener.Start() } catch {
  Write-Host "No se pudo iniciar en el puerto $port. Cierra otras ventanas de esta web e intentalo de nuevo."
  Read-Host "Pulsa Enter para salir"
  exit 1
}
$mime = @{
  ".html" = "text/html; charset=utf-8"; ".js" = "text/javascript"; ".css" = "text/css"
  ".json" = "application/json"; ".txt" = "text/plain"; ".xml" = "application/xml"
  ".jpg" = "image/jpeg"; ".png" = "image/png"; ".svg" = "image/svg+xml"; ".ico" = "image/x-icon"
  ".webp" = "image/webp"; ".avif" = "image/avif"; ".woff2" = "font/woff2"; ".woff" = "font/woff"
}
Write-Host "Web abierta en http://localhost:$port/"
Write-Host "Para verla en ingles anade /en al final. Cierra esta ventana para detenerla."
Start-Process "http://localhost:$port/"
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  try {
    $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart("/")
    if ($rel -eq "") { $rel = "index.html" }
    $file = [IO.Path]::GetFullPath((Join-Path $root ($rel -replace "/", "\")))
    if (-not (Test-Path -LiteralPath $file -PathType Leaf) -and (Test-Path -LiteralPath "$file.html" -PathType Leaf)) { $file = "$file.html" }
    if ($file.StartsWith($root) -and (Test-Path -LiteralPath $file -PathType Leaf)) {
      $bytes = [IO.File]::ReadAllBytes($file)
      $ext = [IO.Path]::GetExtension($file).ToLower()
      if ($mime.ContainsKey($ext)) { $ctx.Response.ContentType = $mime[$ext] } else { $ctx.Response.ContentType = "application/octet-stream" }
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
    }
  } catch { }
  $ctx.Response.Close()
}
