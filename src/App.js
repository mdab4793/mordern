import Home from "./route/Home";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Cart from "./route/Cart";
import Join from "./route/Join";
import TechDetail from "./route/TechDetail";
import Buy from "../src/route/Buy";
import FurnitureDetail from "./route/FurnitureDetail";
import AccDetail from "./route/AccDetail";
import Error from "./route/Error";
import Logout from "./route/Logout";
import Detailcopy from "./route/Detailcopy";
import { useState } from "react";

import Navbar from "./component/Navbar";
import AuthService from "./auth_service";
import Tech from "./route/Tech";
import Login from "./route/Login";
import Funiture from "./route/Furniture";
import Accessory from "./route/Accessory";

import { useEffect } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import De from "./route/De";

import { useSelector } from "react-redux";
function App() {
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  useEffect(() => {
    loginCheck();
  }, []);
  /* 로그인 기능 */
  const authService = new AuthService();
  const navigate = useNavigate();
  function onLogin() {
    authService.login().then((data) => {
      loginData(data.user);
    });
  }

  /* 로그인 체크 */
  let [emailCheck, setEmailCheck] = useState(false);

  function loginData(user) {
    console.log(user);
    localStorage.setItem("emailCheck", user.emailVerified);
    loginCheck();
  }

  /* 로컬스토리지 체크 */
  function loginCheck() {
    let getLocalEmail = localStorage.getItem("emailCheck");

    //로컬 스토리지에 emailCheck 있다면 setEmailCheck을 true / 없다면 false
    if (getLocalEmail) {
      setEmailCheck(true);
    } else {
      setEmailCheck(false);
    }
  }
  const state = useSelector((state) => state);
  return (
    <div>
      <Navbar
        loginData={loginData}
        emailCheck={emailCheck}
        setEmailCheck={setEmailCheck}
        onLogin={onLogin}
      ></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/furniture" element={<Funiture />} />
        <Route path="/accessory" element={<Accessory />} />
        <Route path="/detail/:id" element={<Detailcopy />} />
        <Route
          path="/furnituredetail/:id"
          element={
            <FurnitureDetail onLogin={onLogin} emailCheck={emailCheck} />
          }
        />
        <Route
          path="/techdetail/:id"
          element={<TechDetail onLogin={onLogin} emailCheck={emailCheck} />}
        ></Route>
        <Route
          path="/accdetail/:id"
          element={<AccDetail />}
          onLogin={onLogin}
          emailCheck={emailCheck}
        />
        <Route path="/buy" element={<Buy />} />
        <Route path="/de/:id" element={<De />} />
        <Route
          path="/cart"
          element={
            emailCheck == true ? (
              <Cart onLogin={onLogin}></Cart>
            ) : (
              <Login onLogin={onLogin}></Login>
            )
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
