import os
import re

# Define the pages to process (H through Z)
pages = ['h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

# Define the domains/patterns to remove
prohibited_patterns = [
    r'<a href="[^"]*space\.com[^"]*"[^>]*>.*?</a>\s*',
    r'<a href="[^"]*nasa\.gov[^"]*"[^>]*>.*?</a>\s*',
    r'<a href="[^"]*smithsonianmag\.com[^"]*"[^>]*>.*?</a>\s*',
    r'<a href="[^"]*britannica\.com[^"]*"[^>]*>.*?</a>\s*',
    r'<a href="[^"]*nist\.gov[^"]*"[^>]*>.*?</a>\s*',
]

for page in pages:
    file_path = f'pages/{page}.html'
    if os.path.exists(file_path):
        print(f"Processing {file_path}...")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Remove prohibited links
        for pattern in prohibited_patterns:
            content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
        
        # Only write if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  Updated {file_path}")
        else:
            print(f"  No changes needed for {file_path}")
    else:
        print(f"File {file_path} not found")

print("Link removal complete!")
