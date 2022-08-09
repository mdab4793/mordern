import styles from "../css/Login.module.css";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../firebase";
import firebase from "firebase/compat/app";

import Navbar from "../component/Navbar";
import { useEffect } from "react";

const LoginForm = () => {
  const [isLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loding, setLoading] = useState();
  const [errorLoginFromSubmit, setErrorFromSubmit] = useState();
  const { register, errors, handleSubmit } = useForm({
    mode: "onChange",
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePwChange = (e) => {
    setPw(e.target.value);
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <body className={styles.bg}>
      <main className={styles.container}>
        <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          {isLogged === false && (
            <>
              <label>Email</label>
              <input
                onChange={handleEmailChange}
                value={email}
                name="email"
                type="email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              />
              {errors.email && errors.email.type === "required" && (
                <p>이메일은 반드시 입력해야합니다.</p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p>이메일이 형식에 맞지 않습니다.</p>
              )}
              <label>Password</label>
              <input
                onChange={handlePwChange}
                value={pw}
                name="password"
                type="password"
                ref={register({ required: true, minLength: 6 })}
              />
              {errors.password && errors.password.type === "required" && (
                <p>비밀번호는 반드시 입력해야합니다.</p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p>비밀번호는 6글자 이상이여야 합니다.</p>
              )}
              {errors.FromSubmit && <p>{errors.FromSubmit}</p>}
              <input
                isLogged={isLogged}
                className={styles.login}
                type="submit"
                value="submit"
              />
            </>
          )}
          {isLogged === true && (
            <>
              <button isLogged={isLogged}>로그아웃</button>
            </>
          )}
          <Link
            to="/joinform"
            style={{ color: "gray", textDecoration: "none" }}
          >
            회원가입하기
          </Link>{" "}
        </form>
      </main>{" "}
    </body>
  );
};

export default LoginForm;
