import MainLayout from "../components/MainLayout";
import { useEffect,useState } from "react";
import { getAllOrders } from "../services/orderApi";
import { getProducts } from "../services/productApi";
import {uploadProfileImage, updateProfileImage, getProfile} from "../services/profileApi";
import "../styles/profile.css";

function Profile() {
  const [orders,setOrders] = useState([]);
  const [products,setProducts] = useState([]);
  const [showOrders,setShowOrders] = useState(false);
  const [showProducts,setShowProducts] = useState(false);
  const [image,setImage] = useState(null);
  useEffect(()=>{loadOrders(); loadProducts(); loadProfile();},[]);

  const loadOrders = async()=>{  
    try{
      const response = await getAllOrders();
      setOrders(response.data);

    }
    catch(error){console.log(error);}
  };
  
  const loadProducts = async()=>{
    try{
      const response = await getProducts();
      setProducts(response.data);
    }
    catch(error){console.log(error);}
  };

  const loadProfile = async () => {
    try {
      const response = await getProfile(email);
      if (
        response.data.profile_image_url
      ) {
  
        setImage(
          response.data.profile_image_url
        );
      }
    }
    catch(error) {
      console.log(error);
    }
  };
  
  const email =localStorage.getItem("userEmail");

  const role =localStorage.getItem("role");
  
  return (
  <MainLayout>
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-image">
           {
            image ?
            <img src={image}alt=""/>
            :
            "👤"
            }
          </div>
          
          <div className="profile-info">
            <h2>Admin Profile</h2>
            <p>Email : {email}</p>
            <p>Role : {role}</p>
            <p>Password : ********</p>
            
            <input
            type="file"
            className="upload-btn"
            onChange={async (e) => {
              const file = e.target.files[0];
            
              if (!file)
                return;
            
              try {
            
                const formData = new FormData();
            
                formData.append("image", file);
            
                const response = await uploadProfileImage(
                    formData
                  );
            
                const imageUrl = response.data.image_url;
            
                setImage(imageUrl);
            
                await updateProfileImage({email, profile_image_url:imageUrl});
            
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

            }} 
            >
              Remove Photo
            </button>
          </div>
        </div>
      </div>
      
      <div className="dropdown-card">
        <div className="dropdown-header"
        onClick={()=>setShowOrders(!showOrders)}
        >
          ▼ Orders Overview
        </div>
        {
        showOrders &&
        <table className="profile-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th> 
              <th>Status</th>
            </tr>
          </thead>
          
          <tbody>
            {
            orders.map(order=>(
            <tr key={order[0]}>
              <td>{order[1]}</td>

              <td>{order[3]}</td>

              <td>{order[4]}</td>

              <td>{order[6]}</td>

            </tr>
           ))}
          </tbody>
          </table>
        }
      </div>
      <div className="dropdown-card">
        <div className="dropdown-header"
        onClick={()=>setShowProducts(!showProducts)}
        >
          ▼ Products Overview
        </div>
        
        {
        showProducts &&
        <table className="profile-table">
          <thead>
            <tr>
              <th>Product Code</th>
              <th>Name</th>
              <th>Stock</th>
            </tr>

          </thead>

          <tbody>
            {
            products.map(product=>(
            <tr key={product[0]}>
              <td>{product[7]}</td>
              <td>{product[1]}</td>
              <td>{product[4]}</td>
            </tr>
            ))}
          </tbody>
          </table>
          }
        </div>
      </div>
    </MainLayout>

);

}

export default Profile;