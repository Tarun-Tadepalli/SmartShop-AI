import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi";
import "../styles/auth.css";



function Login() {

  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem("token");
  
    localStorage.removeItem("userEmail");
  
    localStorage.removeItem("role");
  
  }, []);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  

  const handleSubmit = async (e) => {

    e.preventDefault();
  
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!email.trim()) {
  
      setError("Email is required");
  
      return;
    }
  
    if (!emailPattern.test(email)) {
  
      setError("Enter a valid email address");
  
      return;
    }
  
    if (!password.trim()) {
  
      setError("Password is required");
  
      return;
    }
  
    try {

      const response = await loginUser({
        email,
        password
      });
    
      if (!response.data.success) {
    
        setError(
          response.data.message
        );
    
        return;
      }
    
      localStorage.setItem(
        "token",
        response.data.token
      );
      
      localStorage.setItem(
        "userEmail",
        email
      );
      localStorage.setItem(
        "role",
        response.data.role
        );
    
        if (
          response.data.role ===
          "admin"
          ) {
          
            navigate("/dashboard", {
              replace:true
            });
          
          }
          
          else {
          
            navigate("/customer-product", {
              replace:true
            });
          
          }
    
    }
    
    catch {
    
      setError(
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-left">

        <div className="brand-logo">
          SmartShop AI
        </div>

        <div className="left-content">

          <h1>
            Smarter Shopping,
            <br />
            Better Business.
          </h1>

          <p>
            AI-powered insights, smart recommendations,
            inventory management and analytics.
          </p>

        </div>

      </div>

      <div className="auth-right">

        <div className="auth-form-card">

          <h2>Login</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>{
                setEmail(e.target.value);
                setError("");
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>{
                setPassword(e.target.value);
                setError("");
              }}
            />

            {error && 
            <p className="error-message">
            {error}
          </p>}
          <p className="forgot-password">
            
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </p>

            <button type="submit">
              Login
            </button>

          </form>

          <p className="bottom-link">
            Don't have an account?
            <Link to="/register">
              Register
            </Link>
          </p>

          

        </div>

      </div>

    </div>
  );
}

export default Login;