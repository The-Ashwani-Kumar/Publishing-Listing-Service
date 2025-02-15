import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Navbar/>
    <hr style={{border:"solid 1px #FF7F50"}}></hr>
    <Outlet/>
    <Footer/>
    </AuthProvider>
  );
}

export default App;
