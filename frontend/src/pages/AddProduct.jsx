import { useState } from "react";
import MainLayout from "../components/MainLayout";
import "../styles/addProduct.css";
import { addProduct, uploadProductImage } from "../services/productApi";

function AddProduct() {
  const [productName, setProductName] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [stock, setStock] = useState("");

  const [category, setCategory] = useState("");

  const [message, setMessage] = useState("");
  
  const [imagePreview, setImagePreview] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = async (event) => {

    const file = event.target.files[0];
  
    if (!file)
      return;
  
    setSelectedImage(file);
  
    setImagePreview(
      URL.createObjectURL(file)
    );
  
    try {
  
      const formData =
        new FormData();
  
      formData.append(
        "image",
        file
      );
  
      const response =
        await uploadProductImage(
          formData
        );
  
      setImageUrl(
        response.data.image_url
      );
  
    }
    catch (error) {
  
      console.log(error);
  
      alert(
        "Image Upload Failed"
      );
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    try {
  
      await addProduct({
  
        product_name: productName,
  
        description: description,
  
        price: price,
  
        stock: stock,
  
        category: category,
  
        image_url: imageUrl
  
      });
  
      setMessage(
        "Product Added Successfully"
      );
  
      setProductName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
  
    }
  
    catch {
  
      setMessage(
        "Failed To Add Product"
      );
    }
  };

  return (
    <MainLayout>

      <div className="add-product-page">

        <h1 className="add-product-title">
          Add Product
        </h1>

        <form className="add-product-form"
        onSubmit={handleSubmit}>

  <div className="form-row">

    <div className="form-group">
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Enter product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label>Category</label>
      <input
        type="text"
        placeholder="Enter category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
    </div>

  </div>

  <div className="form-row">

    <div className="form-group">
      <label>Price</label>
      <input
        type="number"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label>Stock</label>
      <input
        type="number"
        placeholder="Enter stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
    </div>

  </div>

  <div className="form-group">

    <label>Description</label>

    <textarea
      rows="6"
      placeholder="Enter product description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

  </div>

  <div className="image-upload-section">

  <div className="upload-box">

    <label>Product Image</label>

    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
    />

    <p>
      Upload Product Image
    </p>

  </div>

  {imagePreview && (

    <div className="preview-section">

      <img
        src={imagePreview}
        alt="Preview"
        className="preview-image"
      />

    </div>

  )}
  {
  message &&

  <p
    style={{
      color:
      message.includes("Success")
      ? "green"
      : "red"
    }}
  >
    {message}
  </p>
}

</div>

  <div className="button-section">

    <button type="submit">
      Save Product
    </button>

  </div>

</form>

      </div>

    </MainLayout>
  );
}

export default AddProduct;