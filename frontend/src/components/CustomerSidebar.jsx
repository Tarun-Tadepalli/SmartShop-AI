import {NavLink,useNavigate} from "react-router-dom";
import "./Sidebar.css";

function CustomerSidebar() {

  const navigate = useNavigate();

const handleLogout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("userEmail");

  localStorage.removeItem("role");

  localStorage.removeItem("cart");

  localStorage.removeItem("checkoutItems");

  navigate("/login", {
    replace:true
  });

};

  return (

    <aside className="sidebar">

      <NavLink to="/customer-product">
        Products
      </NavLink>

      <NavLink to="/cart">
        Cart
      </NavLink>
      <NavLink to="/my-orders">
        My Orders
      </NavLink>

      <NavLink to="/customer-ai-assistant">
        AI Assistant
      </NavLink>

      <NavLink to="/customer-profile">
        Profile
      </NavLink>

      <button className="logout-btn"
      onClick={handleLogout}
      >
        Logout
      </button>

    </aside>

  );
}

export default CustomerSidebar;