import { useState, useEffect } from "react";
import CustomerLayout from "../components/CustomerLayout";
import "../styles/checkout.css";

import { placeOrder } from "../services/orderApi";
import { useNavigate } from "react-router-dom";

import {saveAddress, getAddresses} from "../services/addressApi";

function Checkout() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const increaseQty = (id) => {
    const updated = items.map(item =>
      item.id === id
      ? {
          ...item,
          quantity: item.quantity + 1
        }
      : item
    );
  
    setItems(updated);
  };
  
  const decreaseQty = (id) => {
    const updated = items.map(item =>
      item.id === id
      ? {
          ...item,
          quantity:
          Math.max(
            1,
            item.quantity - 1
          )
        }
      : item
    );
  
    setItems(updated);
  };

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {

    const checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) 
    || [];
    
    setItems(checkoutItems);
    
    loadAddresses();
    
    }, []);

  const totalAmount = items.reduce(
    (total, item) => total + (item.price * (item.quantity || 1)), 0
  );

  const loadAddresses = async () => {

    try{
      const email = localStorage.getItem("userEmail");
    
      const response = await getAddresses(email);
    
      setSavedAddresses(response.data);
    }
    
    catch(error){
    
     console.log(error);
    
    }
    
  };

  const handleAddressSelect =(addressRow) => {
    setSelectedAddressId(addressRow[0]);
    setAddress({
      fullName:addressRow[2],
      phone:addressRow[3],
      address:addressRow[4],
      city:addressRow[5],
      state:addressRow[6],
      pincode:addressRow[7]
    });
  };

  const placeOrderHandler = async () => {

    if (
      !address.fullName ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      alert("Please Fill Address");
      return;
    }
  
    try {
      let addressId = selectedAddressId;
  
      const email = localStorage.getItem("userEmail");

      if(!selectedAddressId){

        const email = localStorage.getItem("userEmail");
        
        const response = await saveAddress({
          customer_email:email,
          full_name: address.fullName,
          phone: address.phone,
          address: address.address,
          city: address.city,
         state: address.state,
         pincode: address.pincode
        });
        
        addressId = response.data.address_id;
        }

      for (const item of items) {
  
        await placeOrder({
  
          customer_email: email,

          address_id: addressId,
  
          product_id: item.id,
  
          product_name: item.name,
  
          quantity: item.quantity || 1,
  
          total_amount: item.price * (item.quantity || 1)
        });
  
      }
      
      const cart = JSON.parse(localStorage.getItem("cart")) 
      || [];
      
      const remainingCart = cart.filter(
        cartItem => !items.some(
          orderedItem => orderedItem.id === cartItem.id
        )
      );
      localStorage.setItem("cart",
        JSON.stringify(remainingCart)
      );
      
      localStorage.removeItem("checkoutItems");

      alert(
        "Order Placed Successfully"
      );
  
      navigate("/my-orders");
  
    }
  
    catch {
  
      alert(
        "Order Failed"
      );
    }
  };

  return (
    <CustomerLayout>
      <div className="checkout-page">
        <h1>Checkout</h1>
        <div className="checkout-grid">
          <div className="address-card">
            <h2>Delivery Address</h2>

            {
            savedAddresses.length > 0 && (
            <select value={selectedAddressId}
             onChange={(e)=>{const selected = savedAddresses.find(a => a[0] == e.target.value);
               handleAddressSelect(selected);
              }}
             >
              <option value="">Select Saved Address</option>
              {savedAddresses.map(address => (
                <option
                key={address[0]}
                value={address[0]}
                >
                  {address[2]} 
                  -
                  {address[5]}
                  
                </option>
              ))}
            </select>
            )
            }
            <button type="button"
            className="add-address-btn"
            onClick={() =>setShowNewAddressForm(!showNewAddressForm)}
            >
              + Add New Address
            </button>

            {
            showNewAddressForm && (
              <>
            
            <input
              placeholder="Full Name"
              value={address.fullName}
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
            />
            <input
              placeholder="Phone Number"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            />
            <textarea
              placeholder="Address"
              value={address.address}
              onChange={(e) => setAddress({ ...address, address: e.target.value })}
            />
            <input
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
              placeholder="State"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
            />
            <input
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            />

            </>
            )
          }
          </div>

          <div className="checkout-products">
            <h2>Order Summary</h2>
            {
            items.map(item => (
            <div key={item.id}
              className="checkout-item"
             >
              <h3>{item.name}</h3>
              <p>
                ₹ {item.price}
              </p>
              <div className="qty-box">
                <button
                onClick={() =>decreaseQty(item.id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                onClick={() =>increaseQty(item.id)}
                >
                  +
                </button>
              </div>
              
              <p style={{fontsize: "20px"}}>
                Subtotal: ₹ {item.price * item.quantity}
              </p>
            </div>
           ))}
          </div>

          <div className="payment-card">
            <h2>Payment Method</h2>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="COD">Cash On Delivery</option>
              <option value="UPI">UPI</option>
              <option value="CARD">Card</option>
              <option value="PHONEPE">PhonePe</option>
            </select>

            {paymentMethod === "CARD" && (
              <>
                <input placeholder="Card Number" />
                <input placeholder="Expiry" />
                <input placeholder="CVV" />
              </>
            )}

            {paymentMethod === "UPI" && <input placeholder="UPI ID" />}

            {paymentMethod === "PHONEPE" && <div className="qr-box">📱 Dummy QR Code</div>}



            <p>
              Delivery :
              <span className="delivery-free">
                FREE
              </span>
            </p>
            
            <p>Items : {items.length}</p>
            
            <div className="order-total">
              Total : ₹ {totalAmount}
            </div>

            <button
            className="place-order-btn"
            onClick={placeOrderHandler}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

export default Checkout;