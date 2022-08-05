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
import Rdetail from "./route/Detail";
import { firestore, auth } from "./firebase.js";

const Cart = lazy(() => import("./route/Cart.js"));
const Tech = lazy(() => import("./route/Tech.js"));
function App() {
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
            element={<Rdetail onLogin={onLogin} emailCheck={emailCheck} />}
          />
          <Route path="/tech" element={<Tech />} />
          <Route path="/furniture" element={<Funiture />} />
          <Route path="/accessory" element={<Accessory />} />
          <Route
            path="/furnituredetail/:id"
            element={
              <FurnitureDetail onLogin={onLogin} emailCheck={emailCheck} />
            }
          />

          <Route
            path="/accdetail/:id"
            element={<AccDetail />}
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
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </body>
  );
}

export default App;
