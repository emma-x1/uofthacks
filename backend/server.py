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


@app.route("/analysis", methods=["POST"])
@cross_origin()
def Analysis():
    data = request.json
    event = data["event"]
    title = data["title"]
    temp = []
    humidity = []
    date = []
    time = []

    with open("data.txt", "r") as file:
        for line in file:
            parts = line.strip().split(" ")
            temp.append(parts[0])
            humidity.append(parts[1])
            date.append(parts[2])
            time.append(parts[3])
            new_session = {}
            new_session["event"] = event
            new_session["date"] = date
            new_session["time"] = time
            new_session["humidity"] = humidity
            new_session["temperature"] = temp

    with open("sessions.json", "r") as file:
        json_data = json.load(file)
        json_data["sessions"].append(new_session)
        # write the new data back to the file
        file.close()
        with open("sessions.json", "w") as reopen:
            json.dump(json_data, reopen)
            reopen.close()

    # Make the openai request to actually make a recommendation based on the correct things

    response = {}

    import os


    import openai
    
    # read the api key from the environment
    with open(".env", "r") as file:
        os.environ["OPENAI_API_KEY"] = file.readline().strip()

    pastSessions = [] 
    with open("sessions.json", "r") as file:
        pastSessions = json.load(file)["sessions"]
        # remove the temperature data with the peak and min values
        for session in pastSessions:
            minTemp = min(session["temperature"])
            maxTemp = max(session["temperature"])
            minHum = min(session["humidity"])
            maxHum = max(session["humidity"])
            session["temperature"] = [minTemp, maxTemp]
            session["humidity"] = [minHum, maxHum] 
        

    openai.api_key = os.getenv("OPENAI_API_KEY")

    client = openai.Client()
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "developer",
                "content": "You are an analyst looking at data about a CS student's skin temperature and humidity, along with their corresponding events, to determine sources of stress.",
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"Here are the five most recent entries for the user's skin temperature, humidity, and associated events. Higher temperature and humidity is associated with a higher level of stress. Analyze these events and tell me about patterns in sources of stress. The data is as follows {data}. Then, give me three suggestions for how I could reduce this stress.",
                    }
                ],
            },
        ],
    )

    gpt = completion.choices[0].message.content

    response['gpt'] = gpt
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
