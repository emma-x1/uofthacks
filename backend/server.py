from flask import Flask, request, jsonify
import json

app = Flask(__name__)

@app.route('/startSession', methods=['POST'])
def StartSession():
    with open("data.txt","w") as file:
        pass
    
@app.route('/current_data', methods=['POST'])
def CurrentData():
   



@app.route('/analysis', methods=['POST'])
def Analysis():
    data=request.json
    event=data["event"]
    temp=[]
    humidity=[]
    date=[]
    time=[]

    with open("data.txt","r") as file:
        for line in file:
            parts=line.strip().split(" ")
            temp.append(parts[0])
            humidity.append(parts[1])
            date.append(parts[2])
            time.append(parts[3])
            new_session={}
            new_session["event"]=event
            new_session["date"]=date
            new_session["time"]=time
            new_session["humidity"]=humidity
            new_session["temperature"]=temp

    
    with open("session.json","r") as file:
        json_data=json.load(file)
        json_data["sessions"].append(new_session)
    return data

if __name__ == '__main__':
    app.run(debug=True)