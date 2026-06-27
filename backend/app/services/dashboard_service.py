from app.database import get_connection


class DashboardService:

    def get_stats(self):

        connection = get_connection()

        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT COUNT(*)
            FROM products
            """
        )

        total_products = cursor.fetchone()[0]

        cursor.execute(
            """
            SELECT COALESCE(
                SUM(stock),
                0
            )
            FROM products
            """
        )

        total_stock = cursor.fetchone()[0]

        cursor.execute(
            """
            SELECT COUNT(
                DISTINCT category
            )
            FROM products
            """
        )

        total_categories = cursor.fetchone()[0]

        cursor.execute(
            """
            SELECT COUNT(*)
            FROM products
            WHERE stock < 10
            """
        )

        low_stock = cursor.fetchone()[0]

        cursor.close()
        connection.close()

        return {
            "total_products":
            total_products,

            "total_stock":
            total_stock,

            "total_categories":
            total_categories,

            "low_stock":
            low_stock
        }


dashboard_service = DashboardService()