import { Link } from "react-router-dom";
import "./../styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authApi";

function Register() {
  const navigate = useNavigate();

  const [email,setEmail] = useState("");

  const [firstName,setFirstName] = useState("");
 
  const [lastName,setLastName] = useState("");

  const [password,setPassword] = useState("");

  const [confirmPassword,setConfirmPassword] = useState("");
  
  const [error,setError] = useState("");

  const handleSubmit = async (event) => {

    event.preventDefault();
  
    if(password !== confirmPassword){
  
      setError(
        "Passwords do not match"
      );
  
      return;
    }
  
    try{
  
      await registerUser({
        first_name:firstName,
        last_name:lastName,
        email,
        password
      });
  
      navigate("/login");
    }
  
    catch{
  
      setError(
        "Registration Failed"
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
            inventory management and real-time analytics
            for modern e-commerce businesses.
          </p>

        </div>

      </div>

      <div className="auth-right">

        <div className="auth-form-card register-form">

          <h2>Create your account</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
            />

            <div className="row-two">

              <input
                type="text"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                placeholder="First Name"
              />

              <input
                type="text"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                placeholder="Last Name"
              />

            </div>

            <div className="row-two">

              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />

            </div>

            <div className="terms">
              <input type="checkbox" />
              <span>
                I accept Terms of Service and Privacy Policy
              </span>
            </div>
            
            {error &&
            <p style={{color:"red"}}>
              {error}
              </p>
            }

            <button type="submit">
              Create Account
            </button>

          </form>

          <p className="bottom-link">
            Already have an account?
            <Link to="/login"> Sign In</Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;