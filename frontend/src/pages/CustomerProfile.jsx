import { useEffect,useState } from "react";
import CustomerLayout from "../components/CustomerLayout";
import { getCustomerOrders }from "../services/orderApi";
import { useNavigate }from "react-router-dom";
import { changePassword } from "../services/profileApi";
import {uploadProfileImage, updateProfileImage, getProfile} from "../services/profileApi";
import "../styles/customerprofile.css";


function CustomerProfile() {
  const navigate = useNavigate();
  const [orders,setOrders] = useState([]);
  const [showOrders,setShowOrders] = useState(false);
  const [image,setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const email =localStorage.getItem("userEmail");
  const [showPasswordForm,setShowPasswordForm] = useState(false);
  const [currentPassword,setCurrentPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");

const [confirmPassword,setConfirmPassword] = useState("");

  useEffect(()=>{loadOrders(); loadProfile();},[]);
  const loadOrders = async()=>{
    try{
      const response =await getCustomerOrders(email);
      console.log(response.data);
      setOrders(response.data);
    }
    catch(error){
      console.log(error);
    }
  };

  const loadProfile = async () => {

    try {
  
      const response = await getProfile(email);
  
      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
  
      if (response.data.profile_image_url) {
  
        setImage(response.data.profile_image_url);
  
      }
  
    }
  
    catch (error) {
  
      console.log(error);
  
    }
  
  };
  
  const buyAgain =(order)=>{
    const item = {
      id: order[0],
      name: order[1],
      quantity: 1,
      price: order[3]
    };
    
    localStorage.setItem("checkoutItems", JSON.stringify([item]));
    navigate("/checkout");
  };

  const updatePassword = async () => {

    if(newPassword !== confirmPassword){
      alert(
        "Passwords do not match"
      );
      return;
    }

    try{
  
      const response = await changePassword({
  
        email, current_password: currentPassword,
        new_password: newPassword
      });
  
      alert(
        response.data.message
      );
  
      if(response.data.success){
  
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
  
        setShowPasswordForm(false);
      }
  
    }
    catch(error){
  
      alert(
        "Password update failed"
      );
  
    }
  
  };

  return(
  <CustomerLayout>
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-image">
            {
            image ?
            <img src={image} alt=""/>
            :
            "👤"
            }
          </div>
          
          <div className="profile-info">
          <h2>{firstName} {lastName}</h2>
            <p>Email : {email}</p>
            <p className="password-display">
              Password : ********
              <button className="edit-password-btn"
              onClick={() => setShowPasswordForm(true)}
              >
                Edit Password
              </button>
            </p>
            <input type="file"
            className="upload-btn"
            onChange={async (e) => {

              const file =
                e.target.files[0];
            
              if (!file)
                return;
            
              try {
            
                const formData =
                  new FormData();
            
                formData.append(
                  "image",
                  file
                );
            
                const response =
                  await uploadProfileImage(
                    formData
                  );
            
                const imageUrl =
                  response.data.image_url;
            
                setImage(
                  imageUrl
                );
            
                await updateProfileImage({
                  email,
                  profile_image_url:
                    imageUrl
                });
            
                alert(
                  "Profile Photo Updated"
                );
            
              }
              catch (error) {
            
                console.log(error);
            
                alert(
                  "Upload Failed"
                );
              }
            }}
            />
            <button className="remove-photo-btn"
            onClick={async ()=>{
              try{
                await updateProfileImage({email, profile_image_url:null});
                setImage(null);
              }
              catch(error){
                console.log(error);
              }
              }}>
                Remove Photo
              </button>            
          </div>
        </div>
      </div>
      
      <div className="dropdown-card">
        <div className="dropdown-header"
        onClick={()=>setShowOrders(!showOrders)}
        >
          ▼ My Orders
        </div>
        {
        showOrders &&
        <table className="profile-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
            orders.map(order=>(
            <tr key={order[0]}>
              <td>{order[1]}</td>
              <td>{order[2]}</td>
              <td>₹ {order[3]}</td>
              <td>{order[4]}</td>
              <td>
                {
                order[4] === "Delivered"
                ?
                <button className="buy-again-btn"
                onClick={()=>buyAgain(order)}
                >
                  Buy Again
                </button>
                :
                <button className="track-btn"
                onClick={()=>navigate("/my-orders")}
                >
                  Track
                </button>
               }
              </td>
            </tr>
           ))}
          </tbody>
        </table>
        }
      </div>

      {
      showPasswordForm &&
      <div className="password-modal-overlay"
      onClick={() => setShowPasswordForm(false)}
      >
        <div
        className="password-modal"
        onClick={(e)=>e.stopPropagation()}
        >
          <h2>Change Password</h2>
          <input type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e)=>setCurrentPassword(e.target.value)}
          />
          <input type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          />
          <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          />
          <div className="password-actions">
            <button className="cancel-password-btn"
            onClick={() =>setShowPasswordForm(false)}
            >
              Cancel
            </button>
            <button className="save-password-btn"
            onClick={updatePassword}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      }
    </div>

    
  </CustomerLayout>

);

}

export default CustomerProfile;