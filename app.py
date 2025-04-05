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
    input_degrees = data.get('inputDegrees', True)
    output_degrees = data.get('outputDegrees', True)
    input_rotation_order = data.get('inputRotationOrder', 'xyz')
    output_rotation_order = data.get('outputRotationOrder', 'xyz')
    
    try:
        # Create rotation object based on input format
        if input_format == 'euler':
            r = Rotation.from_euler(input_rotation_order, values, degrees=input_degrees)
        elif input_format == 'quaternion':
            r = Rotation.from_quat(values)
        elif input_format == 'matrix':
            r = Rotation.from_matrix(values.reshape(3, 3))
        elif input_format == 'axis-angle':
            angle = values[0]
            axis = values[1:]
            # Normalize axis
            axis = axis / np.linalg.norm(axis)
            # Convert angle to radians if input is in degrees
            if input_degrees:
                angle = np.deg2rad(angle)
            r = Rotation.from_rotvec(angle * axis)
        else:
            return jsonify({'error': 'Invalid format'}), 400

        # Convert to all formats with specified output units
        euler = r.as_euler(output_rotation_order, degrees=output_degrees)
        quaternion = r.as_quat()  # returns in (x, y, z, w) format
        # Convert quaternion to (w, x, y, z) format
        quaternion = np.roll(quaternion, 1)
        matrix = r.as_matrix()
        rotvec = r.as_rotvec()
        
        # Convert rotvec to axis-angle format
        angle = np.linalg.norm(rotvec)
        axis = np.array([0.0, 0.0, 1.0]) if angle == 0 else rotvec / angle
        
        # Convert angle to degrees if requested
        if output_degrees:
            angle = np.rad2deg(angle)
        
        return jsonify({
            'euler': euler.tolist(),
            'quaternion': quaternion.tolist(),
            'matrix': matrix.tolist(),
            'axisAngle': {
                'angle': float(angle),
                'axis': axis.tolist()
            },
            'units': 'degrees' if output_degrees else 'radians',
            'outputRotationOrder': output_rotation_order
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# For local development
if __name__ == '__main__':
    app.run(debug=True)

# For Vercel serverless deployment
app = app.wsgi_app
