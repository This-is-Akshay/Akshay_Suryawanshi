"""Encode a CV PDF into resume-data.js as base64.

Usage:  python convert_resume.py <path-to-cv.pdf>

The PDF itself is never committed (*.pdf is in .gitignore) and should be
deleted after encoding. The site's "Download CV" button decodes the base64
in the browser and serves it as Akshay_Suryawanshi_CV.pdf.
"""
import base64
import datetime
import os
import sys

if len(sys.argv) != 2:
    sys.exit('Usage: python convert_resume.py <path-to-cv.pdf>')

pdf_path = sys.argv[1]
js_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'resume-data.js')

with open(pdf_path, 'rb') as f:
    data = f.read()

if not data.startswith(b'%PDF-'):
    sys.exit(f'{pdf_path} does not look like a PDF')

b64 = base64.b64encode(data).decode('ascii')

with open(js_path, 'w', encoding='ascii', newline='\n') as f:
    f.write('// Resume PDF base64 data (source PDF is not stored in the repo)\n')
    f.write(f'// Auto-generated on {datetime.date.today().isoformat()}\n')
    f.write('var resumeBase64 = "')
    f.write(b64)
    f.write('";\n')

# Round-trip check: decoded bytes must match the source PDF exactly
with open(js_path, encoding='ascii') as f:
    encoded = f.read().split('"')[1]
assert base64.b64decode(encoded) == data, 'Round-trip mismatch'

print(f'Done! Base64 size: {len(b64)} chars, PDF size: {len(data)} bytes (round-trip verified)')
