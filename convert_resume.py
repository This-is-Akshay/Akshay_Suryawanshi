import base64
import os

pdf_path = os.path.join(os.path.dirname(__file__), 'Akshay_Suryawanshi_Updated_CV.pdf')
js_path = os.path.join(os.path.dirname(__file__), 'resume-data.js')

with open(pdf_path, 'rb') as f:
    data = f.read()

b64 = base64.b64encode(data).decode('ascii')

with open(js_path, 'w') as f:
    f.write('// Resume PDF base64 data - Akshay_Suryawanshi_Updated_CV.pdf\n')
    f.write('// Auto-generated on 2026-07-10\n')
    f.write('var resumeBase64 = "')
    f.write(b64)
    f.write('";\n')

print(f'Done! Base64 size: {len(b64)} chars, PDF size: {len(data)} bytes')
