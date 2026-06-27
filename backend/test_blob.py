from app.services.azure_blob_service import azure_blob_service


class DummyFile:

    def __init__(self, filepath):

        self.filename = filepath.split("\\")[-1]

        self.file = open(filepath, "rb")


file = DummyFile(
    "test_images/photo.jpg"
)

url = azure_blob_service.upload_product_image(
    file
)

print("\nIMAGE URL:\n")
print(url)