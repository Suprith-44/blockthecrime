from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import binascii
from mcrpc import RpcClient
import base64
import hashlib

app = Flask(__name__)
CORS(app)

# MultiChain connection setup
rpc_host = 'localhost'
rpc_port = 6826
rpc_user = 'multichainrpc'
rpc_pass = 'GH1dRPLt4Mdq3SAbVBkFGYcGgqhX3ChjVQc9Scj6dEqX'
client = RpcClient(rpc_host, rpc_port, rpc_user, rpc_pass)

# Function to store data in the blockchain
def store_data(data, stream_name):
    try:
        client.create('stream', stream_name, True, {'subscribe': True})
        print(f"Created new stream: {stream_name}")
    except:
        print(f"Stream {stream_name} already exists")
    
    client.subscribe(stream_name)
    hex_data = binascii.hexlify(json.dumps(data).encode()).decode()
    key = data.get('email', 'DefaultKey')  # Use email as key for user data
    tx_id = client.publish(stream_name, key, hex_data)
    return tx_id

# Function to retrieve data from the blockchain
def get_data(stream_name, key):
    client.subscribe(stream_name)
    items = client.liststreamkeyitems(stream_name, key)
    if items:
        latest_item = items[-1]  # Get the most recent item
        hex_data = latest_item['data']
        json_str = binascii.unhexlify(hex_data).decode('utf-8')
        return json.loads(json_str)
    return None

@app.route('/signup', methods=['POST'])
def signup():
    try:
        name = request.json.get('name')
        email = request.json.get('email')
        password = request.json.get('password')
        
        # Hash the password
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        user_data = {
            'name': name,
            'email': email,
            'password': hashed_password
        }
        
        # Store user data in blockchain
        tx_id = store_data(user_data, 'UserDataStream')
        
        return jsonify({
            "message": "User registered successfully",
            "email": email,
            "transactionId": tx_id
        }), 200
    except Exception as e:
        print(f"Error processing signup: {str(e)}")
        return jsonify({"message": "Error processing signup", "error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        
        # Retrieve user data from blockchain
        user_data = get_data('UserDataStream', email)
        
        if user_data:
            stored_password = user_data['password']
            hashed_password = hashlib.sha256(password.encode()).hexdigest()
            
            if stored_password == hashed_password:
                return jsonify({
                    "message": "Login successful",
                    "name": user_data['name'],
                    "email": user_data['email']
                }), 200
            else:
                return jsonify({"message": "Invalid credentials"}), 401
        else:
            return jsonify({"message": "User not found"}), 404
    except Exception as e:
        print(f"Error processing login: {str(e)}")
        return jsonify({"message": "Error processing login", "error": str(e)}), 500

@app.route('/submit-complaint', methods=['POST'])
def submit_complaint():
    try:
        complaint_id = request.form.get('complaintId')
        date = request.form.get('date')
        place = request.form.get('place')
        description = request.form.get('description')

        # Handle file uploads
        evidence_files = []
        for key, file in request.files.items():
            if key.startswith('evidence_'):
                file_data = file.read()
                file_base64 = base64.b64encode(file_data).decode('utf-8')
                evidence_files.append({
                    'filename': file.filename,
                    'content': file_base64
                })

        # Prepare complaint data for blockchain storage
        complaint_data = {
            'id': complaint_id,
            'date': date,
            'place': place,
            'description': description,
            'evidence_files': evidence_files,
            'status': 'new'  # Initial status
        }

        # Store complaint data in blockchain
        tx_id = store_data(complaint_data, 'ComplaintDataStream')
        return jsonify({
            "message": "Complaint submitted successfully and stored in blockchain",
            "complaintId": complaint_id,
            "transactionId": tx_id
        }), 200
    except Exception as e:
        print(f"Error processing complaint: {str(e)}")
        return jsonify({"message": "Error processing complaint", "error": str(e)}), 500

@app.route('/get-complaint/<complaint_id>', methods=['GET'])
def get_complaint(complaint_id):
    try:
        stream_name = 'ComplaintDataStream'
        client.subscribe(stream_name)
        
        # Fetch all items from the stream
        items = client.liststreamitems(stream_name)
        
        # Find the complaint with the matching ID
        for item in items:
            hex_data = item['data']
            
            # Decode the hex data to get the original JSON string
            if isinstance(hex_data, str):  # Ensure hex_data is a string
                json_str = binascii.unhexlify(hex_data).decode('utf-8')
                
                # Parse the JSON string into a Python dictionary
                complaint_data = json.loads(json_str)
                
                if complaint_data['id'] == complaint_id:
                    return jsonify(complaint_data), 200

        # If no matching complaint is found
        return jsonify({"message": "Complaint not found"}), 404
    except Exception as e:
        print(f"Error fetching complaint: {str(e)}")
        return jsonify({"message": "Error fetching complaint", "error": str(e)}), 500

@app.route('/get-all-complaints', methods=['GET'])
def get_all_complaints():
    try:
        stream_name = 'ComplaintDataStream'
        client.subscribe(stream_name)
        
        # Fetch all items from the stream
        items = client.liststreamitems(stream_name)
        
        # Collect all complaints
        complaints = []
        for item in items:
            hex_data = item['data']
            
            if isinstance(hex_data, str):  # Ensure hex_data is a string
                json_str = binascii.unhexlify(hex_data).decode('utf-8')
                
                # Parse the JSON string into a Python dictionary
                complaint_data = json.loads(json_str)
                complaints.append(complaint_data)
        
        return jsonify(complaints), 200
    except Exception as e:
        print(f"Error fetching complaints: {str(e)}")
        return jsonify({"message": "Error fetching complaints", "error": str(e)}), 500

@app.route('/update-complaint-status/<complaint_id>', methods=['POST'])
def update_complaint_status(complaint_id):
    try:
        new_status = request.form.get('status')

        stream_name = 'ComplaintDataStream'
        client.subscribe(stream_name)

        # Fetch all items from the stream
        items = client.liststreamitems(stream_name)

        # Find the complaint with the matching ID
        for item in items:
            hex_data = item['data']

            # Decode the hex data to get the original JSON string
            if isinstance(hex_data, str):  # Ensure hex_data is a string
                json_str = binascii.unhexlify(hex_data).decode('utf-8')

                # Parse the JSON string into a Python dictionary
                complaint_data = json.loads(json_str)

                if complaint_data['id'] == complaint_id:
                    # Update the status
                    complaint_data['status'] = new_status

                    # Store the updated complaint data in the blockchain
                    tx_id = store_data(complaint_data, 'ComplaintDataStream')
                    return jsonify({"message": "Complaint status updated successfully", "transactionId": tx_id}), 200

        # If no matching complaint is found
        return jsonify({"message": "Complaint not found"}), 404
    except Exception as e:
        print(f"Error updating complaint status: {str(e)}")
        return jsonify({"message": "Error updating complaint status", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)