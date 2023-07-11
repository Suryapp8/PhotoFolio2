import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/firebase.js";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
} from "@firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

export default function AddPhoto() {
  const navigate = useNavigate();
  const { albumId } = useParams();
  const [showDiv, setShowDiv] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Add Image");
  const [albumTitle, setAlbumTitle] = useState("");
  const [imageData, setImageData] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    const fetchAlbumTitle = async () => {
      try {
        const albumRef = doc(firestore, "albums", albumId);
        const albumSnapshot = await getDoc(albumRef);
        if (albumSnapshot.exists()) {
          const albumData = albumSnapshot.data();
          setAlbumTitle(albumData.album);
        } else {
          console.log("Album not found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlbumTitle();
  }, [albumId]);

  useEffect(() => {
    const imagesQuery = query(
      collection(firestore, "albums", albumId, "images")
    );

    const unsubscribe = onSnapshot(imagesQuery, (snapshot) => {
      const imageDataList = [];
      snapshot.forEach((doc) => {
        imageDataList.push({ id: doc.id, ...doc.data() });
      });
      setImageData(imageDataList);
    });

    return () => unsubscribe();
  }, [albumId]);

  const handleButtonClick = () => {
    setShowDiv(!showDiv);
    setButtonLabel(showDiv ? "Add Image" : "Clear");
  };

  const handleTitleChange = (e) => {
    setTitleInput(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrlInput(e.target.value);
  };

  const handleCreate = async () => {
    try {
      const newImage = {
        title: titleInput,
        url: urlInput,
      };

      const imagesRef = collection(firestore, "albums", albumId, "images");
      await addDoc(imagesRef, newImage);

      setTitleInput("");
      setUrlInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      const imageRef = doc(firestore, "albums", albumId, "images", imageId);
      await deleteDoc(imageRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="header">
        <div className="">
          <button onClick={() => navigate(-1)} className="back">
            Back
          </button>
        </div>
        <div className="images-in">
          Images in <span>{albumTitle}</span>
        </div>
        <div>
          <button onClick={handleButtonClick} className="add-image">
            {buttonLabel}
          </button>
        </div>
      </div>
      {showDiv && (
        <div className="hidden-div">
          <div className="heading">
            <h2>Create an album</h2>
          </div>

          <div className="input column-view">
            <input
              type="text"
              placeholder="Title"
              value={titleInput}
              onChange={handleTitleChange}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={urlInput}
              onChange={handleUrlChange}
              required
            />
            <button className="create" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      )}

      <div className="all-the-images">
        {imageData.map((image) => (
          <div className="mapped-div" key={image.id}>
            <img src={image.url} alt={image.title} />
            <div className="delete-title">
              <h3>{image.title}</h3>
              <button onClick={() => handleDelete(image.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
