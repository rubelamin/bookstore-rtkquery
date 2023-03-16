import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <Router>
      <NavBar searchText={searchText} searchFunc={setSearchText} />
      <Routes>
        <Route path="/" element={<Home search={searchText} />} />
        <Route path="/AddBook" element={<AddBook />} />
        <Route path="/EditBook/:bookId" element={<EditBook />} />
      </Routes>
    </Router>
  );
}

export default App;
