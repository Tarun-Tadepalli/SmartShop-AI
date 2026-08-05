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

    server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=30)
    server.starttls()
    server.login(EMAIL, PASSWORD)
    server.send_message(message)
    server.quit()