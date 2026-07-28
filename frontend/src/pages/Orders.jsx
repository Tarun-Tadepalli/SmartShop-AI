import { useEffect, useState } from "react";

import MainLayout from "../components/Mainlayout";

import {getAllOrders, updateOrderStatus} from "../services/orderApi";

import {getFeedbackByOrder} from "../services/feedbackApi";
  
import AdminFeedbackModal from "../components/AdminFeedbackModal";

import CustomerAddressModal from "../components/CustomerAddressModal";

import {getAddressByOrder} from "../services/addressApi";

import "../styles/orders.css";



function Orders() {

  const [orders,setOrders] = useState([]);

  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const [customerDetails,setCustomerDetails] = useState(null);

  useEffect(() => {loadOrders();}, []);

  const loadOrders = async () => {
    try {
      const response =
      await getAllOrders();

      setOrders(response.data);
    }

    catch(error) {

      console.log(error);

    }
  };

  const handleStatusChange = async (orderId,status) => {
    try {
      await updateOrderStatus(orderId, status);
      loadOrders();
    }

    catch(error) {
      console.log(error);
    }
  };

  const viewFeedback = async (orderId) => {
    try {
      const response =await getFeedbackByOrder(orderId);
      setSelectedFeedback({rating: response.data[0],review: response.data[1]});
    }
    catch {
      alert("No Feedback Yet");
    }
  };

  const viewCustomerDetails = async (orderId) => {
    try{
      const response =await getAddressByOrder(orderId);
      setCustomerDetails(response.data);
    }
    catch{
      alert("No Address Found");
    }
  };

  return (

    <MainLayout>

      <h1
        className="orders-title"
      >
        Orders
      </h1>

      <div
        className="orders-card"
      >
        <table
          className="orders-table"
        >
          <thead>

            <tr>

              <th>ID</th>

              <th>Customer</th>

              <th>Product Code</th>

              <th>Product</th>

              <th>Qty</th>

              <th>Amount</th>

              <th>Status</th>

              <th>Return Status</th>

              <th>Reason</th>

              <th>FeedBack</th>

              <th>Action</th>

            </tr>

          </thead>
          <tbody>
            {
              orders.map(
                (order) => (

                  <tr
                    key={order[0]}
                  >

                    <td>
                      {order[0]}
                    </td>

                    <td>
                      <button className="customer-link"
                      onClick={() =>viewCustomerDetails(order[0])}
                      >
                        {order[1]}
                      </button>
                    </td>

                    <td>
                      {order[2]}
                    </td>

                    <td>
                      {order[3]}
                    </td>

                    <td>
                       {order[4]}
                    </td>

                    <td>
                      ₹ {order[5]}
                    </td>

                    <td>

                      <span
                        className={
                          `status-badge ${order[6].toLowerCase()}`
                        }
                      >

                        {order[6]}

                      </span>

                    </td>

                    <td>
                      {order[7] || "-"}
                    </td>
                    
                    <td>
                      {order[8] || "-"}
                    </td>

                    <td>
                      {
                      order[6] === "Delivered" ?
                      <button className="feedback-btn"
                      onClick={() => viewFeedback(order[0])}
                      >
                        ⭐ View
                      </button>
                      :
                      "-"
                      }
                    </td>

                    <td>
                      { 
                      order[7] === "Requested" ?
                      <div>
                        <button
                        className="approve-btn"
                        onClick={() =>handleStatusChange(order[0],"Returned")}
                        >
                          Approve
                        </button>
                        <button
                        className="reject-btn"
                        onClick={() =>handleStatusChange(order[0],"Rejected")}
                        >
                          Reject
                        </button>
                      </div>
                      :
                      order[7] === "Returned"
                      ?
                      <span style={{color:"green", fontWeight:"bold"}}>
                        ✓ Completed
                      </span>
                      :
                      order[7] === "Rejected" ?
                      <span style={{color:"red", fontWeight:"bold"}}>
                        ✗ Rejected
                      </span>
                      :
                      order[6] === "Delivered" ?
                      <span>No Return Request</span>
                      :
                      <select
                      value={order[6]}
                      onChange={(e)=>handleStatusChange(order[0],e.target.value)}
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                      }

                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

      {
      selectedFeedback && 
      <AdminFeedbackModal
      feedback={selectedFeedback}
      onClose={() => setSelectedFeedback(null)}
      />
      }
      {
      customerDetails &&
      <CustomerAddressModal
      details={customerDetails}
      onClose={() =>setCustomerDetails(null)}
      />
      }

    </MainLayout>

  );
}

export default Orders;