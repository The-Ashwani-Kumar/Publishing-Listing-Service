// AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [singleBookData, setSingleBookData] = useState({});
  const [userID, setUserID] = useState("None");
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        showDropdown,
        setShowDropdown,
        singleBookData,
        setSingleBookData,
        userID,
        setUserID,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
