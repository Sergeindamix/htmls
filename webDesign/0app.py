import cv2
import numpy as np
from tkinter import *
 
root = Tk()
root.title("Video Player")
root.geometry("300x200")

# darle estilos a la ventana
root.configure(background='black')

 
# Function to open the video
def open_video():
    # Get the file name from the entry field
    file_name = entry_field.get()
    # Open the video file
    cap = cv2.VideoCapture(file_name)
    # Check if camera opened successfully
    if (cap.isOpened()== False): 
        print("Error opening video stream or file")
    # Read until video is completed
    while(cap.isOpened()):
        # Capture frame by frame
        ret, frame = cap.read()
        # Display the resulting frame
        cv2.imshow('Frame', frame)
        # Press Q on keyboard to  exit
        if cv2.waitKey(25) & 0xFF == ord('q'):
            break
    # When everything done, release the video capture object
    cap.release()
    # Closes all the frames
    cv2.destroyAllWindows()
 
# Create an entry field with "1.mp4" as default value
entry_field = Entry(root)
entry_field.insert(0, "1.mp4")
entry_field.place(x=10, y=10, width=100, height=25)
# Create a button to open the video
open_button = Button(root, text="Open Video", command=open_video)
open_button.place(x=10, y=50, width=100, height=25)
 
# Loop to run the application
root.mainloop()