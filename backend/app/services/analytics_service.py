import matplotlib

matplotlib.use("Agg")

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from app.database import get_connection


class AnalyticsService:

    def get_inventory_analysis(self):

        connection = get_connection()

        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT
            product_name,
            category,
            stock,
            price
            FROM products
            """
        )

        products = cursor.fetchall()

        cursor.close()
        connection.close()

        if not products:

            return {
                "total_products": 0,
                "average_stock": 0,
                "average_price": 0,
                "highest_stock": 0,
                "lowest_stock": 0
            }

        df = pd.DataFrame(
            products,
            columns=[
                "product_name",
                "category",
                "stock",
                "price"
            ]
        )

        return {

            "total_products":
            len(df),

            "average_stock":
            round(
                np.mean(
                    df["stock"]
                ),
                2
            ),

            "average_price":
            round(
                np.mean(
                    df["price"]
                ),
                2
            ),

            "highest_stock":
            int(
                np.max(
                    df["stock"]
                )
            ),

            "lowest_stock":
            int(
                np.min(
                    df["stock"]
                )
            )
        }

    def generate_category_chart(self):

        connection = get_connection()

        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT
            category,
            COUNT(*)
            FROM products
            GROUP BY category
            """
        )

        data = cursor.fetchall()

        cursor.close()
        connection.close()

        if not data:

            return None

        categories = [
            row[0]
            for row in data
        ]

        counts = [
            row[1]
            for row in data
        ]

        plt.figure(figsize=(8, 5))

        plt.bar(categories,counts)

        plt.title("Products Per Category")

        plt.xlabel("Category")

        plt.ylabel("Products")

        chart_path = ("app/charts/category_chart.png")

        plt.savefig(chart_path)

        plt.clf

        plt.close("all")

        return chart_path


analytics_service = AnalyticsService()