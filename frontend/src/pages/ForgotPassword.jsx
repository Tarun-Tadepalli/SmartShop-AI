import { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import "../styles/auth.css";

import {forgotPassword, verifyOTP, changePassword } from "../services/authApi";

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailVerified, setEmailVerified] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const [loading, setLoading] = useState(false);

    const [timer, setTimer] = useState(0);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {

        if (otpVerified) {
            setTimer(0);
            setCanResend(false);
            return;
        }
    
        let interval;
    
        if (timer > 0) {
    
            interval = setInterval(() => {
    
                setTimer((prev) => prev - 1);
    
            }, 1000);
    
        } else {
    
            if (emailVerified) {
    
                setCanResend(true);
    
            }
    
        }
    
        return () => {
    
            if (interval) {
                clearInterval(interval);
            }
    
        };
    
    }, [timer, emailVerified, otpVerified]);

    
      const handleVerifyEmail = async () => {
        if (!email.trim()) {
          alert("Please enter your email.");
          return;
        }
      
        try {
          setLoading(true);
      
          const response = await forgotPassword({
            email,
          });
      
          if (response.data.success) {
            alert("Email verified successfully.");
      
            setEmailVerified(true);
            setOtpVerified(true);
      
            setTimer(120);
      
            setCanResend(false);
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          alert(
            error.response?.data?.message ||
            "Unable to verify email."
          );
        } finally {
          setLoading(false);
        }
      };

      const handleVerifyOTP = async () => {
        if (!otp.trim()) {
          alert("Enter OTP.");
          return;
        }
      
        try {
      
          const response = await verifyOTP({
            email,
            otp,
          });
      
          if (response.data.success) {

            alert("OTP Verified Successfully");
        
            setOtpVerified(true);
        
            setTimer(0);
        
            setCanResend(false);
        
        } else {
      
            alert(response.data.message);
      
          }
      
        } catch (error) {
      
          alert(
            error.response?.data?.message ||
            "OTP Verification Failed"
          );
      
        }
      };

      const handleChangePassword = async () => {

        if (!newPassword || !confirmPassword) {

            alert("Please enter both password fields.");
        
            return;
        
        }
        
        if (newPassword !== confirmPassword) {
        
            alert("Passwords do not match");
        
            return;
        
        }
      
        try {
      
          const response = await changePassword({
      
            email,
      
            password: newPassword,
      
          });
      
          if (response.data.success) {
      
            alert("Password Changed Successfully. Please login with your new password.");
            navigate("/login", {
                replace: true,
            });
      
          } else {
      
            alert(response.data.message);
      
          }
      
        } catch (error) {
      
          alert(
            error.response?.data?.message ||
            "Password change failed."
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
            Reset Your Password
            <br />
            Securely.
          </h1>

          <p>
            Verify your registered email using OTP and
            create a new password to access your account.
          </p>

        </div>

      </div>

      <div className="auth-right">

        <div className="auth-form-card forgot-card">

          <h2>Forgot Password</h2>

          <form>

            {/* Email */}

            <input
    type="email"
    placeholder="Enter Registered Email"
    value={email}
    readOnly={emailVerified}
    onChange={(e) => setEmail(e.target.value)}
/>

            <button
            type="button"
            onClick={handleVerifyEmail}
            disabled={loading || emailVerified}
            >
                {loading ? "Sending OTP..." : "Verify Email"}
            </button>


            {/* OTP */}

            <input
            type="text"
            placeholder="Enter 4 Digit OTP"
            maxLength={4}
            value={otp}
            readOnly={otpVerified}
            disabled={!emailVerified}
            onChange={(e)=>setOtp(e.target.value)}
            />

            <div className="otp-row">

              <span className="timer">

              {
              emailVerified
              ? `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`
              : "00:00"
              }

              </span>

              <button
              type="button"
              className="resend-btn"
              disabled={!canResend}
              onClick={handleVerifyEmail}
              >
                Resend OTP
              </button>

            </div>


          <button
           type="button"
           disabled={!emailVerified || otpVerified}
           onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>


            {/* Password */}

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              disabled={!otpVerified}
              onChange={(e)=>setNewPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              disabled={!otpVerified}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            
            <button
            type="button"
            disabled={!otpVerified}
            onClick={handleChangePassword}
            > 
                Change Password
            </button>

          </form>

          <p className="bottom-link">

            Remember Password?

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default ForgotPassword;