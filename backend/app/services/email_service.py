import os
import httpx
from dotenv import load_dotenv

load_dotenv()

MAILJET_API_KEY = os.getenv("MAILJET_API_KEY")
MAILJET_SECRET_KEY = os.getenv("MAILJET_SECRET_KEY")
SENDER_EMAIL = os.getenv("MAILJET_SENDER_EMAIL")
SENDER_NAME = os.getenv("MAILJET_SENDER_NAME")


def send_otp_email(receiver_email, otp):
    url = "https://api.mailjet.com/v3.1/send"

    payload = {
        "Messages": [
            {
                "From": {
                    "Email": SENDER_EMAIL,
                    "Name": SENDER_NAME
                },
                "To": [
                    {
                        "Email": receiver_email
                    }
                ],
                "Subject": "SmartShop AI | Password Reset Verification Code",
                "TextPart": f"""
Hello,

We received a request to reset your SmartShop AI account password.

Your OTP is:

{otp}

This OTP is valid for only 5 minutes.

If you did not request this password reset, please ignore this email.

Regards,
SmartShop AI Support Team
"""
            }
        ]
    }

    response = httpx.post(
        url,
        auth=(MAILJET_API_KEY, MAILJET_SECRET_KEY),
        json=payload,
        timeout=30
    )

    if response.status_code != 200:
        print("Mailjet Error:")
        print(response.text)
        raise Exception("Failed to send OTP email")

    print("OTP Email Sent Successfully")