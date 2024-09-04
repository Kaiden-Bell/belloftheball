import os
import time


def get_last_value(folder_path):
    try:
        with open(os.path.join(folder_path, 'last_value.txt'), 'r') as file:
            return int(file.read().strip())
    except FileNotFoundError:
        return 0
    
def set_last_value(folder_path, value):
    with open(os.path.join(folder_path, 'last_value.txt'), 'w') as file:
        file.write(str(value))



def rename_files_in_folder(folder_path):
    val = get_last_value(folder_path)

    for filename in os.listdir(folder_path):
        if filename.endswith(".txt"):
            continue

        if not filename.startswith("image_"):
            file_extension = os.path.splitext(filename)[1]
            val += 1
            new_name = f"image_{val}{file_extension}"
            old_file = os.path.join(folder_path, filename)
            new_file = os.path.join(folder_path, new_name)
            os.rename(old_file, new_file)
            print(f"Renamed {filename} to {new_name}")
    set_last_value(folder_path, val)

if __name__ == "__main__":
    folders_to_watch = ["images/balloons", "images/weddings", "images/portfolio"]

    while True:
        for folder in folders_to_watch:
            rename_files_in_folder(folder)
        time.sleep(500)  # Check every 500 seconds
