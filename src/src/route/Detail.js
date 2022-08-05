import { useEffect, useState } from "react";
import styles from "../css/Detail.module.css";
import { useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { addItem } from "../store";
import { useDispatch } from "react-redux";
import axios from "axios";
import Footer from "../component/Footer";

function Detail(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  let [popup, setPopup] = useState(false);
  useEffect(() => {
    axios
      .get("https://raw.githubusercontent.com/mdab4793/shop/main/db.json")
      .then((result) => {
        setPosts(result.data);
      });
  }, []);
  return (
    <body>
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.contentImg}>
            <img src={posts[id]?.url} alt="detail" />
          </div>
          <main className={styles.wrapper}>
            <div className={styles.mainContent}>
              <main className={styles.main}>
                <h1>{posts[id]?.title}</h1>
                <h2>{posts[id]?.name}</h2>
                <p>${posts[id]?.price}</p>
              </main>
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
                        id: posts[id]?.id,
                        img: posts[id]?.url,
                        name: posts[id]?.name,
                        price: posts[id]?.price,
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
                <div>
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
                </div>
              ) : null}
              <button
                className={styles.buy}
                onClick={() => {
                  dispatch(
                    addItem({
                      id: posts[id]?.id,
                      name: posts[id]?.name,
                      price: posts[id]?.price,
                      count: 1,
                    })
                  );
                }}
              >
                <FontAwesomeIcon icon={faCreditCard} size="2x" />
              </button>
              <br /> <br />
              <p className={styles.text}>
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

export default Detail;
