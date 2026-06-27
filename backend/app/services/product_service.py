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
    
    
    
product_service = ProductService()