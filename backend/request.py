import requests 
import time 

def get_data():
    url = 'http://localhost:5000/startSession'
    data = {'event': "I was doing an online interview!", 'humidity': 50}
    response = requests.post(url, json=data)
    print(response.json())

def analysis(): 
    url = 'http://localhost:5000/analysis'
    data = {'event': "I was doing an online interview! ;)"}
    response = requests.post(url, json=data)
    print(response.json())

if __name__ == '__main__':
    get_data()
    time.sleep(3) 
    analysis()