from flask import Flask, request, jsonify
import json
from flask_cors import CORS, cross_origin
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app) # allow CORS for all domains on all routes.

@app.route('/startSession', methods=['POST'])
@cross_origin()
def StartSession():
    with open("data.txt","w") as file:
        pass
    return jsonify({"message":"Session started"})
    
@app.route('/current_data', methods=['POST'])
def CurrentData():
    # read the current data from the file 
    temp=[]
    humidity=[]
    date=[]
    with open("data.txt","r") as file:
        for line in file:
            parts=line.strip().split(" ")
            temp.append(parts[0])
            humidity.append(parts[1])
            date.append(parts[2] + " " + parts[3])

    return jsonify({"temperature":temp, "humidity":humidity, "date":date})

@app.route('/analysis', methods=['POST'])
def Analysis():
    data=request.json
    event=data["event"]
    title = ... 
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
    
    with open("sessions.json","r") as file:
        json_data=json.load(file)
        json_data["sessions"].append(new_session)
        # write the new data back to the file
        file.close() 
        with open("sessions.json","w") as reopen:
            json.dump(json_data,reopen)
            reopen.close() 
        



    # Make the openai request to actually make a recommendation based on the correct things 
    
    return data

if __name__ == '__main__':
    app.run(debug=True)