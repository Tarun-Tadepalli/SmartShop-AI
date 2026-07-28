from app.database import get_connection

from app.utils.password_handler import (verify_password, hash_password)

def change_password(data):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT password
        FROM users
        WHERE email=%s
        """,
        (
            data["email"],
        )
    )

    user = cursor.fetchone()

    if not user:

        cursor.close()
        connection.close()

        return {
            "success": False,
            "message": "User not found"
        }

    stored_password = user[0]

    valid = verify_password(
        data["current_password"],
        stored_password
    )

    if not valid:

        cursor.close()
        connection.close()

        return {
            "success": False,
            "message": "Current password incorrect"
        }

    new_hashed_password = hash_password(
        data["new_password"]
    )

    cursor.execute(
        """
        UPDATE users
        SET password=%s,
            updated_at=CURRENT_TIMESTAMP
        WHERE email=%s
        """,
        (
            new_hashed_password,
            data["email"]
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "success": True,
        "message": "Password updated successfully"
    }

def update_profile_image(data):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        UPDATE users
        SET profile_image_url=%s
        WHERE email=%s
        """,
        (
            data["profile_image_url"],
            data["email"]
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "success": True,
        "message": "Profile image updated successfully"
    }

def get_profile(email):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
            first_name,
            last_name,
            email,
            profile_image_url
        FROM users
        WHERE email=%s
        """,
        (email,)
    )

    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if not user:

        return {
            "first_name": "",
            "last_name": "",
            "email": "",
            "profile_image_url": None
        }

    return {
        "first_name": user[0],
        "last_name": user[1],
        "email": user[2],
        "profile_image_url": user[3]
    }

def get_profile_for_ai(email):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
            first_name,
            last_name,
            email,
            profile_image_url
        FROM users
        WHERE email=%s
        """,
        (email,)
    )

    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if not user:
        return None

    return {
        "first_name": user[0],
        "last_name": user[1],
        "email": user[2],
        "profile_image": (
            "Uploaded"
            if user[3]
            else "Not Uploaded"
        )
    }