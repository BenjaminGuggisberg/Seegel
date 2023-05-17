import psycopg2

def get_user_data(username: str, email: str):
    # open a connection to the database
    conn = psycopg2.connect(database="login", user="postgres", password="postgres", host="localhost", port="5433")

    # create a cursor object to execute queries
    cur = conn.cursor()

    # retrieve the user's data from the database
    sql = "SELECT * FROM users WHERE username = {username} AND email = {email}"
    cur.execute(sql, (username, email))
    user_data = cur.fetchone()
    print(user_data)

    # close the cursor and connection objects
    cur.close()
    conn.close()

    # return the user's data as a dictionary
    return (user_data)

get_user_data('teschter 1', 'test1@test1.com')