import matplotlib.pyplot as plt
import numpy as np

data = {"entry1": {"date": "01-18-2025 7:02", "temperature": 36.8, "humidity": 52, "title":"studying for exam", "event": "have a math final on Tuesday, very worried about learning linear algebra."},
            "entry2": {"date": "01-18-2025 7:15","temperature": 37.2, "humidity": 57, "title":"job interview", "event": "preparing for job interview at Google, very nervous about technical questions."},
            "entry3": {"date": "01-18-2025 8:00", "temperature": 36.9, "humidity": 55, "title":"meeting with advisor", "event": "meeting with academic advisor to discuss course schedule, need to get into MATH135."},
            "entry4": {"date": "01-18-2025 12:30", "temperature": 37.1, "humidity": 58, "title":"lunch with friend", "event": "lunch with friend, feeling relaxed and happy."},
            "entry5": {"date": "01-18-2025 15:45", "temperature": 37.3, "humidity": 59, "title":"group project", "event": "working on group project, feeling stressed about team members not contributing."}}


temp_points = []
humidity_points = []
date_points = []

for entry, details in data.items():
    temp_points.append(details["temperature"])
    humidity_points.append(details["humidity"])
    date_points.append(details["date"])

plt.plot(date_points, temp_points, 'o', color='r', label='Temperature')
plt.plot(date_points, humidity_points, 'o', color='g', label='Humidity')
plt.show()
