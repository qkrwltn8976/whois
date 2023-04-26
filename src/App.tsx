import { useState } from "react";
import Search from "@/search/container/Search";
import User from "@/user/container/User";
import "antd/dist/reset.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/user/:name" element={<User />} />
    </Routes>
  );
}

export default App;
