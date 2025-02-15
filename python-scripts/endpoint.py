from mytest import myvariable
from api_handler import *

# import Flask class
from flask import Flask
from flask_cors import CORS

# Creates an instance of the flask class framework and saves it in a var "app" to be called later.
app = Flask(__name__)
CORS(app)

fetched_data = {
    "area": ui_area,
    "state": ui_state,
    "daypart": ui_daypart,
    "temperature": ui_temperature,
    "unit": ui_unit,
    "wind-speed": ui_windspeed,
    "wind-direction": ui_winddirection,
    "short-forecast": ui_shortforecast,
    "detailed-forecast": ui_detailedforecast
}

# app.route("/") creates a tab. Editing it creates a branch. So app.route("/hello") will display what you wrote at http://127.0.0.1:5000/hello
@app.route("/")
def endpoint():
    # Displays output from testing file at the endpoint.
    return (f"<p>{fetched_data}</p>")

# allows the program to be opened by running file instead of using the terminal. debug=true refreshes website everytime a change is made.
if __name__ == "__main__":
   app.run(debug=False,host="0.0.0.0",port="5000")

