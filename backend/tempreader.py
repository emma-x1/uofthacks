# write a python program that reads the serial stream from the arduino and write that data somewhere

import serial 
import datetime
import time

arduino = serial.Serial(port='COM6', baudrate=9600)

def readTemp():
    data = arduino.readline()
    temp, hum = (data.decode()).split(' ')
    currentTime=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f'Temperature: {temp} Humidity: {hum}')
    with open ("data.txt","a") as file:
        file.write(f"{temp} {hum.strip()} {currentTime}")

while True:
    readTemp()
    time.sleep(1)