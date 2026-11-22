"""
SVG to PNG Converter for LinkedIn Banners
Uses Selenium + Chrome headless to render SVG and capture as PNG
"""
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import os
import time

# Define paths
script_dir = os.path.dirname(os.path.abspath(__file__))
images_dir = os.path.join(script_dir, 'images')

# Files to convert
svg_files = [
    'linkedin-banner-dark.svg',
    'linkedin-banner-light.svg'
]

# LinkedIn banner dimensions
WIDTH = 1584
HEIGHT = 396

# Setup Chrome headless
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument(f"--window-size={WIDTH},{HEIGHT}")
chrome_options.add_argument("--hide-scrollbars")

print("Starting Chrome headless browser...")
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=chrome_options
)

try:
    for svg_file in svg_files:
        svg_path = os.path.join(images_dir, svg_file)
        png_file = svg_file.replace('.svg', '.png')
        png_path = os.path.join(images_dir, png_file)
        
        if os.path.exists(svg_path):
            print(f"Converting {svg_file} to {png_file}...")
            
            # Load SVG file in browser
            file_url = f"file:///{svg_path.replace(os.sep, '/')}"
            driver.get(file_url)
            time.sleep(1)  # Wait for render
            
            # Set viewport size exactly
            driver.set_window_size(WIDTH, HEIGHT)
            
            # Take screenshot
            driver.save_screenshot(png_path)
            print(f"  ✓ Saved: {png_path}")
        else:
            print(f"  ✗ File not found: {svg_path}")
finally:
    driver.quit()

print("\nConversion complete!")
