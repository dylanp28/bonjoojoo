#!/usr/bin/env python3
"""
Bonjoojoo Product Image Cleanup Script

This script processes all product images to fix:
- Grey backgrounds (convert to pure white)
- Inconsistent cropping
- Poor quality and unprofessional presentation
- Double borders and grey filler spaces

Author: Dylan_one_bot
Date: March 2025
"""

import os
import sys
from PIL import Image, ImageEnhance, ImageOps
from PIL.ImageFilter import GaussianBlur
import numpy as np
import cv2
from pathlib import Path
import shutil
from datetime import datetime

# Configuration
PRODUCTS_DIR = "/Users/dylanbot/.openclaw/workspace/bonjoojoo/public/images/products"
BACKUP_DIR = "/Users/dylanbot/.openclaw/workspace/bonjoojoo/public/images/products_backup"
OUTPUT_SIZE = (1200, 1200)  # Standard size for all product images
QUALITY = 95
BACKGROUND_COLOR = (255, 255, 255)  # Pure white
PADDING_PERCENT = 0.08  # 8% padding around the product

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

def remove_background_advanced(image):
    """
    Advanced background removal using multiple techniques
    """
    # Convert PIL to OpenCV
    img_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    
    # Method 1: Simple threshold for white/grey backgrounds
    gray = cv2.cvtColor(img_cv, cv2.COLOR_BGR2GRAY)
    
    # Find the background color (usually the most common color in corners)
    corners = [
        gray[0, 0], gray[0, -1], gray[-1, 0], gray[-1, -1],  # corner pixels
        np.mean(gray[0, :]),  # top edge
        np.mean(gray[-1, :]),  # bottom edge
        np.mean(gray[:, 0]),  # left edge
        np.mean(gray[:, -1])  # right edge
    ]
    bg_threshold = np.median(corners)
    
    # Create mask for background removal
    # Adjust threshold based on background brightness
    threshold_value = max(200, bg_threshold - 20)  # More aggressive for grey backgrounds
    
    _, mask = cv2.threshold(gray, threshold_value, 255, cv2.THRESH_BINARY)
    
    # Clean up the mask
    kernel = np.ones((3,3), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    
    # Apply GaussianBlur to smooth edges
    mask = cv2.GaussianBlur(mask, (3, 3), 0)
    
    # Convert back to PIL
    mask_pil = Image.fromarray(mask)
    
    # Create white background
    white_bg = Image.new('RGB', image.size, BACKGROUND_COLOR)
    
    # Composite: where mask is black (0), use original image; where white (255), use white background
    mask_normalized = ImageOps.invert(mask_pil)  # Invert so product areas are white
    result = Image.composite(image, white_bg, mask_normalized)
    
    return result

def smart_crop_to_content(image, padding_percent=PADDING_PERCENT):
    """
    Intelligently crop image to focus on the jewelry while maintaining aspect ratio
    """
    # Convert to grayscale for analysis
    gray = image.convert('L')
    
    # Find non-white pixels (the jewelry)
    np_img = np.array(gray)
    
    # Find bounding box of non-white content (anything darker than 240)
    non_white = np_img < 240
    coords = np.argwhere(non_white)
    
    if len(coords) == 0:
        # If no content found, return centered crop
        return center_crop_square(image)
    
    # Get bounding box
    y_min, x_min = coords.min(axis=0)
    y_max, x_max = coords.max(axis=0)
    
    # Add padding
    height, width = np_img.shape
    padding_x = int(width * padding_percent)
    padding_y = int(height * padding_percent)
    
    # Expand bounding box with padding
    x_min = max(0, x_min - padding_x)
    x_max = min(width, x_max + padding_x)
    y_min = max(0, y_min - padding_y)
    y_max = min(height, y_max + padding_y)
    
    # Calculate crop dimensions
    crop_width = x_max - x_min
    crop_height = y_max - y_min
    
    # Make it square by expanding the smaller dimension
    if crop_width > crop_height:
        diff = crop_width - crop_height
        y_min = max(0, y_min - diff // 2)
        y_max = min(height, y_max + diff // 2)
    else:
        diff = crop_height - crop_width
        x_min = max(0, x_min - diff // 2)
        x_max = min(width, x_max + diff // 2)
    
    # Crop the image
    cropped = image.crop((x_min, y_min, x_max, y_max))
    
    return cropped

def center_crop_square(image):
    """Fallback: center crop to square"""
    width, height = image.size
    size = min(width, height)
    
    left = (width - size) // 2
    top = (height - size) // 2
    right = left + size
    bottom = top + size
    
    return image.crop((left, top, right, bottom))

def enhance_image(image):
    """Enhance image quality while maintaining natural look"""
    
    # Slightly enhance contrast and sharpness for jewelry
    contrast_enhancer = ImageEnhance.Contrast(image)
    image = contrast_enhancer.enhance(1.05)  # Very subtle contrast boost
    
    # Subtle sharpness enhancement
    sharpness_enhancer = ImageEnhance.Sharpness(image)
    image = sharpness_enhancer.enhance(1.02)  # Very subtle sharpening
    
    # Ensure brightness is appropriate
    brightness_enhancer = ImageEnhance.Brightness(image)
    image = brightness_enhancer.enhance(1.02)  # Very slight brightness boost
    
    return image

def process_single_image(input_path, output_path):
    """Process a single product image"""
    try:
        # Open image
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            print(f"   📸 Processing: {os.path.basename(input_path)} ({img.size})")
            
            # Step 1: Remove grey background
            img_clean_bg = remove_background_advanced(img)
            
            # Step 2: Smart crop to focus on jewelry
            img_cropped = smart_crop_to_content(img_clean_bg)
            
            # Step 3: Resize to standard dimensions
            img_resized = img_cropped.resize(OUTPUT_SIZE, Image.Resampling.LANCZOS)
            
            # Step 4: Enhance image quality
            img_enhanced = enhance_image(img_resized)
            
            # Step 5: Save with optimization
            img_enhanced.save(
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

def process_all_images():
    """Process all product images"""
    print("🎨 Starting image processing...")
    
    supported_formats = ('.jpg', '.jpeg', '.png', '.webp')
    processed = 0
    failed = 0
    
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
        
        # Convert to .jpg if not already
        base_name = os.path.splitext(filename)[0]
        output_filename = f"{base_name}.jpg"
        output_path = os.path.join(PRODUCTS_DIR, output_filename)
        
        if process_single_image(input_path, output_path):
            processed += 1
            print(f"   ✅ Success: {output_filename}")
            
            # Remove original if it was converted to jpg
            if filename != output_filename and os.path.exists(output_path):
                os.remove(input_path)
                print(f"   🗑️ Removed original: {filename}")
        else:
            failed += 1
    
    print(f"\n📈 Processing complete:")
    print(f"   ✅ Processed: {processed}")
    print(f"   ❌ Failed: {failed}")
    print(f"   📊 Success rate: {(processed/(processed+failed)*100):.1f}%")

def analyze_image_before_after(filename):
    """Analyze a specific image before and after processing"""
    original_path = os.path.join(BACKUP_DIR, filename)
    processed_path = os.path.join(PRODUCTS_DIR, filename)
    
    if not os.path.exists(original_path) or not os.path.exists(processed_path):
        print(f"❌ Cannot find before/after files for {filename}")
        return
    
    with Image.open(original_path) as original:
        with Image.open(processed_path) as processed:
            print(f"\n📊 Analysis for {filename}:")
            print(f"   Original size: {original.size}")
            print(f"   Processed size: {processed.size}")
            print(f"   Original mode: {original.mode}")
            print(f"   Processed mode: {processed.mode}")
            
            # File size comparison
            orig_size = os.path.getsize(original_path) / 1024  # KB
            proc_size = os.path.getsize(processed_path) / 1024  # KB
            
            print(f"   Original file size: {orig_size:.1f} KB")
            print(f"   Processed file size: {proc_size:.1f} KB")
            print(f"   Size change: {((proc_size - orig_size) / orig_size * 100):+.1f}%")

def main():
    """Main execution function"""
    print("🚀 Bonjoojoo Product Image Cleanup Tool")
    print("=" * 50)
    print(f"📁 Products directory: {PRODUCTS_DIR}")
    print(f"📁 Backup directory: {BACKUP_DIR}")
    print(f"📐 Target size: {OUTPUT_SIZE}")
    print(f"🎯 Target quality: {QUALITY}%")
    print(f"🎨 Background color: White {BACKGROUND_COLOR}")
    print()
    
    # Check if products directory exists
    if not os.path.exists(PRODUCTS_DIR):
        print(f"❌ Products directory not found: {PRODUCTS_DIR}")
        sys.exit(1)
    
    # Setup directories
    setup_directories()
    
    # Backup original images
    backup_original_images()
    
    # Process all images
    process_all_images()
    
    print("\n🎉 Image processing completed!")
    print(f"📁 Backups saved to: {BACKUP_DIR}")
    print(f"📁 Processed images in: {PRODUCTS_DIR}")
    
    # Analyze a few examples
    print("\n🔍 Sample analysis:")
    sample_files = [f for f in os.listdir(PRODUCTS_DIR) 
                   if f.lower().endswith('.jpg')][:3]
    
    for sample in sample_files:
        analyze_image_before_after(sample)

if __name__ == "__main__":
    main()