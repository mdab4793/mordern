import { useEffect, useState } from "react";
import styles from "../css/Detail.module.css";
import { useParams, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addItem } from "../store";
import axios from "axios";
import Footer from "../component/Footer";

function AccDetail(props) {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [popup, setPopup] = useState(false);
  useEffect(() => {
    axios
      .get("https://raw.githubusercontent.com/mdab4793/shop/main/Acc/Acc.json")
      .then((result) => {
        setPosts(result.data);
      });
  }, []);

  return (
    <body>
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.contentImg}>
            <img src={posts[id - 34]?.url} alt="detail" />
          </div>{" "}
          <main className={styles.main}>
            <div className={styles.mainContent}>
              <h1>Acc</h1>
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
                        id: posts[id - 34]?.id,
                        name: posts[id - 34]?.title,
                        price: posts[id - 34]?.price,
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
                      id: posts[id - 34]?.id,
                      name: posts[id - 34]?.title,
                      price: posts[id - 34]?.price,
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

export default AccDetail;
