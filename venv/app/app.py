from flask import *
from flask_pymongo import *
import pymongo

import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

DATABASE_PASSWORD = os.environ.get("DATABASE_PASSWORD")

app = Flask(__name__)

mongo "mongodb+srv://cluster0-ro0el.mongodb.net/kmbti" --username administrator

connection_url = 'mongodb+srv://administrator:{}@cluster0-vp8rf.mongodb.net/kmbti?retryWrites=true&w=majority'.format(DATABASE_PASSWORD)

client = pymongo.MongoClient(connection_url)

# Database
Database = client.get_database('kmbti')
# Table (collection)
Table = Database.kmbti

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/my-result', methods=['GET', 'POST', 'PUT'])
def send_data():
    data = request.json
    mbti = data['mbti']
    age = data['age']

    def splits(word):
        return list(word)
    eachTypeArr = splits(mbti)

    totalStr = "totalType.{}".format(mbti)
    ageStr = "ageType.{}.{}".format(age, mbti)

    filter = {"item_id": "000"}
    newTotalValues = {"$inc": {totalStr: 1}}
    newAgeValues = {"$inc": {ageStr: 1}}

    Table.update_one(filter, newTotalValues)
    Table.update_one(filter, newAgeValues)
    for x in eachTypeArr:
        eachTypeStr = "ageEachType.{}.{}".format(age, x)
        print('eachTypeStr', eachTypeStr)
        newEachValues = {"$inc": {eachTypeStr: 1}}
        Table.update_one(filter, newEachValues)

    return render_template('index.html')

@app.route('/result/', methods=['GET'])
def findAll():
    query = Table.find()
    output = {}
    i = 0
    for x in query:
        output[i] = x
        output[i].pop('_id')
        i += 1
    return render_template('result.html', data=output)

@app.route('/apiv1/get-all-result/', methods=['GET'])
def getAll():
    query = Table.find({"item_id": "000"})
    output = {}
    i = 0
    for x in query:
        output[i] = x
        output[i].pop('_id')
        i += 1
    data = jsonify(output)
    return data

app.run(host='0.0.0.0')
