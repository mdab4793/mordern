import styles from "../css/Join.module.css";
import Header from "../layout/Header";
import { firebaseAuth, createUserWithEmailAndPassword } from "../firebase.js";
import "firebase/firestore";
import { useState } from "react";
function Join() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // `회원가입` 버튼의 onClick에 할당
  const register = async () => {
    try {
      setErrorMsg("");
      const createdUser = await createUserWithEmailAndPassword(
        firebaseAuth,
        registerEmail,
        registerPassword
      );
      //console.log(createdUser);
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (err) {
      //console.log(err.code);
      switch (err.code) {
        case "auth/weak-password":
          setErrorMsg("비밀번호는 6자리 이상이어야 합니다");
          break;
        case "auth/invalid-email":
          setErrorMsg("잘못된 이메일 주소입니다");
          break;
        case "auth/email-already-in-use":
          setErrorMsg("이미 가입되어 있는 계정입니다");
          break;
      }
    }
  };
  return (
    <body className={styles.bg}>
      <Header />
      <div className={styles.container}>
        <h1>Join</h1>
        <main className={styles.content}>
          <label />
          이메일
          <input type="text" placeholder="email"></input>
          <label />
          비밀번호
          <input type="password" placeholder="password"></input>
          <label />
          비밀번호 확인
          <input type="password" placeholder="password"></input>
          <div className={styles.button}>
            <button className={styles.login}>뒤로가기</button>
            <button className={styles.regi}>가입</button>
          </div>
        </main>
      </div>
    </body>
  );
}
export default Join;
