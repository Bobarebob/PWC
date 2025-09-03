import os
import re

# Define the specific link removals needed
removals = [
    # Format: (page_file, entry_name, link_text_to_remove)
    ('pages/e.html', 'Extremophiles', 'Smithsonian'),
    ('pages/p.html', 'Phosphine', 'Nature'),
    ('pages/s.html', 'Schmidt', 'ANU'),
    ('pages/s.html', 'SETI', 'Planetary Society'),
    ('pages/s.html', 'Second Law', 'Physics.org'),
    ('pages/k.html', 'K-T Extinction', 'Smithsonian'),
    ('pages/p.html', 'Perlmutter', 'Berkeley Lab'),
    ('pages/p.html', 'Proxima Centauri', 'ESO'),
    ('pages/p.html', 'Panspermia', 'Astrobiology Magazine'),
]

def remove_link_from_entry(file_path, entry_name, link_text):
    """Remove a specific link from an entry in an HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find the entry section
        entry_pattern = rf'<div class="term-entry"[^>]*>.*?<h2>{re.escape(entry_name)}.*?</h2>.*?</div>\s*</div>'
        entry_match = re.search(entry_pattern, content, re.DOTALL | re.IGNORECASE)
        
        if entry_match:
            entry_content = entry_match.group(0)
            
            # Remove the specific link
            link_pattern = rf'<a href="[^"]*"[^>]*class="external-link"[^>]*>.*?{re.escape(link_text)}.*?</a>\s*'
            updated_entry = re.sub(link_pattern, '', entry_content, flags=re.DOTALL | re.IGNORECASE)
            
            # Replace in the full content
            updated_content = content.replace(entry_content, updated_entry)
            
            # Write back to file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            
            print(f"Removed {link_text} link from {entry_name} in {file_path}")
        else:
            print(f"Entry {entry_name} not found in {file_path}")
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

# Process all removals
for page_file, entry_name, link_text in removals:
    if os.path.exists(page_file):
        remove_link_from_entry(page_file, entry_name, link_text)
    else:
        print(f"File {page_file} not found")

print("Specific link removal completed!")
