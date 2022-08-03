import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddAuth from "../AddAuth";
import Login from "../route/Login";

export default function Main() {
  return (
    <div>
      <Routes>
        <h1>메인페이지 임미다</h1>
        <Route>
          <Route path="/" element={<AddAuth />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}
