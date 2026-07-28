from app.database import get_connection
from app.services.azure_blob_service import azure_blob_service

class ProductService:

    def create_product(self, product_data):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO products
            (
                product_name,
                description,
                price,
                stock,
                category,
                image_url
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s,
                %s,
                %s
            )
            RETURNING id
            """,
            (
                product_data["product_name"],
                product_data["description"],
                product_data["price"],
                product_data["stock"],
                product_data["category"],
                product_data["image_url"]
            )
        )

        new_id = cursor.fetchone()[0]
        product_code = f"PRD-{1000 + new_id}"
        cursor.execute(
            """
            UPDATE products
            SET product_code=%s
            WHERE id=%s
            """,
            (
                product_code,
                new_id
            )
        )

        

        connection.commit()

        cursor.close()
        connection.close()

        return {
            "success": True,
            "message": "Product Added Successfully"
        }

    def get_all_products(self):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT
            id,
            product_name,
            description,
            price,
            stock,
            category,
            image_url,
            product_code
            FROM products
            ORDER BY id DESC
            """
        )

        products = cursor.fetchall()

        cursor.close()
        connection.close()

        return products
    
    
    def get_product_by_id(self, product_id):
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT *
            FROM products
            where id = %s
            """,
            (product_id,)
        )

        products = cursor.fetchone()

        cursor.close()
        connection.close()

        return products
    
    def update_product(self, product_id, product_data):
        connection = get_connection()

        cursor = connection.cursor()

        cursor.execute(
            """
            UPDATE products
            SET
            product_name=%s,
            description=%s,
            price=%s,
            stock=%s,
            category=%s
            WHERE id=%s
            """,
            (
                product_data["product_name"],
                product_data["description"],
                product_data["price"],
                product_data["stock"],
                product_data["category"],
                product_id
            )
        )

        connection.commit()

        cursor.close()
        connection.close()

        return {
            "message":
            "Product Updated Successfully"
        }
    
    def delete_product(self, product_id):
        connection = get_connection()

        cursor = connection.cursor()

        cursor.execute(
            """
            DELETE FROM products
            WHERE id=%s
            """,
            (
                product_id,
            )
        )

        connection.commit()

        cursor.close()
        connection.close()

        return {
            "message": "Product Deleted Successfully"
        }
    
    
    def get_products_for_ai(self):
        connection = get_connection()
        cursor = connection.cursor()
        cursor.execute(
        """
        SELECT
            product_name,
            description,
            category,
            price,
            stock
        FROM products
        ORDER BY product_name
        """
    )
        rows = cursor.fetchall()

        cursor.close()
        connection.close()

        products = []
        for row in rows:
            products.append(
            {
                "product_name": row[0],
                "description": row[1],
                "category": row[2],
                "price": row[3],
                "stock": row[4]
            }
        )
        return products
    
    def search_products_for_ai(self, query):

        connection = get_connection()
        cursor = connection.cursor()

        stop_words = {
            "show",
            "me",
            "give",
            "need",
            "want",
            "find",
            "search",
            "display",
            "list",
            "please",
            "a",
            "an",
            "the",
            "for",
            "with",
            "under",
            "above",
            "of",
            "my",
            "all",
            "best",
            "good", 
            "better", 
            "cheap",
            "cheapest",
            "expensive",
            "buy",
            "purchase",
            "recommend",
            "recommended",
            "looking",
            "lookingfor",
            "need",
            "show",
            "display",
            "available",
            "product",
            "products",
            "item",
            "items"
        }

        words = []

        for word in query.lower().split():

            word = word.strip(",.!?:;()[]{}\"'")

            if word.isdigit():
                continue

            if word.endswith("ies"):
                word = word[:-3] + "y"
            elif word.endswith("es") and len(word) > 4:
                word = word[:-2]
            elif word.endswith("s") and len(word) > 3:
                word = word[:-1]

            if len(word) <= 2:
                continue

            if word in stop_words:
                continue

            words.append(word)

        if not words:
            words = [query.lower()]

        sql = """
            SELECT
                product_name,
                description,
                category,
                price,
                stock
            FROM products
            WHERE
        """

        conditions = []
        values = []

        for word in words:

            conditions.append(
                """
                LOWER(product_name) LIKE %s
                OR LOWER(category) LIKE %s
                OR LOWER(description) LIKE %s
                """
            )

            like = f"%{word}%"

            values.extend([like, like, like])

        sql += "(" + ") OR (".join(conditions) + ")"

        sql += """
            ORDER BY product_name
        """

        cursor.execute(sql, values)

        rows = cursor.fetchall()

        cursor.close()
        connection.close()

        products = []

        for row in rows:

            products.append({

                "product_name": row[0],
                "description": row[1],
                "category": row[2],
                "price": row[3],
                "stock": row[4]

            })

        return products

product_service = ProductService()