import os
import uuid

from dotenv import load_dotenv

from azure.storage.blob import BlobServiceClient

load_dotenv()

class AzureBlobService:
    def upload_product_image(self,file):
        connection_string = os.getenv("AZURE_STORAGE_CONNECTION_STRING")    
        container_name = os.getenv("AZURE_CONTAINER_PRODUCT")

        blob_service_client = BlobServiceClient.from_connection_string(connection_string)

        extension = file.filename.split('.')[-1]

        unique_filename = (str(uuid.uuid4()) + '.' + extension)

        blob_client = blob_service_client.get_blob_client(container=container_name, blob=unique_filename)

        blob_client.upload_blob(file.file, overwrite=True)

        return blob_client.url
    
    def upload_profile_image(self, file):
        connection_string = os.getenv("AZURE_STORAGE_CONNECTION_STRING")
        container_name = os.getenv("AZURE_CONTAINER_PROFILE")

        blob_service_client = BlobServiceClient.from_connection_string(connection_string)

        extension = file.filename.split(".")[-1]

        unique_filename = (str(uuid.uuid4())+ "." + extension) 

        blob_client = blob_service_client.get_blob_client(container=container_name, blob=unique_filename)

        blob_client.upload_blob(file.file,overwrite=True)
        
        return blob_client.url

azure_blob_service = AzureBlobService()