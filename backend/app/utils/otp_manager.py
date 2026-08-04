import random
import time

otp_storage = {}


def generate_otp():
    return str(random.randint(1000, 9999))


def save_otp(email, otp):
    otp_storage[email] = {
        "otp": otp,
        "expiry": time.time() + 300
    }


def verify_otp(email, otp):
    data = otp_storage.get(email)

    if not data:
        return False

    if time.time() > data["expiry"]:
        otp_storage.pop(email)
        return False

    if data["otp"] != otp:
        return False

    otp_storage.pop(email)
    return True