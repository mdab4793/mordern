import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Popup.module.css";

function Popup() {
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  return (
    <body>
      <section className={styles.popup}>
        <h4>장바구니 추가완료!</h4>
        <button
          onClick={() => {
            navigate("/cart");
          }}
        >
          Go Cart
        </button>
        <button
          onClick={() => {
            setPopup(false);
          }}
        >
          Close
        </button>
      </section>
    </body>
  );
}
export default Popup;
