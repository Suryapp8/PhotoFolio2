import React, { useState } from "react";
import { firestore } from "../firebase/firebase.js";
import { addDoc, collection } from "@firebase/firestore";

function AddAlbum() {
  const [album, setAlbum] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    const ref = collection(firestore , "albums");
    let data = {
      album,
      createdAt : new Date()
    }
    try {
      addDoc(ref, data);
      alert("Album added successfully");
    } catch (err) {
      console.log(err);
    }
  }
   
   const handleAlbum = (e) =>{
    setAlbum(e.target.value)
   }

  return (
    <div className="create-album">
      <div className="heading">
        <h2>Create an album</h2>
      </div>

      <div className="input">
        <input type="text" placeholder="Album Name" name="album" onChange={handleAlbum} required />
        <button className="clear">Clear</button>
        <button onClick={handleSubmit} className="create">Create</button>
      </div>
    </div>
  );
}

export default AddAlbum;
