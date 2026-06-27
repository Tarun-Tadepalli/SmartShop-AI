import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import CustomerLayout from "../components/CustomerLayout";
import {getCustomerOrders} from "../services/orderApi";
import FeedbackModal from "../components/FeedbackModal";
import ReturnModal from "../components/ReturnModal";

import {requestReturn} from "../services/orderApi";

function MyOrders() {
    const navigate = useNavigate();
    const [selectedOrder,setSelectedOrder] = useState(null);
    const [orders,setOrders] =useState([]);
    const [selectedReturnOrder, setSelectedReturnOrder] = useState(null);

    useEffect(() => {loadOrders();}, []);
    const loadOrders =async () => {
      try {
        const email =localStorage.getItem(
          "userEmail"
        );
  
        const response =await getCustomerOrders(
          email
        );
  
        setOrders(response.data);
      }
  
      catch(error) {
  
        console.log(error);
  
      }
    };

    const submitReturn = async (reason) => {
      try {
        await requestReturn(selectedReturnOrder.id,reason);

      alert(
        "Return Request Submitted"
      );

      setSelectedReturnOrder(null);

      loadOrders();

      }

     catch {
      alert("Return Failed");

      }  

    };
  
    return (
  
      <CustomerLayout>
  
        <h1>
          My Orders
        </h1>
  
        <table
          className="orders-table"
        >
  
          <thead>
  
            <tr>
  
              <th>ID</th>
  
              <th>Product</th>
  
              <th>Qty</th>
  
              <th>Amount</th>
  
              <th>Status</th>

              <th>Track</th>

              <th>Feedback</th>
              <th>Return</th>
  
            </tr>
  
          </thead>
  
          <tbody>
  
            {
              orders.map((order) => (
                  <tr
                    key={order[0]}
                  >
  
                    <td>
                      {order[0]}
                    </td>
  
                    <td>
                      {order[1]}
                    </td>
  
                    <td>
                      {order[2]}
                    </td>
  
                    <td>
                      ₹ {order[3]}
                    </td>
  
                    <td>
                      {order[4]}
                    </td>
                    <td>
                      <button className="track-btn"
                      onClick={() =>navigate("/track-order",{
                        state:{product_name:order[1],status:order[4]}
                      })}
                      >
                        Track
                      </button>
                    </td>

                    <td>
                      {
                      order[4] === "Delivered" &&
                      (order[6] ?
                      <span style={{color:"green",fontWeight:"bold"}}>
                        ✓ Feedback Submitted
                      </span>
                      :
                      <button className="feedback-btn"
                      onClick={() =>setSelectedOrder({order_id:order[0], product_name:order[1], product_id:order[0]})}
                      >
                        Feedback
                      </button>
                      )}
                    </td>

                    <td>
                      {
                      order[4] === "Delivered" &&
                      (
                        order[5] === "Requested" ?
                        <span>⏳ Return Requested</span>
                        :
                        order[5] === "Returned" ?
                        <span style={{color:"green"}}>✓ Returned</span>
                        :
                        order[5] === "Rejected" ?
                        <span style={{color:"red"}}>✗ Return Rejected</span>
                        :
                        <button className="return-btn"

                        onClick={() =>setSelectedReturnOrder({id:order[0], product_name:order[1]})}

                        >

                          Request Return

                        </button>
                      )}
                    </td>

                    
  
                  </tr>
                )
              )
            }
  
          </tbody>
  
        </table>
        {
        selectedOrder &&
        <FeedbackModal
        order={selectedOrder}
        onClose={()=>setSelectedOrder(null)}
        />
        }
        {
        selectedReturnOrder &&
        <ReturnModal
        order={selectedReturnOrder}
        onClose={() => setSelectedReturnOrder(null)}
        onSubmit={submitReturn}
        />
        }
  
      </CustomerLayout>
  
    );
  }
  
  export default MyOrders;