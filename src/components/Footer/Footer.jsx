import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <span className="text-sm text-gray-500 sm:text-center">
        © 2024{" "}
        <a href="https://itsmeashwani.netlify.app" className="hover:underline">
          AshwaniKumar
        </a>
        . All Rights Reserved.
      </span>
    </div>
  );
}

export default Footer;
