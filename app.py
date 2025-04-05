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
    input_degrees = data.get('inputDegrees', True)  # Default to degrees for backward compatibility
    output_degrees = data.get('outputDegrees', True)  # Default to degrees for backward compatibility
    
    try:
        # Create rotation object based on input format
        if input_format == 'euler':
            r = Rotation.from_euler('xyz', values, degrees=input_degrees)
        elif input_format == 'quaternion':
            r = Rotation.from_quat(values)
        elif input_format == 'matrix':
            r = Rotation.from_matrix(values.reshape(3, 3))
        elif input_format == 'axis-angle':
            angle = values[0]
            axis = values[1:]
            # Convert angle to radians if input is in degrees
            if input_degrees:
                angle = np.deg2rad(angle)
            r = Rotation.from_rotvec(angle * axis / np.linalg.norm(axis))
        else:
            return jsonify({'error': 'Invalid format'}), 400

        # Convert to all formats with specified output units
        euler = r.as_euler('xyz', degrees=output_degrees)
        quaternion = r.as_quat()
        matrix = r.as_matrix()
        rotvec = r.as_rotvec()
        
        # If output is in degrees, convert the angle part of rotvec
        if output_degrees:
            rotvec_angle = np.rad2deg(np.linalg.norm(rotvec))
            if rotvec_angle > 0:
                rotvec_axis = rotvec / np.linalg.norm(rotvec)
                rotvec = rotvec_axis * rotvec_angle
        
        return jsonify({
            'euler': euler.tolist(),
            'quaternion': quaternion.tolist(),
            'matrix': matrix.tolist(),
            'rotvec': rotvec.tolist(),
            'units': 'degrees' if output_degrees else 'radians'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# For local development
if __name__ == '__main__':
    app.run(debug=True)

# For Vercel serverless deployment
app = app.wsgi_app
