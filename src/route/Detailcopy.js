import Header from "../component/Header";
import { useEffect, useState } from "react";
import styles from "../css/Detail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Detail from "../component/Detail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { addItem } from "../store";
import { useDispatch } from "react-redux";
import axios from "axios";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import Category from "../component/Category";

function Detailcopy(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [word] = useState("Tech");
  const dispatch = useDispatch();
  let [popup, setPopup] = useState(false);
  let [itemData, setItemDate] = useState(props.posts);

  // useEffect(() => {
  //   let 꺼낸거 = localStorage.getItem("watched");
  //   꺼낸거 = JSON.parse(꺼낸거);
  //   꺼낸거.push(detail.id);
  //   꺼낸거 = new Set(꺼낸거);
  //   꺼낸거 = Array.from(꺼낸거);
  //   localStorage.setItem("watched", JSON.stringify(꺼낸거));
  // });
  console.log(itemData);

  return (
    <body>
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.contentImg}>
            <img src={props.posts[id].url} alt="" />
          </div>
          <main className={styles.main}>
            <div className={styles.mainContent}>
              <h1>{word} </h1>
              <div className={styles.content}>
                <main className={styles.mainContent}>
                  <h3>{props.posts[id].title}</h3>
                  <p>{props.price}</p>
                </main>
              </div>
              <br />
              {props.emailCheck == false ? ( //로그인전일때 누르면 로그인실행
                <button
                  className={styles.cart}
                  onClick={(e) => {
                    e.preventDefault();
                    props.onLogin();
                  }}
                >
                  <FontAwesomeIcon icon={faCartArrowDown} size="2x" />
                </button>
              ) : (
                //로그인후 카트에담겨짐
                <button
                  className={styles.cart}
                  onClick={() => {
                    setPopup(true);
                    dispatch(
                      addItem({
                        id: props.posts[id]?.id,
                        name: props.posts[id]?.title,
                        price: props.posts[id]?.price,
                        count: 1,
                      })
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faCartArrowDown} size="2x" />
                </button>
              )}
              <br />{" "}
              {popup == true ? ( //장바구니 추가popup
                <section className={styles.popup}>
                  <h4>장바구니 추가완료!</h4>
                  <button
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    Go to Cart
                  </button>
                  <button
                    onClick={() => {
                      setPopup(false);
                    }}
                  >
                    Close
                  </button>
                </section>
              ) : null}
              <button
                className={styles.buy}
                onClick={() => {
                  dispatch(
                    addItem({
                      id: props.posts[id]?.id,
                      name: props.posts[id]?.title,
                      price: props.posts[id]?.price,
                      count: 1,
                    })
                  );
                }}
              >
                <FontAwesomeIcon icon={faCreditCard} size="2x" />
              </button>
              <br /> <br />
              <p>
                본 제품은 해외직구상품으로 구매시 1~2주가 소요되며,
                <br /> 단순 변심에의한 반품은 불가합니다.
              </p>
            </div>
          </main>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </body>
  );
}

export default Detailcopy;
