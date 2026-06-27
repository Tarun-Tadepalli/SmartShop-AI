import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("userEmail");

    localStorage.removeItem("role");

    localStorage.removeItem("cart");

    localStorage.removeItem("checkoutItems");

    navigate("/login", {
      replace: true
    });

  };
  return (
    <aside className="sidebar">

      <NavLink to="/dashboard">
        Dashboard
      </NavLink>

      <NavLink to="/products">
        Products
      </NavLink>

      <NavLink to="/add-product">
        Add Product
      </NavLink>

      <NavLink to="/orders">
        Orders
      </NavLink>

      <NavLink to="/ai-assistant">
        AI Assistant
      </NavLink>

      <NavLink to="/profile">
        Profile
      </NavLink>

      <button
      className="logout-btn"
      onClick={handleLogout}>
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;