import { React, useState } from "react";
import "../../App.css";
import "./Navbar.css";
import logo from "../../assets/booklogo.jpeg";
import { Link, NavLink } from "react-router-dom";
import SignUp from "../SignUp/SignUp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../AuthContext";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLogin, setIsLogin } = useAuth();
  const { isAdmin, setIsAdmin } = useAuth();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLogout = () => {
    setIsLogin(false);
    setIsAdmin(false);
  };

  return (
    <div className="flex justify-between items-center ps-5 pt-2 pb-2 pe-5">
      <img className="w-16" src={logo} alt="" />
      <ul className="flex justify-center flex-1">
        {" "}
        {/* Added flex-1 to expand to fill remaining space */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "activeColor" : "inactiveColor"} `
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              `${isActive ? "activeColor" : "inactiveColor"} `
            }
          >
            Books
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/magazines"
            className={({ isActive }) =>
              `${isActive ? "activeColor" : "inactiveColor"} `
            }
          >
            Magazines
          </NavLink>
        </li>
        {isLogin && !isAdmin && (
          <li>
            <NavLink
              to="/myPublications"
              className={({ isActive }) =>
                `${isActive ? "activeColor" : "inactiveColor"} `
              }
            >
              My Publications
            </NavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <NavLink
              to="/verifyBooks"
              className={({ isActive }) =>
                `${isActive ? "activeColor" : "inactiveColor"} `
              }
            >
              Verify
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive ? "activeColor" : "inactiveColor"} `
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="flex items-center">
        {!isLogin && !isAdmin && (
          <button className="button" onClick={toggleDropdown}>
            Want To Publish
          </button>
        )}
        {!isAdmin && !isLogin && (
            <NavLink to="/admin">
            <button className="button">
              Admin
            </button>
          </NavLink>
        )}
        {(isLogin || isAdmin) && (
          <NavLink to="/">
            <button className="button" onClick={handleLogout}>
              LogOut
            </button>
          </NavLink>
        )}
        {!isLogin && showDropdown && (
          <div className="dropdown-overlay">
            <button onClick={toggleDropdown}>
              <FontAwesomeIcon
                icon={faTimes}
                style={{ border: "solid 2px white" }}
                className="close-button text-4xl text-white bg-amber-700 border-amber-800 rounded-lg"
              />
            </button>
            <SignUp />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
