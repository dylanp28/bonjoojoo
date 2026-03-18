#!/usr/bin/env python3
"""
Professional Product Image Processor for BonJooJoo Jewelry
Removes grey backgrounds, applies clean cropping, and optimizes for luxury presentation
"""

import os
import sys
from PIL import Image, ImageFilter, ImageOps
import numpy as np
from pathlib import Path

def remove_background_and_crop(image_path, output_path, target_size=(1000, 1000)):
    """
    Process jewelry product image:
    1. Remove grey/white background
    2. Clean crop to jewelry only
    3. Add transparent or clean white background
    4. Resize to consistent dimensions
    """
    try:
        # Open image
        img = Image.open(image_path)
        img = img.convert("RGBA")
        
        # Convert to numpy array for processing
        data = np.array(img)
        
        # Define background color ranges to remove (grey/white)
        # Grey backgrounds (RGB values between 200-255 in all channels)
        grey_mask = (data[:, :, 0] >= 200) & (data[:, :, 1] >= 200) & (data[:, :, 2] >= 200)
        
        # Also catch lighter greys (RGB values between 180-220)
        light_grey_mask = (
            (data[:, :, 0] >= 180) & (data[:, :, 0] <= 220) &
            (data[:, :, 1] >= 180) & (data[:, :, 1] <= 220) &
            (data[:, :, 2] >= 180) & (data[:, :, 2] <= 220)
        )
        
        # Combine masks
        background_mask = grey_mask | light_grey_mask
        
        # Make background transparent
        data[background_mask] = [255, 255, 255, 0]  # Transparent
        
        # Convert back to PIL Image
        processed_img = Image.fromarray(data, "RGBA")
        
        # Get bounding box of non-transparent area
        bbox = processed_img.getbbox()
        
        if bbox:
            # Crop to content with some padding
            left, top, right, bottom = bbox
            width = right - left
            height = bottom - top
            
            # Add padding (10% of the smaller dimension)
            padding = min(width, height) * 0.1
            padding = int(padding)
            
            # Expand bbox with padding, but don't go outside image bounds
            img_width, img_height = processed_img.size
            left = max(0, left - padding)
            top = max(0, top - padding)
            right = min(img_width, right + padding)
            bottom = min(img_height, bottom + padding)
            
            # Crop to the padded bounding box
            cropped_img = processed_img.crop((left, top, right, bottom))
        else:
            # If no bounding box found, use original
            cropped_img = processed_img
        
        # Create a clean white background
        final_img = Image.new("RGB", target_size, "white")
        
        # Resize cropped image to fit within target size while maintaining aspect ratio
        cropped_img.thumbnail(target_size, Image.Resampling.LANCZOS)
        
        # Center the image on the white background
        paste_x = (target_size[0] - cropped_img.size[0]) // 2
        paste_y = (target_size[1] - cropped_img.size[1]) // 2
        
        # Paste the processed image onto the white background
        if cropped_img.mode == "RGBA":
            final_img.paste(cropped_img, (paste_x, paste_y), cropped_img)
        else:
            final_img.paste(cropped_img, (paste_x, paste_y))
        
        # Save the processed image
        final_img.save(output_path, "JPEG", quality=95, optimize=True)
        
        return True, f"Processed: {os.path.basename(image_path)}"
        
    except Exception as e:
        return False, f"Error processing {os.path.basename(image_path)}: {str(e)}"

def process_all_images(input_dir, target_size=(1000, 1000)):
    """Process all jewelry product images in the directory"""
    
    input_path = Path(input_dir)
    if not input_path.exists():
        print(f"Error: Directory {input_dir} does not exist")
        return
    
    # Get all JPEG files
    image_files = list(input_path.glob("*.jpg")) + list(input_path.glob("*.JPG"))
    
    if not image_files:
        print("No JPEG files found in the directory")
        return
    
    print(f"Found {len(image_files)} images to process")
    print(f"Target size: {target_size[0]}x{target_size[1]}")
    print("=" * 50)
    
    success_count = 0
    failed_count = 0
    
    for image_file in sorted(image_files):
        output_path = image_file  # Overwrite original (backup already created)
        
        success, message = remove_background_and_crop(str(image_file), str(output_path), target_size)
        
        if success:
            success_count += 1
            print(f"✅ {message}")
        else:
            failed_count += 1
            print(f"❌ {message}")
    
    print("=" * 50)
    print(f"Processing complete:")
    print(f"✅ Successfully processed: {success_count} images")
    print(f"❌ Failed: {failed_count} images")
    
    if failed_count == 0:
        print("\n🎉 All images processed successfully!")
        print("💎 Professional luxury presentation ready for bonjoojoo.com")

def main():
    """Main execution"""
    print("🔥 BonJooJoo Professional Image Processor")
    print("Removing grey backgrounds and optimizing for luxury presentation...")
    print()
    
    # Set paths
    products_dir = os.path.expanduser("~/.openclaw/workspace/bonjoojoo/public/images/products")
    
    if not os.path.exists(products_dir):
        print(f"Error: Products directory not found: {products_dir}")
        sys.exit(1)
    
    # Process images with 1000x1000 target size for professional presentation
    process_all_images(products_dir, target_size=(1000, 1000))

if __name__ == "__main__":
    main()