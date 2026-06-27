import "./ProductCard.css";

function ProductCard({
  product,
  onView
}) {

  return (

    <div className="product-card">

<div className="product-image">

<img
  src={product.image_url}
  alt={product.name}
  style={{
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px"
  }}
/>

</div>

      <h3>
        {product.name}
      </h3>

      <p style={{fontSize:"13px",color:"#64748b"}}>
        {product.product_code}
      </p>

      <p>
        {product.category}
      </p>

      <div className="product-price">
        ₹ {product.price}
      </div>
      <div className={
        product.stock < 5 ? "stock-critical":
        product.stock < 25? "stock-low": 
        "stock-good"
        }
        >
          Stock: {product.stock}
        </div>

      <button
        onClick={() =>
          onView(product)
        }
      >
        View Product
      </button>

    </div>
  );
}

export default ProductCard;