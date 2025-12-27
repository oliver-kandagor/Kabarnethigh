import re
import json
import os

def parse_pdf_images_list(filepath):
    """
    Parses pdfimages -list output to map Image Index to Page Number.
    Returns: { image_index: page_number }
    """
    mapping = {}
    with open(filepath, 'r') as f:
        lines = f.readlines()

    # Skip header
    start_parsing = False
    for line in lines:
        if line.startswith('---'):
            start_parsing = True
            continue
        if not start_parsing:
            continue
            
        parts = line.split()
        if len(parts) < 4:
            continue
            
        # Format: page num type ...
        # Example: 64 288 image ...
        try:
            page_num = int(parts[0])
            # The second column is usually the image index (object number in stream order?)
            # Actually pdfimages -list col 2 is "num" (image number)
            image_num = int(parts[1])
            mapping[image_num] = page_num
        except ValueError:
            continue
            
    return mapping

def parse_magazine_text(filepath):
    """
    Parses pdftotext output (split by form feed) to map Page Number to Text.
    Returns: { page_number: text_content }
    """
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Split by form feed
    pages = content.split('\f')
    page_map = {}
    
    for i, text in enumerate(pages):
        # 1-based page index
        page_map[i + 1] = text.strip()
        
    return page_map

def generate_ts_data(image_map, text_map, output_file):
    """
    Generates a TypeScript file with the structured data.
    """
    # Group by Page
    pages_data = {}
    
    # Iterate through all known images in the map
    # We assume the files in src/assets/... named 'N.jpg' correspond to image_num N.
    # We should also check which files actually exist, but for now we trust the map corresponds to potential files.
    
    # But wait, the file system has '1.jpg', '2.jpg'. 
    # Do these correspond to 'image number' in pdfimages?
    # Usually `pdfimages -j` outputs `image-001.jpg`. The user might have renamed them or used a tool that names them `1.jpg`.
    # Let's assume filename number = image number.
    
    for img_num, page_num in image_map.items():
        if page_num not in pages_data:
            pages_data[page_num] = {
                "page": page_num,
                "text": text_map.get(page_num, ""),
                "images": []
            }
        
        # Check if file exists (conceptually, we just add the reference)
        # We'll use a glob import in the React mapping, but here we can just list the IDs.
        pages_data[page_num]["images"].append(img_num)

    # Convert to list and sort
    sorted_pages = sorted(pages_data.values(), key=lambda x: x['page'])
    
    # Generate TS content
    ts_content = "export interface MagazinePage {\n  page: number;\n  text: string;\n  images: number[];\n}\n\n"
    ts_content += "export const magazineData: MagazinePage[] = " + json.dumps(sorted_pages, indent=2) + ";"
    
    with open(output_file, 'w') as f:
        f.write(ts_content)

if __name__ == "__main__":
    img_map = parse_pdf_images_list('pdf_images.list')
    txt_map = parse_magazine_text('magazine_dump.txt')
    generate_ts_data(img_map, txt_map, 'src/data/magazine-data.ts')
    print("Data generated at src/data/magazine-data.ts")
