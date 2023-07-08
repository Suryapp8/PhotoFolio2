import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <Link className="navbar" to="/">
        <img
          className="logo-img"
          src="https://cdn.pixabay.com/photo/2023/01/19/18/12/photoframe-7729917_1280.png"
          alt="logo"
        />

        <h1 className="logo">PhotoFolio</h1>
      </Link>
    </div>
  );
}
