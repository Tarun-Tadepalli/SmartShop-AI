from app.database import get_connection

from app.utils.password_handler import (
    hash_password,
    verify_password
)

from app.utils.jwt_handler import (
    create_access_token
)

def register_user(user_data):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT *
        FROM users
        WHERE email=%s
        """,
        (
            user_data["email"],
        )
    )

    existing_user = cursor.fetchone()

    if existing_user:

        cursor.close()
        connection.close()

        return {
            "success": False,
            "message": "Email already registered"
        }

    hashed_password = hash_password(
        user_data["password"]
    )

    cursor.execute(
        """
        INSERT INTO users
        (
            first_name,
            last_name,
            email,
            password,
            role
        )
        VALUES
        (
            %s,
            %s,
            %s,
            %s,
            'customer'
        )
        """,
        (
            user_data["first_name"],
            user_data["last_name"],
            user_data["email"],
            hashed_password
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "success": True,
        "message": "Registration successful"
    }

def login_user(user_data):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT 
        id, first_name, last_name, email, password, role 
        FROM users 
        WHERE email=%s
        """,
        (
            user_data["email"],
        )
    )

    user = cursor.fetchone()

    if not user:

        cursor.close()
        connection.close()

        return {
            "success": False,
            "message": "Invalid email or password"
        }

    stored_password = user[4]

    valid = verify_password(
        user_data["password"],
        stored_password
    )

    if not valid:

        cursor.close()
        connection.close()

        return {
            "success": False,
            "message": "Invalid email or password"
        }

    token = create_access_token(
        user_data["email"]
    )

    cursor.close()
    connection.close()

    return {
        "success": True,
        "token": token,
        "role": user[5]
    }