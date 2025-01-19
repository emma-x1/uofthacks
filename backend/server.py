from flask import Flask, request, jsonify
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"

cors = CORS(app)  # allow CORS for all domains on all routes.


@app.route("/startSession", methods=["POST"])
@cross_origin()
def StartSession():
    with open("data.txt", "w") as file:
        pass
    return jsonify({"message": "Session started"})


@app.route("/current_data", methods=["POST"])
@cross_origin()
def CurrentData():
    # read the current data from the file
    temp = []
    humidity = []
    date = []
    line_count = 0
    with open("data.txt", "r") as file:
        first_date = file.readline().strip().split(" ")[2]
        # calculate the difference between the current date and the first date

        # get line count to noly do last 30 lines

        for line in file:
            line_count += 1

    with open("data.txt", "r") as file:
        curCount = 0
        for line in file:
            curCount += 1
            if curCount < line_count - 30:
                continue
            parts = line.strip().split(" ")
            temp.append(parts[0])
            humidity.append(parts[1])
            date.append(parts[2] + " " + parts[3])

    return jsonify({"temperature": temp, "humidity": humidity, "date": date})


@app.route("/get_sessions", methods=["POST"])
@cross_origin()
def GetSessions():
    with open("sessions.json", "r") as file:
        json_data = json.load(file)
        return json_data

@app.route('/analysis', methods=['POST'])
@cross_origin() 
def Analysis():

    data=request.json
    event_title=data["event_title"]
    event_description=data["event_description"]
    event_title=data["event_title"]
    event_description=data["event_description"]
    temp=[]
    humidity=[]
    date=[]
    time=[]

    with open("data.txt", "r") as file:
        for line in file:
            parts = line.strip().split(" ")
            temp.append(parts[0])
            humidity.append(parts[1])
            date.append(parts[2])
            time.append(parts[3])
            new_session={}
            new_session["title"]=event_title
            new_session["event"]=event_description
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
