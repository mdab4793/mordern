import Header from "../component/Header";
import { useEffect, useState } from "react";
import styles from "../css/Detail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Detail from "../component/Detail";
import axios from "axios";
import Footer from "../component/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { connect, useDispatch } from "react-redux";
import { addItem } from "../store";
import Navbar from "../component/Navbar";
import Category from "../component/Category";

function FurnitureDetail(props) {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [word] = useState("Furniture");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [popup, setPopup] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/mdab4793/shop/main/furniture/Funiture.json"
      )
      .then((result) => {
        setPosts(result.data);
      });
  }, []);

  return (
    <body>
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.contentImg}>
            <img
              src={
                "https://github.com/mdab4793/shop/blob/main/furniture/" +
                [id - 24] +
                ".jpg?raw=true"
              }
              alt="detail"
            />
          </div>
          <main className={styles.main}>
            <div className={styles.mainContent}>
              <h1>{word} </h1>
              <Detail
                title={posts[id - 25]?.title}
                price={posts[id - 25]?.price}
              />
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
                        id: posts[id - 25]?.id,
                        name: posts[id - 25]?.title,
                        price: posts[id - 25]?.price,
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
                      id: posts[id - 25]?.id,
                      name: posts[id - 25]?.title,
                      price: posts[id - 25]?.price,
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

export default FurnitureDetail;
