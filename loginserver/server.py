from fastapi import FastAPI, HTTPException, status, File, Form, UploadFile, Header, Request
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import psycopg2
from psycopg2 import pool
import hashlib
import rasterio
import uvicorn
import os
import hashlib



app = FastAPI()


origins = [
    'http://localhost',
    'http://localhost:3000',
    # 'http://localhost:8000/dem',
    'http://localhost:8000',
    'http://localhost:8003'

]

# Enable Cross-Origin Resource Sharing (CORS) middleware to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with the appropriate origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Origin Settings for CORS Policy
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# Define the database connection pool
DB_HOST = "localhost"
DB_PORT = 5433
DB_NAME = "login"
DB_NAME_DATA = "waterlevel_postgis"
DB_NAME_BO = "wind_BO"
DB_NAME_S = "wind_S"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_POOL_MIN_CONN = 1
DB_POOL_MAX_CONN = 30
db_pool = pool.SimpleConnectionPool(
    DB_POOL_MIN_CONN,
    DB_POOL_MAX_CONN,
    host=DB_HOST,
    port=DB_PORT,
    database=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD
)
db_pool_data = pool.SimpleConnectionPool(
    DB_POOL_MIN_CONN,
    DB_POOL_MAX_CONN,
    host=DB_HOST,
    port=DB_PORT,
    database=DB_NAME_DATA,
    user=DB_USER,
    password=DB_PASSWORD
)
db_pool_bo = pool.SimpleConnectionPool(
    DB_POOL_MIN_CONN,
    DB_POOL_MAX_CONN,
    host=DB_HOST,
    port=DB_PORT,
    database=DB_NAME_BO,
    user=DB_USER,
    password=DB_PASSWORD
)
db_pool_s = pool.SimpleConnectionPool(
    DB_POOL_MIN_CONN,
    DB_POOL_MAX_CONN,
    host=DB_HOST,
    port=DB_PORT,
    database=DB_NAME_S,
    user=DB_USER,
    password=DB_PASSWORD
)

# Define the request body schema for the login endpoint


class LoginRequestBody(BaseModel):
    email: str
    password: str

# Define the response schema for the login endpoint


class LoginResponse(BaseModel):
    username: str
    email: str    

class RegistrationRequestBody(BaseModel):
    email: str
    username: str
    password: str

class UserResponse(BaseModel):
    email: str
    username: str

# Define the response schema for the water level endpoint


class WaterLevelResponse(BaseModel):
    timestamp: str
    value: float
    lake: str
    station: str

# Define the water level endpoint FOR WATERLEVELS IN GENERAL (WHOLE DATABASE WITH ATTRIBUTES timestamp, value, lake, station)


@app.get("/api/waterlevel", response_model=list[WaterLevelResponse])
async def get_waterlevel():
    conn = None
    try:
        conn = db_pool_data.getconn()
        cur = conn.cursor()
        query = "SELECT level_datetime, level_value, water_body_name, name FROM waterlevel ORDER BY level_datetime DESC LIMIT 10"
        cur.execute(query)
        waterlevels = []
        for l in cur.fetchall():
            waterlevel = WaterLevelResponse(timestamp=str(
                l[0]), value=float(l[1]), lake=str(l[2]), station=str(l[3]))
            waterlevels.append(waterlevel)
        print(waterlevels)
        return waterlevels
    except Exception as E:
        print(E)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
    finally:
        if conn:
            db_pool_data.putconn(conn)

# Define the water level endpoint FOR WATERLEVELS from NEUENBURGERSEE as function of TIMESTAMP


@app.get("/api/waterlevel/neuenburgersee")
async def get_waterlevel():
    conn = None
    try:
        conn = db_pool_data.getconn()
        cur = conn.cursor()
        query = "SELECT level_datetime, level_value, water_body_name, name FROM waterlevel WHERE water_body_name='Lac de Neuchâtel' ORDER BY level_datetime DESC"
        cur.execute(query)
        waterlevels = []
        for l in cur.fetchall():
            timestamp = str(l[0])
            value = float(l[1])
            station = str(l[3])
            found = False
            for wl in waterlevels:
                if wl['timestamp'] == timestamp:
                    wl[station] = value
                    found = True
                    break
            if not found:
                waterlevels.append({'timestamp': timestamp, station: value})
        print(waterlevels)
        return waterlevels
    except Exception as E:
        print(E)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
    finally:
        if conn:
            db_pool_data.putconn(conn)

# Define the water level endpoint FOR WATERLEVELS from BIELERSEE as function of TIMESTAMP


@app.get("/api/waterlevel/bielersee")
async def get_waterlevel():
    conn = None
    try:
        conn = db_pool_data.getconn()
        cur = conn.cursor()
        query = "SELECT level_datetime, level_value, water_body_name, name FROM waterlevel WHERE water_body_name='Bielersee' ORDER BY level_datetime DESC"
        cur.execute(query)
        waterlevels = []
        for l in cur.fetchall():
            timestamp = str(l[0])
            value = float(l[1])
            station = str(l[3])
            found = False
            for wl in waterlevels:
                if wl['timestamp'] == timestamp:
                    wl[station] = value
                    found = True
                    break
            if not found:
                waterlevels.append({'timestamp': timestamp, station: value})
        print(waterlevels)
        return waterlevels
    except Exception as E:
        print(E)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
    finally:
        if conn:
            db_pool_data.putconn(conn)


@app.get("/api/waterlevel/brienzersee")
async def get_waterlevel():
    conn = None
    try:
        conn = db_pool_data.getconn()
        cur = conn.cursor()
        query = "SELECT level_datetime, level_value, water_body_name, name FROM waterlevel WHERE water_body_name='Brienzersee' ORDER BY level_datetime DESC"
        cur.execute(query)
        waterlevels = []
        for l in cur.fetchall():
            timestamp = str(l[0])
            value = float(l[1])
            station = str(l[3])
            found = False
            for wl in waterlevels:
                if wl['timestamp'] == timestamp:
                    wl[station] = value
                    found = True
                    break
            if not found:
                waterlevels.append({'timestamp': timestamp, station: value})
        print(waterlevels)
        return waterlevels
    except Exception as E:
        print(E)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
    finally:
        if conn:
            db_pool_data.putconn(conn)


@app.get("/api/waterlevel/thunersee")
async def get_waterlevel():
    conn = None
    try:
        conn = db_pool_data.getconn()
        cur = conn.cursor()
        query = "SELECT level_datetime, level_value, water_body_name, name FROM waterlevel WHERE water_body_name='Thunersee' ORDER BY level_datetime DESC"
        cur.execute(query)
        waterlevels = []
        for l in cur.fetchall():
            timestamp = str(l[0])
            value = float(l[1])
            station = str(l[3])
            found = False
            for wl in waterlevels:
                if wl['timestamp'] == timestamp:
                    wl[station] = value
                    found = True
                    break
            if not found:
                waterlevels.append({'timestamp': timestamp, station: value})
        print(waterlevels)
        return waterlevels
    except Exception as E:
        print(E)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
    finally:
        if conn:
            db_pool_data.putconn(conn)


# Define the login endpoint
@app.post("/api/login", response_model=LoginResponse)
async def login(login_request: LoginRequestBody):
    email = login_request.email
    password = login_request.password
    conn = None
    try:
        # Acquire a connection from the database connection pool
        conn = db_pool.getconn()
        cur = conn.cursor()
        query = "SELECT * FROM users WHERE email = %s"
        cur.execute(query, (email,))
        user = cur.fetchone()
        if not user or user[3] != password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
        return {"username": user[1], "email": user[2]}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
    finally:
        if conn:
            # Release the connection back to the database connection pool
            db_pool.putconn(conn)


@app.post("/api/register")
async def register(registration_request: RegistrationRequestBody):
    email = registration_request.email
    username = registration_request.username
    password = registration_request.password
    # validate input (e.g., check if email is already registered)
    conn = None
    try:
        # Acquire a connection from the database connection pool
        conn = db_pool.getconn()
        cur = conn.cursor()
        query = "INSERT INTO users (email, username, password) VALUES (%s, %s, %s)"
        cur.execute(query, (email, username, password))
        conn.commit()
        return {"message": "User registered successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
    finally:
        if conn:
            # Release the connection back to the database connection pool
            db_pool.putconn(conn)

@app.post("/api/reg_hash")
async def register(registration_request: RegistrationRequestBody):
    email = registration_request.email
    username = registration_request.username
    password = registration_request.password
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    # validate input (e.g., check if email is already registered)
    conn = None
    try:
        # Acquire a connection from the database connection pool
        conn = db_pool.getconn()
        cur = conn.cursor()
        query = "INSERT INTO users (email, username, password) VALUES (%s, %s, %s)"
        cur.execute(query, (email, username, hashed_password))
        conn.commit()
        return {"message": "User registered successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
    finally:
        if conn:
            # Release the connection back to the database connection pool
            db_pool.putconn(conn)


@app.post("/api/log_hash", response_model=LoginResponse)
async def login(login_request: LoginRequestBody):
    email = login_request.email
    password = login_request.password
    conn = None
    try:
        # Acquire a connection from the database connection pool
        conn = db_pool.getconn()
        cur = conn.cursor()
        query = "SELECT * FROM users WHERE email = %s"
        cur.execute(query, (email,))
        user = cur.fetchone()
        if not user or hashlib.sha256(password.encode()).hexdigest() != user[3]:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
        return {"username": user[1], "email": user[2]}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
    finally:
        if conn:
            # Release the connection back to the database connection pool
            db_pool.putconn(conn)

# -------------------------------------- Umsetzung direkt mit .tif File - .tif file zu gross -----------------------------------------
def load_tif(file_path):
    with rasterio.open(file_path) as src:
        return src.read()

def get_dem_value(longitude: float, latitude: float, tif_file: str):
    with rasterio.open(tif_file) as src:
        x, y = longitude, latitude
        row, col = src.index(x, y)
        dem_value = src.read(1, window=((row, row+1), (col, col+1)))
    return dem_value[0, 0]


@app.get("/dem")
def get_dem(longitude: str, latitude: str, tif_file: str):
    try:
        longitude_float = float(longitude)
        latitude_float = float(latitude)
        dem_value = get_dem_value(longitude_float, latitude_float, tif_file)
        return {"dem_value": dem_value}
    except Exception as e:
        return {"error": str(e)}
# ------------------------------------------------------------------------------------------------------------------------------------

# --------------------------------------------- Umsetzung mit .zip File --------------------------------------------------------------
# import os
# import zipfile
# import tempfile
# import rasterio

# def unzip_tif(zip_file_path, output_dir):
#     with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
#         tif_files = [f for f in zip_ref.namelist() if f.endswith('.tif') or f.endswith('.tiff')]
#         if len(tif_files) == 0:
#             raise ValueError("No TIF files found in the ZIP archive.")
#         elif len(tif_files) > 1:
#             raise ValueError("Multiple TIF files found in the ZIP archive. Please provide a single TIF file.")
        
#         extracted_file_path = zip_ref.extract(tif_files[0], path=output_dir)
#         return extracted_file_path

# def load_tif(file_path):
#     with rasterio.open(file_path) as src:
#         return src.read()

# def get_dem_value(longitude: float, latitude: float, tif_file: str):
#     with rasterio.open(tif_file) as src:
#         x, y = longitude, latitude
#         row, col = src.index(x, y)
#         dem_value = src.read(1, window=((row, row+1), (col, col+1)))
#     return dem_value[0, 0]

# @app.get("/dem")
# def get_dem(longitude: str, latitude: str, tif_file: str):
#     try:
#         longitude_float = float(longitude)
#         latitude_float = float(latitude)

#         if tif_file.endswith('.zip'):
#             # Create a temporary directory to extract the TIF file
#             with tempfile.TemporaryDirectory() as temp_dir:
#                 tif_file_path = unzip_tif(tif_file, temp_dir)
#                 dem_value = get_dem_value(longitude_float, latitude_float, tif_file_path)
#         else:
#             dem_value = get_dem_value(longitude_float, latitude_float, tif_file)

#         return {"dem_value": dem_value}
#     except Exception as e:
#         return {"error": str(e)}
# ----------------------------------------------- Performance Problem !! ---------------------------------------------------------------



def get_user_data(username: str, email: str):
    # open a connection to the database
    conn = psycopg2.connect(database="login", user="postgres", password="postgres", host="localhost", port="5433")
    # create a cursor object to execute queries
    cur = conn.cursor()

    # retrieve the user's data from the database
    sql = "SELECT * FROM users WHERE username = %s AND email = %s"
    cur.execute(sql, (username, email))
    user_data = cur.fetchall()

    # close the cursor and connection objects
    cur.close()
    conn.close()

    return {
        "id": user_data[0][0],
        "username": user_data[0][1],
        "email": user_data[0][2],
        "password": user_data[0][3],
        "profilepicture": user_data[0][4]
    }

def update_profile_picture(username: str, email: str, file_location: str):
    # open a connection to the database
    conn = db_pool.getconn()
    # create a cursor object to execute queries
    cur = conn.cursor()

    # update the user's profile picture in the database
    sql = "UPDATE users SET profilepicture = %s WHERE username = %s AND email = %s"
    cur.execute(sql, (file_location, username, email))

    # commit the transaction and close the connection
    conn.commit()
    cur.close()
    conn.close()

def delete_profile_picture(username: str, email: str):
    # open a connection to the database
    conn = db_pool.getconn()
    # create a cursor object to execute queries
    cur = conn.cursor()

    # update the user's profile picture in the database
    sql = "UPDATE users SET profilepicture = null WHERE username = %s AND email = %s"
    cur.execute(sql, (username, email))

    # commit the transaction and close the connection
    conn.commit()
    cur.close()
    conn.close()

@app.post("/upload-profile-picture")
async def upload_profile_picture(username: str, email: str, profilepicture: UploadFile = File(...)):
    # check if the user already has a profile picture stored
    user_data = get_user_data(username, email)
    if user_data["profilepicture"]:
        # if the user has a profile picture, delete the old file from the server
        os.remove(user_data["profilepicture"])

    # create a folder for the user if it does not exist
    folder_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images', username)
    if not os.path.isdir(folder_path):
        os.mkdir(folder_path)

    # save the uploaded file to a location on the server
    file_location = os.path.join(folder_path, profilepicture.filename)
    with open(file_location, "wb") as file:
        contents = await profilepicture.read()
        file.write(contents)

    # update the user's profile picture in the database
    update_profile_picture(username, email, file_location)

    image_url = f'/images/{username}/{profilepicture.filename}'
    return JSONResponse(status_code=200, content={"message": "Profile picture uploaded successfully", "image_url": image_url})


@app.post("/delete-profile-picture")
async def upload_profile_picture(username: str, email: str):
    # check if the user already has a profile picture stored
    user_data = get_user_data(username, email)
    if user_data["profilepicture"]:
        # if the user has a profile picture, delete the old file from the server
        os.remove(user_data["profilepicture"])

    # update the user's profile picture in the database
    delete_profile_picture(username, email)

    return JSONResponse(status_code=200, content={"message": "Profile picture deleted successfully"})


class DeleteAccountRequest(BaseModel):
    username: str
    email: str

@app.delete('/api/delete-account')
def delete_account(request: DeleteAccountRequest):
    username = request.username
    email = request.email
    # Connect to the PostgreSQL database
    conn = db_pool.getconn()
    # Create a cursor object to execute SQL queries
    cursor = conn.cursor()
    try:
        # Execute the deletion query
        cursor.execute(
            "DELETE FROM users WHERE username = %s AND email = %s",
            (username, email)
        )
        # Commit the changes to the database
        conn.commit()
        return {'message': 'Account deleted successfully'}
    except psycopg2.Error as e:
        # Handle any errors that occurred during the deletion
        # You can log the error or return an appropriate response
        return {'message': 'Failed to delete account'}
    finally:
        # Close the cursor and database connection
        cursor.close()
        conn.close()



def get_profile_picture_location(username: str):
    # connect to the database
    conn = psycopg2.connect(database="login", user="postgres", password="postgres", host="localhost", port="5433")
    cursor = conn.cursor()

    # retrieve the file location for the user's profile picture
    cursor.execute("SELECT profilepicture FROM users WHERE username= %s", (username,))
    result = cursor.fetchone()

    # close the database connection
    conn.close()

    if result:
        return result[0]
    else:
        raise ValueError("User not found")


@app.get("/get-profile-picture/{username}")
async def get_profile_picture(username: str):
    # retrieve the file location from the user's database
    file_location = get_profile_picture_location(username)

    # serve the image file to the frontend
    return FileResponse(file_location)

@app.get("/prognose_bo/{id}")
async def root(id:str):
    conn = db_pool_bo.getconn()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM prognose WHERE stat_id = '{id}';")
    data = cursor.fetchall()

    conn.close()

    # Prepare the data in the desired format
    formatted_data = []
    for row in data:
        zeit = row[4]  # Assuming the timestamp is in the 5th column (index 4) of your database table
        windrichtung = row[1]  # Assuming the wind direction is in the 2nd column (index 1)
        windgeschwindigkeit = row[2]  # Assuming the wind speed is in the 3rd column (index 2)
        boehen = row[3]  # Assuming the gusts are in the 4th column (index 3)

        formatted_row = {
            'zeit': zeit,
            'windrichtung': windrichtung,
            'boehen': boehen,
            'windgeschwindigkeit': windgeschwindigkeit
        }
        formatted_data.append(formatted_row)

    return formatted_data

    # conn = db_pool_bo.getconn()
    # cursor = conn.cursor()
    # cursor.execute(f"SELECT * FROM prognose WHERE stat_id = '{id}';")
    # data = cursor.fetchall()

    # conn.close()

    # return data

@app.get("/prognose_s/{id}")
async def root(id: str):
    conn = db_pool_s.getconn()
    cursor = conn.cursor()
    try:
        cursor.execute(f"SELECT * FROM prognose WHERE stat_id = '{id}';")
        data = cursor.fetchall()

        # Prepare the data in the desired format
        formatted_data = []
        for row in data:
            zeit = row[4]  # Assuming the timestamp is in the 5th column (index 4) of your database table
            windrichtung = row[1]  # Assuming the wind direction is in the 2nd column (index 1)
            windgeschwindigkeit = row[2]  # Assuming the wind speed is in the 3rd column (index 2)
            boehen = row[3]  # Assuming the gusts are in the 4th column (index 3)

            formatted_row = {
                'zeit': zeit,
                'windrichtung': windrichtung,
                'boehen': boehen,
                'windgeschwindigkeit': windgeschwindigkeit
            }
            formatted_data.append(formatted_row)

        return formatted_data
    finally:
        conn.close()




if __name__ == "__main__":
    # Start the server using Uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
