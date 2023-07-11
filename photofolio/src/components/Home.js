import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/firebase.js";
import { collection, onSnapshot, deleteDoc, doc } from "@firebase/firestore";
import { Link } from "react-router-dom";
import albumFrame from "./album.png";

function Home() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const ref = collection(firestore, "albums");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const albumList = [];
      snapshot.forEach((doc) => {
        albumList.push({ id: doc.id, ...doc.data() });
      });
      setAlbums(albumList);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (albumId) => {
    try {
      await deleteDoc(doc(firestore, "albums", albumId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="album-page">
      <div className="add-album">
        <h2>Your albums</h2>

        <Link to="/add-image">
          <button className="add-img-btn">Add album</button>
        </Link>
      </div>

      <div className="album-list">
        {albums.map((album) => (
          <div className="list-style" key={album.id}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/add-photo/${album.id}`}
            >
              <div className="img-div">
                <img src={albumFrame} alt="Album" />
              </div>

              <div className="title-div">
                <h1 className="">{album.album}</h1>
              </div>
            </Link>
            <button
              className="delete-album"
              onClick={() => handleDelete(album.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
