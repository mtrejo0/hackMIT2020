from flask import Flask
from flask import jsonify
from flask_cors import CORS 
import requests

from analysis.texta import *


app = Flask(__name__)
CORS(app)



@app.route('/')
def main():

    response = {
        "message": "Server is running!"
    }
    return jsonify(response)


@app.route('/text/<id>')
def get_text(id):
    url = 'http://www.gutenberg.org/files/{}/{}-0.txt'.format(id,id)
    r = requests.get(url)
    text = r.text
    response = {
        "text" : text
    }
    return jsonify(response)

@app.route('/book/<id>')
def get_book(id):

    response = analyse_book(id)
    return jsonify(response)



if __name__ == "__main__":
    app.run(debug=True)