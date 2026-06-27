import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import CustomerLayout from "../components/CustomerLayout";

import "../styles/cart.css";

function Cart() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => { 
    const savedCart = JSON.parse(
      localStorage.getItem("cart")
    ) || [];

    const cartWithQty = savedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));

    setCartItems(
      cartWithQty
    );

  }, []);

  const updateCart = (updatedItems) => {

    setCartItems(updatedItems);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedItems)
    );
  };

  const increaseQty = (id) => {

    const updated = cartItems.map(item =>
      item.id === id? {
          ...item,
          quantity:
          item.quantity + 1
        }
      : item
    );

    updateCart(updated);
  };

  const decreaseQty = (id) => {

    const updated = cartItems.map(item =>
      item.id === id ? {
          ...item,
          quantity:
          Math.max(
            1,
            item.quantity - 1
          )
        }
      : item
    );

    updateCart(updated);
  };

  const removeItem = (id) => {

    const updated = cartItems.filter(
      item => item.id !== id
    );

    updateCart(updated);
  };

  const totalAmount = cartItems.reduce(
    (total,item) =>
      total +
      (
        item.price *
        item.quantity
      ),
    0
  );

  const proceedCheckout = () => {

    localStorage.setItem(
      "checkoutItems",
      JSON.stringify(cartItems)
    );

    navigate("/checkout");
  };

  return (

    <CustomerLayout>

      <div className="cart-page">
        <h1>
          Shopping Cart
        </h1>
        {
          cartItems.length === 0 ?
          <h3>
            Cart Is Empty
          </h3>
          :
          <>
            {
              cartItems.map(item => (
                <div
                  key={item.id}
                  className="cart-card"
                >
                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <p>
                    ₹ {item.price}
                  </p>

                  <div
                    className="qty-section"
                  >
                    <button
                      onClick={() => decreaseQty(item.id)}
                    >
                     -
                    </button>
                    <span>
                      {
                        item.quantity
                      }
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-actions">
                    <button
                    className="buy-now-btn"
                    onClick={() => {localStorage.setItem("checkoutItems",JSON.stringify([item]));
                      navigate("/checkout");
                    }}
                    >
                      Buy Now
                      </button>
                      <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                      >
                        Remove
                        </button>
                    </div>
                </div>
              ))
            }

            <div className="cart-total">
              <h2>
                Total : ₹ {totalAmount}
              </h2>
              <button
                className="checkout-btn"
                onClick={ proceedCheckout }
              >
                Buy All
              </button>
            </div>
          </>
        }
      </div>
    </CustomerLayout>
  );
}

export default Cart;