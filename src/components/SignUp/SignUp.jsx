import React, { useState, useEffect } from "react";
import "./SignUp.css"; // Import CSS for styling
import { NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import axios from "axios";

function Alert({ message, onClose }) {
  useEffect(() => {
    console.log("alert");
    const timeout = setTimeout(onClose, 3000); // Auto close after 3 seconds
    return () => clearTimeout(timeout);
  }, [onClose]);

  return <div className="alert">{message}</div>;
}

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showMessage, setShowMessage] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const {isLogin, setIsLogin} = useAuth();
  const {showDropdown, setShowDropdown} = useAuth();
  const {userID, setUserID} = useAuth();
  // const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit data or navigate to next step
      console.log("Form data:", formData);

      // Signup Page
      try {
        await axios({
          method: "post",
          url: "http://localhost:3000/",
          data: {
            username: formData.username,
            email: formData.email,
            confirmPpassword: formData.confirmPassword,
            password: formData.password,
            isLogin: false,
          },
        })
          .then((response) => {
            if (response.data == "exist") {
              setShowMessage("Email already Exists");
            }
            else if(response.data == "notexist"){
              setUserID(formData.email);
              setShowMessage("Successfully created an Account");
              setIsLogin(true);
            }
          })
          .catch((e) => {
            alert("Wrong details");
            console.log(e);
          });
        //  axios.post("http://localhost:3000/",  {email:formData.email, password:formData.password} );
      } catch (error) {
        console.error("Error adding journal entry:", error);
      }
    } else {
      // Set errors state
      setErrors(errors);
    }
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit data or navigate to next step
      console.log("Form data:", formData);
      // Login Page
      try {
        await axios({
          method: "post",
          url: "http://localhost:3000/",
          data: {
            username: formData.username,
            email: formData.email,
            confirmPpassword: formData.confirmPassword,
            password: formData.password,
            isLogin: true,
          },
        })
          .then((response) => {
            console.log(response)
            if (response.data == "successfullLogin") {
              setIsLogin(true);
              setShowDropdown(false);
              setUserID(formData.email);
              // console.log(process.env.REACT_APP_USER_ID);
              // alert("User already exists");
              // setUsernameExists(true);
            }
            else if(response.data == "wrongEmail"){
              setShowMessage("Wrong Email");
            }
            else if(response.data == "wrongPassword"){
              setShowMessage("Wrong Password");
            }
            else if(response.data == "notPresent"){
              setShowMessage("Username does't Exists")
            }
          })
          .catch((e) => {
            alert("Wrong details");
            console.log(e);
          });
        //  axios.post("http://localhost:3000/",  {email:formData.email, password:formData.password} );
      } catch (error) {
        console.error("Error adding journal entry:", error);
      }
    } else {
      // Set errors state
      setErrors(errors);
    }
  };

  const loginClicked = () => {
    setIsLoginForm(true);
    const loginElement = document.getElementById("login");
    const signupElement = document.getElementById("signup");
    loginElement.style.backgroundColor = "#FF7F50";
    loginElement.style.color = "white";
    signupElement.style.backgroundColor = "white";
    signupElement.style.color = "#FF7F50";
  };
  const signupClicked = () => {
    setIsLoginForm(false);
    const loginElement = document.getElementById("login");
    const signupElement = document.getElementById("signup");
    signupElement.style.backgroundColor = "#FF7F50";
    signupElement.style.color = "white";
    loginElement.style.backgroundColor = "white";
    loginElement.style.color = "#FF7F50";
  };


  return (
    <div className="signup-form-container">
      {/* <h1>{isLogin?"Ashwani":"Kumar"}</h1> */}
      <div className="button-box flex">
        <button
          className="flex btn login-btn"
          id="login"
          onClick={() => loginClicked()}
        >
          Log In
        </button>
        <button
          className="flex btn"
          id="signup"
          onClick={() => signupClicked()}
        >
          Sign Up
        </button>
      </div>
      {!isLoginForm ? (
        <form
          action="POST"
          onSubmit={handleSignupSubmit}
          className="signup-form"
        >
          <div className="form-group">
            <input
              className="p-2"
              placeholder="Name"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>
          <div className="form-group">
            <input
              className="p-2"
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <input
              className="p-2"
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div className="form-group">
            <input
              className="p-2"
              placeholder="Confirm Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
          {showMessage && (
            <Alert
              message={<div className="text-red-600">{showMessage}...!!!</div>}
              onClose={() => setShowMessage("")}
            />
          )}
          <button className="buttonAction" type="submit">
            Sign Up
          </button>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit} className="signup-form">
          <div className="form-group">
            <input
              className="p-2"
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <input
              className="p-2"
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <NavLink
            to={"https://www.google.com"}
            className="forgotPassword m-0 mx-5 text-sm"
          >
            Forgot Password ?
          </NavLink>
          {showMessage!="" && (
            <Alert
              message={<div className="text-red-600">{showMessage}...!!!</div>}
              onClose={() => setShowMessage("")}
            />
          )}
          <button type="submit" className="buttonAction">
            Log In
          </button>
        </form>
      )}
    </div>
  );
}

export default SignUp;
