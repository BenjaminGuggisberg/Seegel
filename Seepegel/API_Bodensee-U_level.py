import requests
import json
import psycopg2
from pyproj import Transformer

# Define Transformer to set correct Coordinatesystem
transformer = Transformer.from_crs('EPSG:4326', 'EPSG:2056')

# Make a request to the API
response = requests.get('https://swisshydroapi.bouni.de/api/v1/stations/data')

# Convert the response from JSON to a Python dictionary
data_dict = json.loads(response.text)

wert = ""
zeit = ""
einheit = ""
max24 = ""
mean24 = ""
min24 = ""
name = ""
gewaesser = ""
gewaessertyp = ""
breite = ""
laenge = ""


for key, data in data_dict.items():
    if data['water-body-name'] == 'Bodensee, Untersee':
        wert = data['parameters']['level']['value']
        zeit = data['parameters']['level']['datetime']
        einheit = data['parameters']['level']['unit']
        max24 = data['parameters']['level']['max-24h']
        mean24 = data['parameters']['level']['mean-24h']
        min24 = data['parameters']['level']['min-24h']
        name = data['name']
        gewaesser = data['water-body-name']
        gewaessertyp = data['water-body-type']
        breite = data['coordinates']['latitude']
        laenge = data['coordinates']['longitude']

        # Transform breite, laenge from value into lv95 coordinates
        position_lv95 = transformer.transform(breite, laenge)
        lat = position_lv95[0]
        lon = position_lv95[1]
        print(position_lv95)



# print(wert, einheit, zeit, max24, mean24, min24, name, gewaesser, gewaessertyp, breite, laenge)
# AUSGABE DER EINZELWERTE AUS DEN DATEN DER API (FUNKTIONIERT - siehe: update_key-value.py)

conn = psycopg2.connect(database="waterlevel_postgis", user="postgres", password="postgres", host="localhost", port="5433")
cur = conn.cursor()

# ST_SetSRID(ST_MakePoint(%s, %s), 2056)) sets Coordinatesystem EPSG 2056 and constructs a Point Geometry in PostGis Database
insert_query = "INSERT INTO waterlevel (name, water_body_name, water_body_type, level_unit, level_datetime, level_value, level_max_24h, level_mean_24h, level_min_24h, geom) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, ST_SetSRID(ST_MakePoint(%s, %s), 2056))"
cur.execute(insert_query, (name, gewaesser, gewaessertyp, einheit, zeit, wert, max24, mean24, min24, lon, lat))


conn.commit()
cur.close()
conn.close()






