import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import '../App.css'

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <nav className="App">
      {userLoggedIn ? (
        <>
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
            className="login-btn">
            Logout
          </button>
        </>
      ) : (
        <>
          <div className="btn-container">
              <Link className="link-btn" to={"/login"}>
                Login
              </Link>
              <Link className="link-btn" to={"/register"}>
                Sign up
              </Link>
            
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
