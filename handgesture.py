import cv2
import time
import numpy as np
import mediapipe as mp
from PIL.FontFile import WIDTH
from mediapipe.python.solutions.hands import HandLandmark
from math import hypot
import screen_brightness_control as sbc
from pycaw.pycaw import AudioUtilities,IAudioEndpointVolume
from ctypes import cast,POINTER
from comtypes import CLSCTX_ALL

def main():
#acessing windows audio systems
    devices=AudioUtilities.GetSpeakers()
    interface= devices.Activate(IAudioEndpointVolume._iid_,CLSCTX_ALL,None)
    volume=cast(interface,POINTER(IAudioEndpointVolume))
    volrange=volume.GetVolumeRange()
    minvol,maxvol,_=volrange

    mpHands= mp.solutions.hands
    hands= mpHands.Hands(static_image_mode=False,max_num_hands=2,model_complexity=1,
                         min_detection_confidence=0.75,min_tracking_confidence=0.75)
#this captures camera frame
    draw= mp.solutions.drawing_utils
    cap = cv2.VideoCapture(0)
    try:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            frame = cv2.flip(frame, 1)
            frameRGB = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            processed= hands.process(frameRGB) #type ignore

            # if processed.multi_hand_landmarks:  # type: ignore
            print(processed.multi_hand_landmarks)

            left_landmark_list,right_landmark_list= get_left_landmarks(frame,processed,draw,mpHands)
            # brightness
            if right_landmark_list:
                left_distance = get_distance(frame, left_landmark_list)
                b_level = np.interp(left_distance, [50, 160], [0, 100])
                sbc.set_brightness(b_level)



              #volumeeeeeeee
            if left_landmark_list:
                right_distance = get_distance(frame, right_landmark_list)

                vol=np.interp(right_distance,[50,160],[minvol,maxvol])
                volume.SetMasterVolumeLevel(vol,None)





            cv2.imshow('frame', frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
    finally:
        cap.release()
        cv2.destroyAllWindows()
def get_left_landmarks(frame, processed, draw, hands_module):
    left_landmark_lists = []
    right_landmark_lists = []

    if processed.multi_hand_landmarks :
        for handlm in processed.multi_hand_landmarks:
            for idx, found_landmark in enumerate(handlm.landmark):
                height, width, _ =frame.shape
                x, y=int(found_landmark.x*width),int( found_landmark.y*height)

                if idx==4 or idx==8:
                    landmark=[idx,x,y]

                    if handlm==processed.multi_hand_landmarks[0]:
                        left_landmark_lists.append(landmark)

                    elif handlm == processed.multi_hand_landmarks[1]:
                        right_landmark_lists.append(landmark)

            draw.draw_landmarks(frame,handlm,hands_module.HAND_CONNECTIONS)


    return left_landmark_lists,right_landmark_lists

def get_distance(frame,landmark_list):
    if len(landmark_list)<2:
        return

    (x1,y1),(x2,y2)=(landmark_list[0][1],landmark_list[0][2]),\
        (landmark_list[1][1],landmark_list[1][2])

    cv2.circle(frame,(x1,y1),7,(0,255,0),cv2.FILLED)
    cv2.circle(frame, (x2, y2), 7, (0, 255, 0), cv2.FILLED)
    cv2.line(frame,(x1,y1),(x2,y2),(0,255,0),3)

    L=hypot(x2-x1,y2-y1)
    return L


if __name__ == '__main__':
    main()
