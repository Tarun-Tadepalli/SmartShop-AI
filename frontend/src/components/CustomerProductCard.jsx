import "./ProductCard.css";

function CustomerProductCard({ product, onAddToCart, onBuyNow}) {

  const outOfStock = product.stock <= 0;

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

      <p>
        {product.description}
      </p>

      <div className="product-price">

        ₹ {product.price}

      </div>

      {

        outOfStock ?

        <div
          className="stock-critical"
        >

          Out Of Stock

        </div>

        :

        <>

          <button
            onClick={() =>
              onAddToCart(product)
            }
          >

            Add To Cart

          </button>

          <br />

          <br />

          <button
            onClick={() =>
              onBuyNow(product)
            }
          >

            Buy Now

          </button>

        </>

      }

    </div>
  );
}

export default CustomerProductCard;