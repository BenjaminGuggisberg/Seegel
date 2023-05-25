
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