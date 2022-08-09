import Home from "./route/Home";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Buy from "../src/route/Buy";
import FurnitureDetail from "./route/FurnitureDetail";
import AccDetail from "./route/AccDetail";
import { lazy, useState, Suspense } from "react";
import Navbar from "./component/Navbar";
import AuthService from "./auth_service";
import Login from "./route/Login";
import Funiture from "./route/Furniture";
import Accessory from "./route/Accessory";
import { useEffect } from "react";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useSelector } from "react-redux";
import Detail from "./route/Detail";
import { firestore, auth } from "./firebase.js";
import LoginForm from "./route/LoginForm";
import JoinForm from "./route/JoinForm";
import TechDetail from "./route/TechDetail";
import axios from "axios";
const Cart = lazy(() => import("./route/Cart.js"));
const Tech = lazy(() => import("./route/Tech.js"));
function App() {
  const [tech, setTech] = useState([]);
  const [acc, setAcc] = useState([]);
  const [furni, setFurni] = useState([]);
  useEffect(() => {
    let item = localStorage.setItem("watched", JSON.stringify([]));
  });

  useEffect(() => {
    loginCheck();
  }, []);
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
  /* 로그인 기능 */
  const authService = new AuthService();
  const navigate = useNavigate();
  function onLogin() {
    authService.login().then((data) => {
      loginData(data.user);
    });
  }
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/mdab4793/shop/main/Tech/Tech.json"
      )
      .then((result) => {
        setTech(result.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://raw.githubusercontent.com/mdab4793/shop/main/Acc/Acc.json")
      .then((result) => {
        setAcc(result.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/mdab4793/shop/main/furniture/Funiture.json"
      )
      .then((result) => {
        setFurni(result.data);
      });
  }, []);

  /* 로그인 체크 */
  let [emailCheck, setEmailCheck] = useState(false);

  function loginData(user) {
    console.log(user);
    localStorage.setItem("emailCheck", user.emailVerified);
    loginCheck();
  }

  const state = useSelector((state) => state);
  return (
    <body>
      <Navbar
        loginData={loginData}
        emailCheck={emailCheck}
        setEmailCheck={setEmailCheck}
        onLogin={onLogin}
      ></Navbar>{" "}
      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/" element={<Home />} />
          <Route
            path="/detail/:id"
            element={<Detail onLogin={onLogin} emailCheck={emailCheck} />}
          />
          <Route path="/tech" element={<Tech posts={tech} />} />
          <Route
            path="/techdetail/:id"
            element={<TechDetail posts={tech} />}
            onLogin={onLogin}
            emailCheck={emailCheck}
          />
          <Route path="/furniture" element={<Funiture posts={furni} />} />
          <Route
            path="/furnituredetail/:id"
            element={
              <FurnitureDetail
                posts={furni}
                onLogin={onLogin}
                emailCheck={emailCheck}
              />
            }
          />
          <Route path="/accessory" element={<Accessory posts={acc} />} />

          <Route
            path="/accdetail/:id"
            element={<AccDetail posts={acc} />}
            onLogin={onLogin}
            emailCheck={emailCheck}
          />
          <Route path="/buy" element={<Buy />} />
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
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/JoinForm" element={<JoinForm />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </body>
  );
}

export default App;
