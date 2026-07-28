import os
import time

import google.generativeai as tarun_ai

from app.database import get_connection
from app.services.product_service import product_service
from app.services.profile_service import get_profile_for_ai


model = tarun_ai.GenerativeModel(
    "gemini-flash-latest"
)


def ask_admin_gemini(question: str, history=None):
    tarun_ai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
    )


    if history is None:
        history = []

    search_query = question

    admin_email = ""
    for item in history:
        if item.role == "email":
            admin_email = item.text
            break

    last_user_question = ""

    if history:
        for item in reversed(history):
            if item.role == "user":
                last_user_question = item.text
                break

    if last_user_question:
        search_query = last_user_question + " " + question
    
    # ============================================================
    # STEP A4 : Detect Administrator Intent
    # ============================================================

    intent_prompt = f"""
You are SmartShop Admin Intent Classifier.

Your ONLY job is to determine which SmartShop Admin module
should answer the administrator's question.

Possible modules are:

1. dashboard
Used for:
- statistics
- reports
- totals
- inventory overview
- stock summary
- average values
- highest values
- lowest values
- analytics
- business insights
- dashboard cards

2. products
Used for:
- searching products
- viewing products
- filtering products
- category questions
- price questions
- stock questions
- product details
- product comparison
- recommendations
- availability

3. orders
Used for:
- customer orders
- pending orders
- delivered orders
- cancelled orders
- order tracking
- order history
- order management

4. add_product
Used for:
- adding products
- updating products
- deleting products
- changing stock
- changing price
- uploading product images

5. profile
Used for:
- administrator profile
- account
- email
- password
- profile image
- profile details

6. general
Used for:
- greetings
- programming
- cloud
- docker
- kubernetes
- AI
- Python
- React
- Azure
- anything unrelated to SmartShop data

Rules:

Return ONLY ONE WORD.

Allowed outputs:

dashboard
products
orders
add_product
profile
general

Administrator Question:

{search_query}
"""

    try:

        intent_response = model.generate_content(
            intent_prompt
        )
        intent_start = time.time()

        admin_intent = (
            intent_response.text
            .strip()
            .lower()
        )
        intent_end = time.time()
        print(
            f"Intent Detection Time : {intent_end - intent_start:.2f} seconds"
        )

    except Exception as e:

        print(f"INTENT DETECTION ERROR: {e}")
        admin_intent = "general"

    print("=" * 60)
    print("ADMIN INTENT :", admin_intent)
    print("=" * 60)

    # ============================================================
    # STEP A5 : Load Dashboard Context
    # ============================================================

    dashboard_context = ""

    if admin_intent == "dashboard":

        connection = get_connection()

        cursor = connection.cursor()

        cursor.execute("SELECT COUNT(*) FROM products")
        total_products = cursor.fetchone()[0]

        cursor.execute("""
            SELECT COALESCE(SUM(stock), 0)
            FROM products
        """)
        total_stock = cursor.fetchone()[0]

        cursor.execute("""
            SELECT COUNT(DISTINCT category)
            FROM products
        """)
        total_categories = cursor.fetchone()[0]

        cursor.execute("""
            SELECT COUNT(*)
            FROM products
            WHERE stock < 10
        """)
        low_stock_products = cursor.fetchone()[0]

        cursor.execute("""
            SELECT ROUND(AVG(stock), 2)
            FROM products
        """)
        average_stock = cursor.fetchone()[0]

        cursor.execute("""
            SELECT ROUND(AVG(price), 2)
            FROM products
        """)
        average_price = cursor.fetchone()[0]

        cursor.execute("""
            SELECT MAX(stock)
            FROM products
        """)
        highest_stock = cursor.fetchone()[0]

        cursor.execute("""
            SELECT MIN(stock)
            FROM products
        """)
        lowest_stock = cursor.fetchone()[0]

        dashboard_context = f"""

SmartShop Dashboard Statistics

Total Products : {total_products}

Total Stock : {total_stock}

Total Categories : {total_categories}

Low Stock Products : {low_stock_products}

Average Stock : {average_stock}

Average Price : ₹{average_price}

Highest Stock : {highest_stock}

Lowest Stock : {lowest_stock}

"""

        cursor.close()
        connection.close()

    # ============================================================
    # STEP A6 : Load Product Context
    # ============================================================

    product_context = ""

    products = []
    if admin_intent == "products":
        products = product_service.search_products_for_ai(search_query)

        if not products:
            products = product_service.search_products_for_ai(question)

        if products:

            product_context = "\n\nProducts currently available in SmartShop:\n\n"

            product_context += f"Total Matching Products : {len(products)}\n\n"

            for product in products:

                product_context += f"""
                Product Name : {product['product_name']}
                Category : {product['category']}
                Price : ₹{product['price']}
                Stock : {product['stock']}
                Description : {product['description']}
                -------------------------
                """

        else:

            product_context = """
No matching products were found in SmartShop.
"""
    
    # ============================================================
    # STEP A3 : Load Orders Context
    # ============================================================

    orders_context = ""

    if admin_intent == "orders":

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
            LIMIT 100
            """
            )

        orders = cursor.fetchall()

        cursor.close()
        connection.close()

        if orders:

            orders_context = f"""
            Total Orders : {len(orders)}
            """

            for order in orders:

                orders_context += f"""
Order ID : {order[0]}
Customer : {order[1]}
Product Code : {order[2]}
Product Name : {order[3]}
Quantity : {order[4]}
Amount : ₹{order[5]}
Status : {order[6]}
Return Status : {order[7]}
Return Reason : {order[8]}
-------------------------
"""

        else:

            orders_context = """

No Orders Found.

"""
   # ============================================================
# STEP A4 : Add Product Context
# ============================================================

    add_product_context = ""

    if admin_intent == "add_product":

        add_product_context = """

You are helping the SmartShop Administrator add a new product.

The Add Product page contains the following fields:

• Product Name
• Category
• Price
• Stock
• Description
• Product Image

Your job is to help the administrator:

- Suggest professional product names
- Generate attractive descriptions
- Suggest suitable categories
- Suggest selling prices
- Suggest stock quantities
- Generate SEO-friendly descriptions
- Generate product features
- Improve existing product descriptions
- Explain why a category is appropriate

Never invent products already existing in the SmartShop database.

Focus only on helping the administrator create or improve a product.

"""

    # ============================================================
    # STEP A5 : Load Profile Context
    # ============================================================

    profile_context = ""

    if admin_intent == "profile":

        profile = None
        if admin_email:
            profile = get_profile_for_ai(admin_email)

        if profile:
            profile_context = f"""
Current Administrator Profile

First Name : {profile['first_name']}
Last Name : {profile['last_name']}
Email : {profile['email']}
Profile Image : {profile['profile_image']} 
Password : Hidden (Never reveal passwords)
"""
        else:
            profile_context = "\nAdministrator profile not found.\n"

    # ============================================================
    # STEP A7 : Build Gemini Prompt
    # ============================================================

    prompt = f"""
You are SmartShop Admin AI.

You are an intelligent AI assistant developed for the SmartShop E-Commerce Management System.

Your job is to help administrators manage the SmartShop platform.

Current Detected Module

{admin_intent}

=====================================================

Dashboard Information

{dashboard_context}

=====================================================

Product Information

{product_context}

=====================================================

Orders Information

{orders_context}

=====================================================

Add Product Information

{add_product_context}

=====================================================

Profile Information

{profile_context}

=====================================================

Instructions

1. First identify the current detected module.

2. If Current Detected Module is "dashboard":

   - Answer ONLY using Dashboard Information.
   - Never recommend products.
   - Never invent dashboard statistics.
   - Never switch to another module.

3. If Current Detected Module is "products":

   - Show SmartShop products first.
   - If SmartShop has matching products,
     explain every product separately.

   Show:

   Product Name

   Category

   Price

   Stock

   Description

4. After displaying SmartShop products,
   recommend similar products available in the general market.

5. If SmartShop does NOT contain matching products,

   First say:

   SmartShop currently does not have matching products.

   Then provide general market recommendations.

6. If Current Detected Module is "orders":

- Answer ONLY using Orders Information.
- Never invent order data.
- Never invent customer emails.
- Never invent order status.
- Never recommend products.
- Explain orders clearly using the available database records.

7. If Current Detected Module is "add_product":

- Answer ONLY using Add Product Information.
- Help the administrator create better products.
- Suggest professional product names.
- Suggest attractive descriptions.
- Suggest categories.
- Suggest reasonable selling prices.
- Suggest stock quantities.
- Suggest product features.
- Suggest SEO-friendly descriptions.
- Improve administrator-written descriptions.
- Never invent products already existing in SmartShop.
- Never answer with unrelated database information.

8. If Current Detected Module is "profile":

- Answer ONLY using Profile Information.
- Never invent profile information.
- Never reveal the administrator's password.
- If asked for the password, politely reply that passwords are securely stored and cannot be displayed.
- If profile information is unavailable, politely tell the administrator that the profile could not be found.

9. If Current Detected Module is "general":

Answer normally using Gemini knowledge.

10. Never invent SmartShop database information.

11. Use proper Markdown formatting.

12. Use headings.

13. Use bullet points.

14. Never write one huge paragraph.

=====================================================

Administrator Question

{question}
"""
    # ============================================================
    # STEP A8 : Gemini Chat
    # ============================================================

    try:

        chat = model.start_chat(history=[])

        start_time = time.time()

        response = chat.send_message(prompt)

        end_time = time.time()

        print(
            f"Admin Gemini Response Time : {end_time - start_time:.2f} seconds"
        )

        return {
            "success": True,
            "response": response.text
        }

    except Exception as e:
        print(f"GEMINI ERROR: {e}")
        return {
            "success": False,
            "error": str(e)
        }