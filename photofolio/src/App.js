import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddAlbum from "./components/AddAlbum";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="add-image" element={<AddAlbum />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
