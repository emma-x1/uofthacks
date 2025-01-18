from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/startSession', methods=['POST'])
def StartSession():
    with open("data.txt","w") as file:
        pass

@app.route('/startSession', methods=['POST'])
def StartSession():

@app.route('/startSession', methods=['POST'])
def StartSession():
    

if __name__ == '__main__':
    app.run(debug=True)