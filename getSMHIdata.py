import sqlite3
import requests
import json
from datetime import datetime

# Define URLs for temperature and humidity data
url_temp = 'https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/83420/period/latest-months/data.json'
url_humidity = 'https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/6/station/83420/period/latest-months/data.json'

# SQLite connection
db_file = 'data.sqlite'
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

# Ensure table exists
cursor.execute('''
CREATE TABLE IF NOT EXISTS SMHIDataPoint (
    date TEXT PRIMARY KEY,
    temperatur REAL,
    luftfuktighet REAL
)
''')
conn.commit()

# Function to check if a date already exists in the database
def date_exists(date):
    cursor.execute("SELECT 1 FROM SMHIDataPoint WHERE date = ?", (date,))
    return cursor.fetchone() is not None

# Function to convert SMHI timestamp (milliseconds since epoch) to a formatted date string
def convert_timestamp_to_date(smhi_timestamp):
    return datetime.utcfromtimestamp(smhi_timestamp / 1000).strftime('%Y-%m-%d %H:%M')

# Fetch and process humidity data
def fetch_humidity_data():
    response = requests.get(url_humidity)
    humidity_data = response.json()
    
    humidity_values = humidity_data['value']
    humidity_dict = {convert_timestamp_to_date(entry['date']): float(entry['value']) for entry in humidity_values}
    
    return humidity_dict

# Fetch and process temperature data
def fetch_temperature_data():
    response = requests.get(url_temp)
    temp_data = response.json()
    
    temp_values = temp_data['value']
    temp_dict = {convert_timestamp_to_date(entry['date']): float(entry['value']) for entry in temp_values}
    
    return temp_dict

# Main function to merge and insert data
def populate_database():
    humidity_data = fetch_humidity_data()
    temperature_data = fetch_temperature_data()
    
    # Insert data into the database
    for date, temp_value in temperature_data.items():
        luftfuktighet_value = humidity_data.get(date)
        
        # Only insert if both temperature and humidity data are available and the date doesn't already exist
        if luftfuktighet_value is not None and not date_exists(date):
            cursor.execute('''
                INSERT INTO SMHIDataPoint (date, temperatur, luftfuktighet)
                VALUES (?, ?, ?)
            ''', (date, temp_value, luftfuktighet_value))
    
    # Commit changes to the database
    conn.commit()

# Run the script
populate_database()

# Close the connection
conn.close()
