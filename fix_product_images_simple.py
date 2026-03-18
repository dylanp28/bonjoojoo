#!/usr/bin/env python3
"""
Bonjoojoo Product Image Cleanup Script - Lightweight Version

This script processes all product images to fix:
- Grey backgrounds (convert to pure white)  
- Inconsistent cropping
- Poor quality and unprofessional presentation

Uses only Pillow (no OpenCV) for lightweight processing.

Author: Dylan_one_bot
Date: March 2025
"""

import os
import sys
from PIL import Image, ImageEnhance, ImageOps, ImageFilter
import shutil
from pathlib import Path

# Configuration
PRODUCTS_DIR = "/Users/dylanbot/.openclaw/workspace/bonjoojoo/public/images/products"
BACKUP_DIR = "/Users/dylanbot/.openclaw/workspace/bonjoojoo/public/images/products_backup"
OUTPUT_SIZE = (1200, 1200)  # Standard size for all product images
QUALITY = 92
BACKGROUND_COLOR = (255, 255, 255)  # Pure white

def setup_directories():
    """Create backup directory if it doesn't exist"""
    os.makedirs(BACKUP_DIR, exist_ok=True)
    print(f"✅ Backup directory ready: {BACKUP_DIR}")

def backup_original_images():
    """Backup all original images before processing"""
    print("📦 Creating backup of original images...")
    
    for filename in os.listdir(PRODUCTS_DIR):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            source = os.path.join(PRODUCTS_DIR, filename)
            destination = os.path.join(BACKUP_DIR, filename)
            
            if not os.path.exists(destination):
                shutil.copy2(source, destination)
                print(f"   Backed up: {filename}")

def remove_grey_background(image):
    """
    Remove grey/off-white backgrounds and replace with pure white
    Uses color replacement and threshold techniques
    """
    # Convert to RGBA for transparency work
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # Get image data
    data = image.getdata()
    new_data = []
    
    # Define grey/off-white threshold
    # Pixels with RGB values above these thresholds will be made white
    grey_threshold = 200  # Adjust this to catch more or fewer grey pixels
    
    for item in data:
        # Check if pixel is grey/off-white (all RGB values are high and similar)
        r, g, b, a = item[:4] if len(item) == 4 else (*item, 255)
        
        # Calculate if this is a background pixel (grey/off-white)
        is_background = (
            r >= grey_threshold and 
            g >= grey_threshold and 
            b >= grey_threshold and
            abs(r - g) < 30 and  # Colors are similar (not too colorful)
            abs(g - b) < 30 and 
            abs(r - b) < 30
        )
        
        if is_background:
            # Make it pure white
            new_data.append((255, 255, 255, 255))
        else:
            # Keep original pixel
            new_data.append((r, g, b, a))
    
    # Apply the new data
    image.putdata(new_data)
    
    # Convert back to RGB with white background
    white_bg = Image.new('RGB', image.size, BACKGROUND_COLOR)
    if image.mode == 'RGBA':
        white_bg.paste(image, mask=image.split()[-1])  # Use alpha channel as mask
        return white_bg
    else:
        return image.convert('RGB')

def smart_crop_jewelry(image):
    """
    Intelligently crop image to focus on jewelry
    """
    # Convert to grayscale to analyze content
    gray = image.convert('L')
    
    # Find the product by looking for darker pixels (jewelry)
    width, height = image.size
    pixels = list(gray.getdata())
    
    # Find bounding box of non-white content
    dark_pixels = []
    for y in range(height):
        for x in range(width):
            pixel_value = pixels[y * width + x]
            if pixel_value < 230:  # Not white/light grey
                dark_pixels.append((x, y))
    
    if not dark_pixels:
        # If no content found, return center crop
        return center_crop_square(image)
    
    # Calculate bounding box
    x_coords = [p[0] for p in dark_pixels]
    y_coords = [p[1] for p in dark_pixels]
    
    min_x, max_x = min(x_coords), max(x_coords)
    min_y, max_y = min(y_coords), max(y_coords)
    
    # Add padding (10% of content size)
    content_width = max_x - min_x
    content_height = max_y - min_y
    
    padding_x = max(20, int(content_width * 0.15))
    padding_y = max(20, int(content_height * 0.15))
    
    # Expand with padding
    crop_left = max(0, min_x - padding_x)
    crop_right = min(width, max_x + padding_x)
    crop_top = max(0, min_y - padding_y)
    crop_bottom = min(height, max_y + padding_y)
    
    # Make crop square by expanding shorter dimension
    crop_width = crop_right - crop_left
    crop_height = crop_bottom - crop_top
    
    if crop_width > crop_height:
        # Expand height
        diff = crop_width - crop_height
        crop_top = max(0, crop_top - diff // 2)
        crop_bottom = min(height, crop_bottom + diff // 2)
    else:
        # Expand width
        diff = crop_height - crop_width
        crop_left = max(0, crop_left - diff // 2)
        crop_right = min(width, crop_right + diff // 2)
    
    # Perform the crop
    return image.crop((crop_left, crop_top, crop_right, crop_bottom))

def center_crop_square(image):
    """Center crop to square as fallback"""
    width, height = image.size
    size = min(width, height)
    
    left = (width - size) // 2
    top = (height - size) // 2
    
    return image.crop((left, top, left + size, top + size))

def enhance_jewelry_image(image):
    """Enhance image specifically for jewelry photography"""
    
    # Very subtle contrast enhancement for jewelry
    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.03)  # Minimal contrast boost
    
    # Subtle sharpening to make details pop
    sharpness = ImageEnhance.Sharpness(image)
    image = sharpness.enhance(1.05)  # Light sharpening
    
    # Ensure good brightness
    brightness = ImageEnhance.Brightness(image)
    image = brightness.enhance(1.01)  # Very subtle brightness boost
    
    return image

def process_single_image(input_path, output_path):
    """Process a single product image"""
    try:
        with Image.open(input_path) as img:
            print(f"   📸 Processing: {os.path.basename(input_path)} ({img.size})")
            
            # Convert to RGB
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Step 1: Remove grey background
            img = remove_grey_background(img)
            
            # Step 2: Smart crop to focus on jewelry
            img = smart_crop_jewelry(img)
            
            # Step 3: Resize to standard size
            img = img.resize(OUTPUT_SIZE, Image.Resampling.LANCZOS)
            
            # Step 4: Enhance for jewelry
            img = enhance_jewelry_image(img)
            
            # Step 5: Save optimized
            img.save(
                output_path, 
                'JPEG',
                quality=QUALITY,
                optimize=True,
                progressive=True
            )
            
            return True
            
    except Exception as e:
        print(f"   ❌ Error processing {input_path}: {str(e)}")
        return False

def get_file_size_kb(path):
    """Get file size in KB"""
    return os.path.getsize(path) / 1024

def process_all_images():
    """Process all product images"""
    print("🎨 Starting image processing...")
    
    supported_formats = ('.jpg', '.jpeg', '.png', '.webp')
    processed = 0
    failed = 0
    total_size_before = 0
    total_size_after = 0
    
    # Get all image files
    image_files = [
        f for f in os.listdir(PRODUCTS_DIR) 
        if f.lower().endswith(supported_formats)
    ]
    
    total_files = len(image_files)
    print(f"📊 Found {total_files} images to process")
    
    for i, filename in enumerate(image_files, 1):
        print(f"\n🔄 [{i}/{total_files}] Processing {filename}")
        
        input_path = os.path.join(PRODUCTS_DIR, filename)
        
        # Track original size
        original_size = get_file_size_kb(input_path)
        total_size_before += original_size
        
        # Convert to .jpg if not already
        base_name = os.path.splitext(filename)[0]
        output_filename = f"{base_name}.jpg"
        output_path = os.path.join(PRODUCTS_DIR, output_filename)
        
        if process_single_image(input_path, output_path):
            processed += 1
            
            # Track new size
            new_size = get_file_size_kb(output_path)
            total_size_after += new_size
            
            print(f"   ✅ Success: {output_filename}")
            print(f"   📏 Size: {original_size:.1f} KB → {new_size:.1f} KB ({((new_size-original_size)/original_size*100):+.1f}%)")
            
            # Remove original if it was converted
            if filename != output_filename and os.path.exists(output_path):
                os.remove(input_path)
                print(f"   🗑️ Removed original: {filename}")
        else:
            failed += 1
            total_size_after += original_size  # Keep original size in calculation
    
    print(f"\n📈 Processing complete:")
    print(f"   ✅ Processed: {processed}")
    print(f"   ❌ Failed: {failed}")
    print(f"   📊 Success rate: {(processed/(processed+failed)*100):.1f}%")
    print(f"   💾 Total size: {total_size_before:.1f} KB → {total_size_after:.1f} KB")
    print(f"   📉 Size change: {((total_size_after-total_size_before)/total_size_before*100):+.1f}%")

def preview_sample_images():
    """Show sample of what will be processed"""
    print("🔍 Preview of images to be processed:")
    
    sample_files = [f for f in os.listdir(PRODUCTS_DIR) 
                   if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))][:5]
    
    for filename in sample_files:
        path = os.path.join(PRODUCTS_DIR, filename)
        try:
            with Image.open(path) as img:
                size_kb = get_file_size_kb(path)
                print(f"   📸 {filename}: {img.size} ({img.mode}) - {size_kb:.1f} KB")
        except Exception as e:
            print(f"   ❌ {filename}: Error - {e}")

def main():
    """Main execution function"""
    print("🚀 Bonjoojoo Product Image Cleanup Tool (Lightweight)")
    print("=" * 60)
    print(f"📁 Products directory: {PRODUCTS_DIR}")
    print(f"📁 Backup directory: {BACKUP_DIR}")
    print(f"📐 Target size: {OUTPUT_SIZE}")
    print(f"🎯 Target quality: {QUALITY}%")
    print()
    
    # Check if products directory exists
    if not os.path.exists(PRODUCTS_DIR):
        print(f"❌ Products directory not found: {PRODUCTS_DIR}")
        sys.exit(1)
    
    # Preview what we're working with
    preview_sample_images()
    
    # Auto-proceed for subagent execution
    print("\n✅ Auto-proceeding with image cleanup:")
    print("   • Backup all original images")
    print("   • Remove grey backgrounds")  
    print("   • Improve cropping and consistency")
    print("   • Resize to 1200x1200px")
    print("   • Optimize for web")
    
    # Setup and process
    setup_directories()
    backup_original_images()
    process_all_images()
    
    print("\n🎉 Image processing completed successfully!")
    print(f"📁 Original images backed up to: {BACKUP_DIR}")
    print(f"📁 Clean images ready in: {PRODUCTS_DIR}")
    print("\n🔧 Next steps:")
    print("   • Test the website to see improved images")
    print("   • Update any image components if needed")
    print("   • Consider WebP conversion for even better performance")

if __name__ == "__main__":
    main()