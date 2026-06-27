import { useState, useEffect } from "react";

import {
  updateProduct,
  deleteProduct
} from "../services/productApi";

function ProductModal({
  product,
  onClose
}) {

  const [editMode, setEditMode] =
  useState(false);

  const [formData, setFormData] =
  useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: ""
  });

  useEffect(() => {

    if (product) {

      setFormData({

        name:
        product.name || "",

        category:
        product.category || "",

        price:
        product.price || "",

        stock:
        product.stock || "",

        description:
        product.description || ""

      });

    }

  }, [product]);

  if (!product)
    return null;

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  const handleUpdate = async () => {

    try {

      await updateProduct(
        product.id,
        {

          product_name:
          formData.name,

          description:
          formData.description,

          price:
          formData.price,

          stock:
          formData.stock,

          category:
          formData.category

        }
      );

      alert(
        "Product Updated Successfully"
      );

      window.location.reload();

    }

    catch (error) {

      console.log(error);

      alert(
        "Update Failed"
      );

    }

  };

  const handleDelete = async () => {

    const answer =
    window.confirm(
      "Delete this product?"
    );

    if (!answer)
      return;

    try {

      await deleteProduct(
        product.id
      );

      alert(
        "Product Deleted Successfully"
      );

      window.location.reload();

    }

    catch {

      alert(
        "Delete Failed"
      );

    }

  };

  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="modal-content"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {
          editMode ?

          <>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
            />

            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
            />

            <input
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

          </>

          :

          <>

            <h2>
              {product.name}
            </h2>

            <p>
              <b>Product Code:</b>
              {" "}
              {product.product_code}
            </p>

            <p>
              <b>Category:</b>
              {" "}
              {product.category}
            </p>

            <p>
              <b>Price:</b>
              {" "}
              ₹ {product.price}
            </p>

            <p>
              <b>Stock:</b>
              {" "}
              {product.stock}
            </p>

            <p>
              <b>Description:</b>
              {" "}
              {product.description}
            </p>

          </>

        }

        <div
          className="modal-buttons"
        >

          {
            editMode ?

            <button
              className="update-btn"
              onClick={
                handleUpdate
              }
            >
              Save Changes
            </button>

            :

            <button
              className="update-btn"
              onClick={() =>
                setEditMode(true)
              }
            >
              Update Product
            </button>

          }

          <button
            className="delete-btn"
            onClick={
              handleDelete
            }
          >
            Delete Product
          </button>

        </div>

      </div>

    </div>

  );

}

export default ProductModal;