from flask import Flask, request, jsonify, redirect
import os
from flask.helpers import flash 
from werkzeug.utils import secure_filename
import subprocess as sp

app = Flask(__name__)
app.config["DEBUG"] = True

UPLOAD_FOLDER = '/Users/Satyam Agnihotri/cnote/FlaskAPI/UPLOAD_FOLDER'
ALLOWED_EXTENSIONS = set(['pdf', 'png', 'jpg', 'jpeg'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET'])
def hello():
    return 'Hello'

@app.route('/image', methods=['POST'])
def process_image():
    # check if the post request has the file part
    if 'image' not in request.files:
            flash('No file part')
            return redirect(request.url)
    file = request.files['image']
    print(file) # only required for debugging
    # if user does not select file, browser also submit a empty part without filename
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            print(filepath)

    result = sp.run(['cmd','/c','python', '/Users/Satyam Agnihotri/cnote/backend_MLmodel/ctc_predict.py','-image', filepath , '-model', '/Users/Satyam Agnihotri/cnote/backend_MLmodel/Models/semantic_model.meta','-vocabulary','/Users/Satyam Agnihotri/cnote/backend_MLmodel/Data/vocabulary_semantic.txt'], stdout=sp.PIPE, shell=True)
    semantic_music = result.stdout
    #converting byte to str
    semantic_music = semantic_music.decode("utf-8")
    print(semantic_music)
    #checking if semantic_music is a str
    print(type(semantic_music))
    return jsonify({'msg':'success', 'prediction': semantic_music}) 

app.run()

