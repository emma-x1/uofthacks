from flask import Flask, request, jsonify
import json

app = Flask(__name__)

@app.route('/startSession', methods=['POST'])
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

@app.route('/submit_form', methods=['POST'])
def Form():
    data=request.json
    event_title=data["event_title"]
    event_description=data["event_description"]
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
            new_session["event_title"]=event_title
            new_session["event_description"]=event_description
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

    return jsonify({"Entry submitted"})

@app.route('/endSession', methods=['POST'])


if __name__ == '__main__':
    app.run(debug=True)