import os
from utils.get_env import get_app_data_directory_env

def get_images_directory():
    images_directory = os.path.join("static", "images")
    os.makedirs(images_directory, exist_ok=True)
    return images_directory


def get_exports_directory():
    base_dir = get_app_data_directory_env() or "./app_data"
    export_directory = os.path.join(base_dir, "exports")
    os.makedirs(export_directory, exist_ok=True)
    return export_directory

def get_uploads_directory():
    base_dir = get_app_data_directory_env() or "./app_data"
    uploads_directory = os.path.join(base_dir, "uploads")
    os.makedirs(uploads_directory, exist_ok=True)
    return uploads_directory
