import os
import google.generativeai as tarun_ai

from app.services.order_service import search_orders_for_ai

import time

from app.services.product_service import product_service
from app.services.profile_service import get_profile_for_ai
from app.services.address_service import get_addresses



model = tarun_ai.GenerativeModel("gemini-flash-latest")


def ask_gemini(question: str, history=[]):
    tarun_ai.configure(api_key=os.getenv("Customer_GEMINI_API_KEY_1"))

    search_query = question
    
    
    order_keywords = [
        "order",
    "orders",
    "my order",
    "my orders",
    "latest order",
    "recent order",
    "pending order",
    "pending orders",
    "delivered order",
    "delivered orders",
    "cancelled order",
    "cancelled orders",
    "track order",
    "track my order",
    "return order",
    "return status"
    ]

    profile_keywords = [
        "profile",
    "my profile",
    "my name",
    "name",
    "first name",
    "last name",
    "who am i",
    "my email",
    "email",
    "registered email",
    "account",
    "my account",
    "profile picture",
    "profile photo",
    "photo",
    "image",
    "password"
    ]

    address_keywords = [

    "address",

    "my address",

    "saved address",

    "delivery address",

    "shipping address",

    "home address",

    "where do you deliver",

    "where is my address",

    "show address",

    "show my address",

    "my location",

    "location"
    ]
    
    is_order_query = any(
        keyword in question.lower()
        for keyword in order_keywords
    )

    is_profile_query = any(
        keyword in question.lower()
        for keyword in profile_keywords
    )

    is_address_query = any(
        keyword in question.lower()
        for keyword in address_keywords
    )

    customer_email = ""
    for item in history:
        if item.role == "email":
            customer_email = item.text

            break

    profile = None
    if customer_email:
        profile = get_profile_for_ai(customer_email)
    
    addresses = []
    if customer_email:
        addresses = get_addresses(customer_email)
        
    order_context = ""

    last_user_question = ""
    if history:
        for item in reversed(history):

            if item.role == "user":
                last_user_question = item.text
                break

    if last_user_question:
        search_query = last_user_question + " " + question


    if is_order_query:

        if customer_email:
            orders = search_orders_for_ai(customer_email)
            
            if orders:
                order_context = "\n\nCustomer Orders\n\n"

                for order in orders:
                    order_context += f"""
                      Product : {order[0]}
                      Quantity : {order[1]}
                      Amount : ₹{order[2]}
                      Status : {order[3]}
                      Order Date : {order[4]}
                      -------------------------
                      """
            else:
                order_context = "\nCustomer has no orders.\n"
        
        else:
            order_context = "\nUnable to identify the logged-in customer.\n"


    products = []
    if not is_order_query:
        products = product_service.search_products_for_ai(search_query)
        if not products:
            products = product_service.search_products_for_ai(question)
    
    product_context = ""
    
    if products:
        product_context = "\n\nProducts currently available in SmartShop:\n\n"
        product_context += f"Total Matching Products : {len(products)}\n\n"
        
        for product in products:
            product_context += (
                f"""
                Product Name : {product['product_name']}
                Category     : {product['category']}
                Price        : ₹{product['price']}
                Stock        : {product['stock']}
                Description  : {product['description']}
                -------------------------
                """
            )
    else:
        product_context = (
        "\n\nNo matching products were found in SmartShop for the customer's current request.\n"
    )
        
    profile_context = ""
    if is_profile_query:
        if profile:
            profile_context = f"""
    Current Customer Profile
    First Name : {profile['first_name']}
    Last Name : {profile['last_name']}
    Email : {profile['email']}
    Profile Image : {profile['profile_image']}
    Password : Hidden (Never reveal passwords)
    """

        else:
            profile_context = "\nCustomer profile not found.\n"

    address_context = ""
    if is_address_query:
        if addresses:
            address_context = "Saved Customer Addresses:\n\n"

            for addr in addresses:
                address_context += f"""

    Full Name : {addr[2]}
    Phone : {addr[3]}
    Address : {addr[4]}
    City : {addr[5]}
    State : {addr[6]}
    Pincode : {addr[7]}
"""

        else:
            address_context = "No saved address found for this customer."

    try:
        prompt = f"""
You are SmartShop AI, a professional AI shopping assistant for a multi-category e-commerce platform similar to Amazon and Flipkart.

Your responsibilities:

• Help customers choose products.
• Answer questions about any product category.
• Explain product features.
• Compare products.
• Recommend products based on customer requirements.
• Give buying suggestions.
• Answer shopping-related questions professionally.

The store can contain products from ANY category including:

- Mobiles
- Laptops
- Computers
- Tablets
- Televisions
- Refrigerators
- Washing Machines
- Air Conditioners
- Kitchen Appliances
- Furniture
- Home Decor
- Grocery
- Fashion
- Shoes
- Watches
- Beauty Products
- Books
- Toys
- Sports
- Fitness
- Automotive
- Accessories
- Electronic Gadgets
- Office Supplies
- and many more.

Always answer using clean Markdown.

Use this format whenever possible.

# Product Name

**Price**
₹XXXX

**Category**
Category Name

**Brand**
Brand Name (if available)

**Specifications**

- Specification 1
- Specification 2
- Specification 3

**Key Features**

- Feature 1
- Feature 2
- Feature 3

**Pros**

- Point 1
- Point 2

**Cons**

- Point 1

---

If multiple products are requested:

Show every product separately.

Separate every product using a horizontal line.

At the end always write:

# Recommendation

Recommend the best product and explain why.

Important Rules:

- Never write one huge paragraph.
- Use headings.
- Use bullet points.
- Use bold text.
- Keep answers neat.
- Make answers easy to read.
- If the question is not about shopping, politely answer it but guide the conversation back to shopping whenever appropriate.

ORDER RULES

1. If Current Customer Order Information contains orders, answer using those orders.

2. Never say "No orders found" if order information is provided.

3. If the customer asks:
   - My orders
   - Latest order
   - Pending orders
   - Delivered orders
   - Cancelled orders
   - Track my order

   Answer only from the provided Customer Order Information.

4. Show every order separately.

5. Include:
   - Product Name
   - Quantity
   - Amount
   - Status
   - Order Date

6. If no order information is available, politely say the customer has no orders.

Current SmartShop Product Database:

{product_context}


The above products are REAL products currently available in SmartShop.

IMPORTANT RULES

1. If the above product list contains one or more products, always display those SmartShop products FIRST.

2. Create a heading exactly like this:

# Products Available in SmartShop

3. For every SmartShop product display:

- Product Name
- Price
- Category
- Stock
- Description

4. After displaying all SmartShop products, ALWAYS create another heading exactly like this:

# Products Not Available in SmartShop (General Recommendations)

5. Under that heading, recommend similar products from your own knowledge that customers may also like.

6. Mention that these are general market recommendations and are NOT currently available in SmartShop.

7. If SmartShop has no matching products, skip the first heading and simply say:

"SmartShop currently does not have matching products."

Then immediately provide the heading:

# Products Not Available in SmartShop (General Recommendations)

and recommend similar products from your knowledge.

8. Never stop after showing SmartShop products. Always continue with general recommendations whenever possible.

Current Customer Order Information:

{order_context}

If Current Customer Order Information is not empty, these are the REAL orders placed by the logged-in customer.

Never invent orders.

Never mix another customer's orders.

Answer only from this order information.

Current Customer Profile:

{profile_context}

The above profile information belongs to the currently logged-in customer.

PROFILE RULES

1. If the customer asks:
   - What is my name?
   - Who am I?
   - Show my profile.
   - What is my email?
   - What is my first name?
   - What is my last name?
   - Do I have a profile picture?

   Answer ONLY using the Current Customer Profile information.

2. Never invent profile information.

3. Never reveal the customer's password.

4. If the customer asks for the password, politely reply that passwords are securely stored and cannot be displayed.

5. If profile information is unavailable, politely tell the customer that the profile could not be found.

Current Customer Address Information:

{address_context}

ADDRESS RULES

1. If the customer asks about:
   - My address
   - Delivery address
   - Shipping address
   - Saved address
   - Home address

   Answer ONLY using the Current Customer Address Information.

2. Never invent addresses.

3. If no address exists, politely tell the customer that no saved address is available.

Customer Question:

{question}

Important:

1. Always check the SmartShop products first.

2. If matching SmartShop products exist, list ALL matching SmartShop products first.

3. Explain each SmartShop product with:
- Name
- Price
- Category
- Description
- Stock

4. After showing SmartShop products, you may additionally give general market recommendations if they help the customer.

5. Never say SmartShop doesn't have a product if it exists in the provided product list.

6. If no SmartShop products match, clearly mention that and then provide general market alternatives.

7. If multiple SmartShop products match (for example multiple laptops or flowers), show every matching product.
"""

        # Create conversation history for Gemini
        gemini_history = []
        for item in history:
            if item.role == "email":
                continue
 
            if item.role == "user":
                gemini_history.append({
                "role": "user",
                "parts": [item.text]
              })
            elif item.role == "assistant":
                gemini_history.append({
            "role": "model",
            "parts": [item.text or ""]
            })
        chat = model.start_chat(history=gemini_history)

        start_time = time.time()
        response = chat.send_message(prompt)

        end_time = time.time()
        print(f"Gemini Response Time: {end_time - start_time:.2f} seconds")

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