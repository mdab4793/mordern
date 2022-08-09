import { useEffect, useState } from "react";
import styles from "../css/Detail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Category from "../component/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { addItem } from "../store";
import { useDispatch } from "react-redux";
import axios from "axios";
import Footer from "../component/Footer";

function Main(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [popup, setPopup] = useState(false);

  const [content, setContent] = useState();

  const onChangeHanlder = (e) => {
    setContent(e.currentTarget.value);
  };

  const Options = [
    { key: 0, value: props.posts[id]?.color[0] },
    { key: 1, value: props.posts[id]?.color[1] },
    { key: 2, value: props.posts[id]?.color[2] },
    { key: 3, value: props.posts[id]?.color[3] },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.contentImg}>
        <img src={props.posts[id]?.url1} alt="detail" />
      </div>
      <main className={styles.wrapper}>
        <div className={styles.mainContent}>
          <main className={styles.main}>
            <h1>{props.posts[id]?.filter}</h1>
            <h2>{props.posts[id]?.title}</h2>
            <h3>{props.posts[id]?.name}</h3>
            <p>${props.posts[id]?.price}</p>
            <select onChange={onChangeHanlder} value={content}>
              {Options.map(
                (
                  a,
                  i //color선택
                ) => (
                  <option key={a.key} value={a.key}>
                    {a.value}
                  </option>
                )
              )}
            </select>
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
                    id: props.posts[id]?.id,
                    img: props.posts[id]?.url1,
                    name: props.posts[id]?.title,
                    price: props.posts[id]?.price,
                    color: props.posts[id]?.color[content],
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
                  id: props.posts[id]?.id,
                  img: props.posts[id]?.url1,
                  name: props.posts[id]?.title,
                  price: props.posts[id]?.price,
                  color: props.posts[id]?.color[content],
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
  );
}

export default Main;
