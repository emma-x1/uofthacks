import requests 

def get_data():
    url = 'http://localhost:5000/api'
    data = {'temperature': 25, 'humidity': 50}
    response = requests.post(url, json=data)

    print(response.json())

if __name__ == '__main__':
    get_data()