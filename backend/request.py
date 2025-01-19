import requests 

def get_data():
    url = 'http://localhost:5000/api'
    data = {'event': "I was doing an online interview!", 'humidity': 50}
    response = requests.post(url, json=data)

    print(response.json())

if __name__ == '__main__':
    get_data()