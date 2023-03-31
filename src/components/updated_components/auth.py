import uvicorn
from fastapi import FastAPI, Request, status, Form, Depends
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi_login import LoginManager
from fastapi_login.exceptions import InvalidCredentialsException
from fastapi.templating import Jinja2Templates
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
from sqlalchemy.orm import sessionmaker

# create FastAPI instance
app = FastAPI()
templates = Jinja2Templates(directory="templates")

# connect to PostgreSQL database
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/login"
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
metadata = MetaData()
users = Table('users', metadata,
    Column('id', Integer, primary_key=True, index=True),
    Column('username', String, unique=True, index=True),
    Column('email', String, unique=True, index=True),
    Column('password', String),
)
metadata.create_all(bind=engine)

# initialize LoginManager
SECRET = "MY_SUPER_SECRET_KEY"
manager = LoginManager(SECRET, token_url='/auth/login')
@app.get("/auth/login")
def login(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@app.post("/auth/login")
def login(request: Request, username: str = Form(...), password: str = Form(...)):
    db = SessionLocal()
    user = db.query(users).filter(users.c.username == username).first()
    if not user:
        raise InvalidCredentialsException
    elif password != user.password:
        raise InvalidCredentialsException
    access_token = manager.create_access_token(data={"sub": username})
    response = RedirectResponse(url="/dashboard")
    manager.set_cookie(response, access_token)
    return response

@app.get("/dashboard")
def dashboard(user=Depends(manager)):
    return {"message": f"Welcome {user}"}

# ---------------------------- REGISTRATION ---------------------------------------------------------
@app.get("/auth/register")
def register(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})

@app.post("/auth/register")
def register(request: Request, username: str = Form(...), password: str = Form(...)):
    db = SessionLocal()
    user = db.query(users).filter(users.c.username == username).first()
    if user:
        # Handle case where username already exists
        return {"message": "Username already exists"}
    db.add(users(username=username, password=password))
    db.commit()
    return RedirectResponse(url="/auth/login")
# ---------------------------- REGISTRATION ---------------------------------------------------------

# run the server
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
