from flask import Flask, request, jsonify
import subprocess as sp

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route('/image', methods=['POST'])
def process_image():
    file = request.files['image']
    img = Image.open(file.stream)
    semantic_music = sp.getoutput(['python ~/ctc_predict.py -image', img, '-model Models/semantic_model.meta -vocabulary Data/vocabulary_semantic.txt'])
    return jsonify({'msg':'success', 'prediction': semantic_music})

app.run()

