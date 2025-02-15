from mytest import myvariable

# import Flask class
from flask import Flask
from flask_cors import CORS

# Creates an instance of the flask class framework and saves it in a var "app" to be called later.
app = Flask(__name__)
CORS(app)

# Checking if myvariable is intact.
print(myvariable)

# app.route("/") creates a tab. Editing it creates a branch. So app.route("/hello") will display what you wrote at http://127.0.0.1:5000/hello
@app.route("/")
def endpoint():
    # Displays output from testing file at the endpoint.
    return (f"<p>{myvariable}</p>")

# allows the program to be opened by running file instead of using the terminal. debug=true refreshes website everytime a change is made.
if __name__ == "__main__":
   app.run(debug=False,host="0.0.0.0",port="5000")

