from flask import Flask, request, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
import json, os
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin

from modules.handler import makeWebhookResult
from modules.check_disease import checkDisease

app = Flask(__name__, static_folder='doctorchatbot/build', static_url_path='')
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.sqlite"
db = SQLAlchemy(app)
CORS(app)

class AllData(db.Model):
    id = db.Column(db.String(10), primary_key=True)
    age = db.Column(db.Integer)
    email = db.Column(db.String(50))
    predict = db.Column(db.String(200))
    name = db.Column(db.String(50))
    problem = db.Column(db.String(200))
    symptom_duration = db.Column(db.String(50))
    solution = db.Column(db.String(1000))
    questions = db.Column(db.String(1000))
    other_symptoms = db.Column(db.String(1000))
    report = db.Column(db.String(1000))
    doctor = db.Column(db.String(50))

def truncateData():
    getDBdelete = AllData.query.filter_by(id="public").first()
    getDBdelete.age = 1
    getDBdelete.email = ""
    getDBdelete.predict = ": No Results as you haven't filled & submitted the Form!"
    getDBdelete.name = ""
    getDBdelete.problem = ""
    getDBdelete.symptom_duration = ""
    getDBdelete.solution = ""
    getDBdelete.questions = ""
    getDBdelete.other_symptoms = ""
    getDBdelete.report = ""
    getDBdelete.doctor = ""
    db.session.commit()

def getdata():
    getDBdata = AllData.query.filter_by(id="public").first()
    print("vvvvvvvvvvvvvvvvvv  DATA LOGS  vvvvvvvvvvvvvvvvvv\n")
    print(f"Age: {getDBdata.age}, Email: {getDBdata.email}, Predict: {getDBdata.predict}, Name: {getDBdata.name}, ")
    print(f"Problem: {getDBdata.problem}, Duration: {getDBdata.symptom_duration}, Solution: {getDBdata.solution}, ")
    print(f"Questions: {getDBdata.questions}, Symptoms: {getDBdata.other_symptoms}, Report: {getDBdata.report}, Doctor: {getDBdata.doctor}")
    print("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n")

@app.route('/')
@cross_origin()
def serve():
    print("---- Clearing Old Data (if any) ----")
    truncateData()
    getdata()
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/email', methods=['POST'])
@cross_origin()
def getEmail():
    getmail = request.get_json()
    print("---- Setting Email ----")
    getDBmail = AllData.query.filter_by(id="public").first()
    getDBmail.email = getmail["email"]
    db.session.commit()
    getdata()
    replymail = make_response(jsonify(getmail), 200)
    return replymail

@app.route('/report', methods=['POST'])
@cross_origin()
def getReport():
    getreport = request.get_json()
    print("---- Setting Age & Report Data ----")
    getDBreport = AllData.query.filter_by(id="public").first()
    getDBreport.age = int(getreport["age"])
    getDBreport.predict = checkDisease(getreport)
    db.session.commit()
    getdata()
    replyreport = make_response(jsonify(getreport), 200)
    return replyreport

@app.route('/webhook', methods=['POST'])
@cross_origin()
def webhook():
    incoming_response = request.get_json(silent=True, force=True)
    res = makeWebhookResult(db, AllData, incoming_response["queryResult"])
    getdata()
    res = json.dumps(res, indent=4)
    outgoing_response = make_response(res)
    outgoing_response.headers['Content-Type'] = 'application/json'
    return outgoing_response

@app.route('/clear', methods=['GET'])
@cross_origin()
def clear_chat():
    print("---- Deleting Data ----")
    truncateData()
    getdata()
    return { "clear": "success" }

if __name__ == "__main__":
    app.run()