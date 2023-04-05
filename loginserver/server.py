from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from psycopg2 import pool

app = FastAPI()


origins = [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:8000'
]

# Enable Cross-Origin Resource Sharing (CORS) middleware to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the database connection pool
DB_HOST = "localhost"
DB_PORT = 5433
DB_NAME = "login"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_POOL_MIN_CONN = 1
DB_POOL_MAX_CONN = 10
db_pool = pool.SimpleConnectionPool(
    DB_POOL_MIN_CONN,
    DB_POOL_MAX_CONN,
    host=DB_HOST,
    port=DB_PORT,
    database=DB_NAME,
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
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
        return {"username": user[1]}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
    finally:
        if conn:
            # Release the connection back to the database connection pool
            db_pool.putconn(conn)

if __name__ == "__main__":
    # Start the server using Uvicorn
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
