import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import socket

EMAIL = os.getenv("EMAIL_ADDRESS")
PASSWORD = os.getenv("EMAIL_PASSWORD")
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT"))


def send_otp_email(receiver_email, otp):
    subject = "SmartShop AI - Password Reset OTP"

    body = f"""
Hello,

We received a request to reset your SmartShop AI account password.

Your OTP is:

{otp}

This OTP is valid for only 5 minutes.

If you did not request this password reset, please ignore this email.

Regards,
SmartShop AI Support Team
"""

    message = MIMEMultipart()
    message["From"] = f"SmartShop AI Support <{EMAIL}>"
    message["To"] = receiver_email
    message["Subject"] = subject

    message.attach(MIMEText(body, "plain"))

    print("SMTP_SERVER =", SMTP_SERVER)
    print("SMTP_PORT =", SMTP_PORT)
    print("EMAIL =", EMAIL)

    print("Resolved IP =", socket.gethostbyname(SMTP_SERVER))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587, timeout=30)
        print("SMTP Connected")

        server.ehlo()
        server.starttls()
        print("TLS Started")

        server.ehlo()
        server.login(EMAIL, PASSWORD)
        print("Logged In")

    except Exception as e:
        print("SMTP ERROR:", repr(e))
        raise