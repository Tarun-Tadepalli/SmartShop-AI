from app.database import get_connection


def add_feedback(data):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO feedbacks
        (
            order_id,
            customer_email,
            product_id,
            product_name,
            rating,
            review
        )
        VALUES
        (
            %s,%s,%s,%s,%s,%s
        )
        """,
        (
            data.order_id,
            data.customer_email,
            data.product_id,
            data.product_name,
            data.rating,
            data.review
        )
    )

    cursor.execute(
        """
        UPDATE orders
        SET feedback_submitted = TRUE
        WHERE id = %s
        """,
        (
            data.order_id,
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message":
        "Feedback Added"
    }

def get_feedback_by_order(order_id):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
        rating,
        review
        FROM feedbacks
        WHERE order_id=%s
        """,
        (
            order_id,
        )
    )

    data = cursor.fetchone()

    cursor.close()
    connection.close()

    return data