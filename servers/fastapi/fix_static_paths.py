import os
import re

def fix_static_paths(directory):
    """Replace all instances of incorrect static paths with /static in the given directory"""
    patterns = [
        (re.compile(r'/static'), '/static'),
        (re.compile(r'/static'), '/static'),
        (re.compile(r'/static'), '/static')
    ]
    
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.py'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r') as f:
                        content = f.read()
                    
                    original_content = content
                    modified_content = content
                    
                    for pattern, replacement in patterns:
                        modified_content = pattern.sub(replacement, modified_content)
                    
                    if modified_content != original_content:
                        print(f"Fixing paths in {file_path}")
                        with open(file_path, 'w') as f:
                            f.write(modified_content)
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    fix_static_paths(base_dir)
    print("Static path fixes completed.")