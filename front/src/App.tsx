import { useEffect, useState } from "react";
import Search from "@/search/container/Search";
import User from "@/user/container/User";
import "antd/dist/reset.css";
import { Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    const bodyEl = document.getElementsByTagName("body")[0];
    const loadingEl = document.getElementById("init-loading");
    if (loadingEl) {
      bodyEl.removeChild(loadingEl);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/user/:name" element={<User />} />
    </Routes>
  );
}

export default App;
