import React, { useState } from "react";
import logo from "../../assets/booklogo.jpeg";
import { useAuth } from "../../AuthContext";
import "./Admin.css";
import Verify from "../Verify/Verify";

function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State variable to track error message
  const { isAdmin, setIsAdmin } = useAuth();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAdmin = (event) => {
    event.preventDefault();
    // Check if username and password are correct
    console.log(username, password);
    if (username === "admin1234@gmail.com" && password === "publish1234") {
      setIsAdmin(true); // Set login status to true
    } else {
      // Handle incorrect login credentials
      setError("Incorrect username or password"); // Set error message
    }
  };

  return (
    <>
      {isAdmin ? (
        <Verify/>
      ) : (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleAdmin} method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="place-items-start flex text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    className="myInput block w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold myColor hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="myInput block w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}{" "}
              {/* Render error message if error exists */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bgColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
