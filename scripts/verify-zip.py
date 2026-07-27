"""Validate the built theme zip before it is ever uploaded.

Windows zip builders write backslash separators, which PHP's unzip flattens --
WordPress then rejects the theme with "missing the style.css stylesheet". This
catches that (and a corrupt archive) locally instead of after a 22 MB upload.
"""
import sys
import zipfile

z = zipfile.ZipFile('ipekci-theme.zip')
names = z.namelist()

backslashes = [n for n in names if '\\' in n]
has_style = 'ipekci-theme/style.css' in names
corrupt = z.testzip()

print('entries:            ', len(names))
print('backslash entries:  ', len(backslashes), '(must be 0)')
print('style.css at root:  ', has_style)
print('CRC check:          ', 'OK' if corrupt is None else 'CORRUPT: ' + corrupt)
print('sample entry:       ', names[0])

ok = not backslashes and has_style and corrupt is None
print('\nVERDICT:', 'zip is deployable' if ok else 'ZIP IS BROKEN — do not upload')
sys.exit(0 if ok else 1)
