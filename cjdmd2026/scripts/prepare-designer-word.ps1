param(
    [string]$SvgPath = (Join-Path $PSScriptRoot '../assets/images/designer/gyeolhap-word.svg')
)

# Store SVG geometry once during authoring, rather than measuring thousands of paths on page load.
Add-Type -AssemblyName PresentationCore
$culture = [System.Globalization.CultureInfo]::InvariantCulture
$document = [System.Xml.XmlDocument]::new()
$document.PreserveWhitespace = $true
$document.Load((Resolve-Path -LiteralPath $SvgPath).Path)
$script:addedGlyphs = 0

function Get-Number($node, [string]$name) {
    $value = $node.GetAttribute($name)
    if (-not $value) { return 0.0 }
    return [double]::Parse($value, $culture)
}

function Get-IconBounds($node) {
    switch ($node.LocalName) {
        'path' { return [System.Windows.Media.Geometry]::Parse($node.GetAttribute('d')).Bounds }
        'polygon' { return [System.Windows.Media.Geometry]::Parse('M ' + $node.GetAttribute('points') + ' Z').Bounds }
        'polyline' { return [System.Windows.Media.Geometry]::Parse('M ' + $node.GetAttribute('points')).Bounds }
        'rect' { return [System.Windows.Rect]::new((Get-Number $node 'x'), (Get-Number $node 'y'), (Get-Number $node 'width'), (Get-Number $node 'height')) }
        'circle' {
            $r = Get-Number $node 'r'
            return [System.Windows.Rect]::new((Get-Number $node 'cx') - $r, (Get-Number $node 'cy') - $r, 2 * $r, 2 * $r)
        }
        'ellipse' {
            $rx = Get-Number $node 'rx'; $ry = Get-Number $node 'ry'
            return [System.Windows.Rect]::new((Get-Number $node 'cx') - $rx, (Get-Number $node 'cy') - $ry, 2 * $rx, 2 * $ry)
        }
        default {
            $bounds = [System.Windows.Rect]::Empty
            foreach ($child in $node.ChildNodes) {
                if ($child.NodeType -eq 'Element') { $bounds.Union((Get-IconBounds $child)) }
            }
            return $bounds
        }
    }
}

function Add-GlyphBounds($node) {
    if ($node.NodeType -ne 'Element' -or $node.LocalName -in @('defs', 'style')) { return }
    if ($node.HasAttribute('data-formation-team') -or $node.HasAttribute('data-formation-float') -or $node.HasAttribute('data-formation-glyph')) { return }
    $children = @($node.ChildNodes | Where-Object NodeType -eq Element)
    $containsMarked = $node.SelectNodes('.//*[@data-formation-team or @data-formation-float or @data-formation-glyph]').Count -gt 0
    if ($node.LocalName -eq 'svg' -or $children.Count -gt 32 -or $containsMarked) {
        foreach ($child in $children) { Add-GlyphBounds $child }
        return
    }
    if ($node.HasAttribute('transform') -or $node.SelectNodes('.//*[@transform]').Count) {
        throw 'Unexpected transformed glyph: bake its transform before preparing the artwork.'
    }
    $bounds = Get-IconBounds $node
    if ($bounds.IsEmpty -or $bounds.Width -le 0 -or $bounds.Height -le 0) { return }
    if ($children.Count -and ($bounds.Width -gt 650 -or $bounds.Height -gt 650)) {
        foreach ($child in $children) { Add-GlyphBounds $child }
        return
    }
    $values = @($bounds.X, $bounds.Y, $bounds.Width, $bounds.Height) | ForEach-Object { $_.ToString('0.####', $culture) }
    $node.SetAttribute('data-formation-glyph', ($values -join ' ') + ' 0')
    $script:addedGlyphs++
}

foreach ($node in $document.SelectNodes('//*[@data-formation-glyph]')) {
    $values = $node.GetAttribute('data-formation-glyph').Split(' ')
    if ([double]::Parse($values[2], $culture) -gt 650 -or [double]::Parse($values[3], $culture) -gt 650) {
        $node.RemoveAttribute('data-formation-glyph')
    }
}
Add-GlyphBounds $document.DocumentElement
$unmapped = $document.SelectNodes("//*[local-name()='path' or local-name()='polygon' or local-name()='ellipse' or local-name()='circle' or local-name()='rect'][not(ancestor-or-self::*[@data-formation-team or @data-formation-float or @data-formation-glyph])]")
if ($unmapped.Count) { throw "Unmapped visual shapes: $($unmapped.Count)" }
$settings = [System.Xml.XmlWriterSettings]::new()
$settings.Encoding = [System.Text.UTF8Encoding]::new($false)
$settings.Indent = $false
$writer = [System.Xml.XmlWriter]::Create((Resolve-Path -LiteralPath $SvgPath).Path, $settings)
try { $document.Save($writer) } finally { $writer.Dispose() }
Write-Output "Prepared $script:addedGlyphs glyph icons; every visible shape belongs to an animated icon."
