import React from "react";
import { firestore } from "../firebase/firebase.js";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="album-page">
      <div className="add-album">
        <h2>Your albums</h2>

        <Link to="add-image">
          <button className="add-img-btn">Add album</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
