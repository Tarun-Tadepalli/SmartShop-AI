from app.database import get_connection


def save_address(data):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO addresses
        (
        customer_email,
        full_name,
        phone,
        address,
        city,
        state,
        pincode
        )
        VALUES
        (%s,%s,%s,%s,%s,%s,%s)
        RETURNING id
        """,
        (
            data["customer_email"],
            data["full_name"],
            data["phone"],
            data["address"],
            data["city"],
            data["state"],
            data["pincode"]
        )
    )

    address_id = cur.fetchone()[0]

    conn.commit()

    cur.close()
    conn.close()

    return address_id


def get_addresses(email):

    conn = get_connection()

    cur = conn.cursor()

    cur.execute(
        """
        SELECT *
        FROM addresses
        WHERE customer_email=%s
        ORDER BY id DESC
        """,
        (email,)
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return rows

def get_address_by_order(order_id):

    conn = get_connection()

    cur = conn.cursor()

    cur.execute(
        """
        SELECT

        a.full_name,
        a.phone,
        a.address,
        a.city,
        a.state,
        a.pincode

        FROM orders o

        JOIN addresses a
        ON o.address_id = a.id

        WHERE o.id = %s
        """,
        (
            order_id,
        )
    )

    data = cur.fetchone()

    cur.close()
    conn.close()

    return data