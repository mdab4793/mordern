import React, { useEffect, useRef, useState } from "react";
import { authService } from "../firebase";
import styles from "../css/Join.module.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Navbar from "../component/Navbar";

const JoinForm = () => {
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const { watch, register, errors, handleSubmit } = useForm({
    mode: "onChange",
  });
  console.log(watch("email"));
  const password = useRef();
  password.current = watch("password");
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let createUser = await authService.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
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
      <Navbar />
      <main className={styles.container}>
        <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
          <h1>Join</h1>
          <label>Email</label>
          <input
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
          <label>Name</label>
          <input
            name="name"
            type="name"
            ref={register({ required: true, maxLength: 10 })}
          />
          {errors.name && errors.name.type === "required" && (
            <p>이름은 반드시 입력해야합니다.</p>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <p>이름은 10글자를 넘길 수 없습니다.</p>
          )}
          <label>Password</label>
          <input
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
          <label>PasswordConfirm</label>
          <input
            name="password_confirm"
            type="password"
            ref={register({
              required: true,
              validate: (value) => value === password.current,
            })}
          />
          {errors.password_confirm &&
            errors.password_confirm.type === "required" && (
              <p>비밀번호 확인을 입력하세요.</p>
            )}
          {errors.password_confirm &&
            errors.password_confirm.type === "validate" && (
              <p>비밀번호 확인이 일치하지 않습니다.</p>
            )}
          <input type="submit" value="submit" />
          <Link to="/login" style={{ color: "gray", textDecoration: "none" }}>
            로그인하러 가기
          </Link>
        </form>
      </main>
    </body>
  );
};

export default JoinForm;
