from flask import Flask, render_template, jsonify, request, send_from_directory
import numpy as np
from scipy.spatial.transform import Rotation
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/convert', methods=['POST'])
def convert_rotation():
    data = request.json
    input_format = data['format']
    values = np.array(data['values'])
    
    try:
        # Create rotation object based on input format
        if input_format == 'euler':
            r = Rotation.from_euler('xyz', values, degrees=True)
        elif input_format == 'quaternion':
            r = Rotation.from_quat(values)
        elif input_format == 'matrix':
            r = Rotation.from_matrix(values.reshape(3, 3))
        elif input_format == 'axis-angle':
            angle = values[0]
            axis = values[1:]
            r = Rotation.from_rotvec(angle * axis / np.linalg.norm(axis))
        else:
            return jsonify({'error': 'Invalid format'}), 400

        # Convert to all formats
        return jsonify({
            'euler': r.as_euler('xyz', degrees=True).tolist(),
            'quaternion': r.as_quat().tolist(),
            'matrix': r.as_matrix().tolist(),
            'rotvec': r.as_rotvec().tolist()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# For local development
if __name__ == '__main__':
    app.run(debug=True)

# For Vercel serverless deployment
app = app.wsgi_app
