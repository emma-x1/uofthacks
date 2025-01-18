import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')

data = {"entry1": {"temperature": 36.8, "humidity": 52, "title":"studying for exam", "event": "have a math final on Tuesday, very worried about learning linear algebra."},
            "entry2": {"temperature": 37.2, "humidity": 57, "title":"job interview", "event": "preparing for job interview at Google, very nervous about technical questions."},
            "entry3": {"temperature": 36.9, "humidity": 55, "title":"meeting with advisor", "event": "meeting with academic advisor to discuss course schedule, need to get into MATH135."},
            "entry4": {"temperature": 37.1, "humidity": 58, "title":"lunch with friend", "event": "lunch with friend, feeling relaxed and happy."},
            "entry5": {"temperature": 37.3, "humidity": 59, "title":"group project", "event": "working on group project, feeling stressed about team members not contributing."}}

client = openai.Client()

def generateAnalysis(data):
        
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "developer", 
            "content": "You are an analyst looking at data about a CS student's skin temperature and humidity, along with their corresponding events, to determine sources of stress."},
            {
                "role": "user", 
                "content": [ 
                    {"type": "text",
                    "text": f"Here are the five most recent entries for the user's skin temperature, humidity, and associated events. Higher temperature and humidity is associated with a higher level of stress. Analyze these events and tell me about patterns in sources of stress. The data is as follows {data}. Then, give me three suggestions for how I could reduce this stress."
                    }]},
        ]
    )

    return (completion.choices[0].message.content)

print(generateAnalysis(data))