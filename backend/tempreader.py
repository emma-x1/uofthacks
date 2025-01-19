# write a python program that reads the serial stream from the arduino and write that data somewhere

import serial 
import time

arduino = serial.Serial(port='COM6', baudrate=9600)

def readTemp():
    data = arduino.readline()
    temp, hum = data.decode().split(' ')
    print(f'Temperature: {temp} Humidity: {hum}')

while True:
    readTemp()
    time.sleep(1)