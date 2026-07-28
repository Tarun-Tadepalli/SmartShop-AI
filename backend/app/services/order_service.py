from app.database import get_connection


def create_order(data):

    connection = get_connection()

    cursor = connection.cursor()


    cursor.execute(
        """
        SELECT stock
        FROM products
        WHERE id = %s
        """,
        (
            data.product_id,
        )
    )

    stock_data = cursor.fetchone()

    if not stock_data:

        cursor.close()
        connection.close()

        return {
            "message":
            "Product Not Found"
        }

    current_stock = stock_data[0]

    if current_stock < data.quantity:

        cursor.close()
        connection.close()

        return {
            "message":
            "Out Of Stock"
        }

    # --------------------------
    # CREATE ORDER
    # --------------------------

    cursor.execute(
        """
        INSERT INTO orders
        (
            customer_email,
            address_id,
            product_id,
            product_name,
            quantity,
            total_amount,
            status
        )
        VALUES
        (
            %s,%s,%s,%s,%s,%s,%s
        )
        RETURNING id
        """,
        (
            data.customer_email,
            data.address_id,
            data.product_id,
            data.product_name,
            data.quantity,
            data.total_amount,
            "Pending"
        )
    )

    order_id = cursor.fetchone()[0]

    # --------------------------
    # REDUCE STOCK
    # --------------------------

    cursor.execute(
        """
        UPDATE products
        SET stock = stock - %s
        WHERE id = %s
        """,
        (
            data.quantity,
            data.product_id
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {

        "message":
        "Order Created",

        "order_id":
        order_id
    }

def get_customer_orders(email):

    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(
        """
        SELECT
        id,
        product_name,
        quantity,
        total_amount,
        status,
        return_status,
        feedback_submitted
        FROM orders
        WHERE customer_email=%s
        ORDER BY id DESC
        """,
        (email,)
    )
    orders = cursor.fetchall()
    cursor.close()
    connection.close()
    return orders

def get_all_orders():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
        o.id,
        o.customer_email,
        p.product_code,
        o.product_name,
        o.quantity,
        o.total_amount,
        o.status,
        o.return_status,
        o.return_reason
        FROM orders o
        JOIN products p
        ON o.product_id = p.id
        ORDER BY o.id DESC
        """
    )

    data = cursor.fetchall()

    cursor.close()
    connection.close()

    return data

def update_order_status(order_id,status):

    connection = get_connection()

    cursor = connection.cursor()

    # RETURN LOGIC

    if status == "Returned":

        cursor.execute(
            """
            SELECT
            product_id,
            quantity
            FROM orders
            WHERE id=%s
            """,
            (order_id,)
        )

        order = cursor.fetchone()

        product_id = order[0]

        quantity = order[1]

        cursor.execute(
            """
            UPDATE products
            SET stock = stock + %s
            WHERE id = %s
            """,
            (
                quantity,
                product_id
            )
        )

    if status == "Rejected":
        cursor.execute(
        """
        UPDATE orders
        SET return_status='Rejected'
        WHERE id=%s
        """,
        (
            order_id,
        )
        )
    else:
        cursor.execute(
        """
        UPDATE orders
        SET
        status=%s,
        return_status=%s
        WHERE id=%s
        """,
        (
            status,
            status,
            order_id
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message":
        "Status Updated"
    }

def request_return(order_id, reason):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        UPDATE orders
        SET
        return_requested=TRUE,
        return_reason=%s,
        return_status='Requested'
        WHERE id=%s
        """,
        (
            reason,
            order_id
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message":
        "Return Requested"
    }

def search_orders_for_ai(customer_email):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
            product_name,
            quantity,
            total_amount,
            status,
            order_date
        FROM orders
        WHERE customer_email=%s
        ORDER BY order_date DESC
        """,
        (
            customer_email,
        )
    )

    orders = cursor.fetchall()

    cursor.close()
    connection.close()

    return orders