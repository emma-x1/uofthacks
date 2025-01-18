from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/startSession', methods=['POST'])
def StartSession():
    with open("data.txt","w") as file:
        pass
    
@app.route('/current_data', methods=['POST'])
def CurrentData():
    data={}
    
    return jsonify(data)


@app.route('/analysis', methods=['POST'])
def Analysis():
    

if __name__ == '__main__':
    app.run(debug=True)