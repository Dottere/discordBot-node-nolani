"""
I was looking for a way to get the average colour value of an image in NodeJS but even after looking around for hours I couldn't find
a solution to my issue, so I turned to python and wrote this runnable script that takes in a URL argument of an image and returns
the average hex value as a JSON.
"""

# Imports
import cv2
import numpy as np
import sys, os
import math
import validators
import json
# Imports

SAVE_PATH = './tmp/avatarIMG.jpg' # The constant image path

# Download the image from the provided URL argument using cURL and save it to the specified constant path.
def download_image(url, SAVE_PATH):
    os.system(f'curl -s --output {SAVE_PATH} {url}') # Run the shell script.

# Take the downloaded image and feed it into the OpenCV library which with the use of Numpy will give an array of three RGB values.
# Those RGB values are then turned into HEX and then stored in a JSON file.
def return_average_rgbvalue_of_image(path):
	try:
		if (cv2.imread(path).any()): # If the image matrix is valid then progress.
			src_img = cv2.imread(path) # Read the image from specified path.
	except AttributeError: # If the image matrix is invalid then it returns a NoneType object which has no "*.any()" method raising an AttributeError which can be caught.
		print('Invalid image file')
		sys.exit()
	average_color_row = np.average(src_img, axis=0) # Average colour per rows of pixels from top to bottom.
	average_color = np.average(average_color_row, axis=0) # Average overall colour.
	rgb_values = tuple([math.floor(v) for v in average_color.tolist() if v in average_color.tolist()]) # Take the RGB values, floor each and put them into a tuple.

	rgb_dict = {
		"average_avatar_hex": f"{'#%02x%02x%02x' % (rgb_values)}" # Turn the RGB values inside the tuple into HEX, and assign it to a key for JSON use.
	}
	rgb_json = json.dumps(rgb_dict, indent=1) # Create the JSON object.

	with open('./tmp/avatarIMGaverage.json', 'w') as file:
		file.write(rgb_json) # Write the JSON element into file.
	file.close() # Always close the open statement! (I forgot the first time)

# The main entry to the program.
def main():
	try:
		image_url = str(sys.argv[1])
	except IndexError:
		print('Missing URL argument') # Check if the necessary argument is provided.
		sys.exit()
	finally:
		if not (validators.url(f'{sys.argv[1]}')):
			print('Not a valid URL') # Check if the argument provided is a valid URL
			sys.exit()

	download_image(image_url, SAVE_PATH) # Download.
	return_average_rgbvalue_of_image(SAVE_PATH) # Write value.

# Importing a module runs it, this line gets rid of unwanted behaviour by checking if the program is being improted or run directly.
if __name__ == '__main__':
	main() # Entry
