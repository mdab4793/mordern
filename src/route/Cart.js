import { useDispatch, useSelector } from "react-redux";
import styles from "../css/Cart.module.css";
import { addCount, addMin, removeItem } from "../store";
import Footer from "../component/Footer";
import { faCreditCard, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

function Cart(props) {
  //store 의 state갖다쓸때
  const state = useSelector((state) => state);
  //store.js에서 요청을 보내주는함수
  const dispatch = useDispatch();
  const { id } = useParams();
  //총 장바구니 합계
  let total = state.cart.reduce(function (
    accumulator,
    currentValue,
    currentIndex,
    array
  ) {
    return (
      accumulator +
      state.cart[currentIndex].price * state.cart[currentIndex].count
    );
  },
  0);

  return (
    <body className={styles.bg}>
      <div className={styles.container}>
        <table className={styles.main}>
          <thead className={styles.thead}>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Count</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {state.cart.map((a, i) => {
              //store.js에서의 cart
              return (
                <tr key={i}>
                  <th>
                    <img src={state.cart[i].img} alt="" />
                  </th>
                  <th>{state.cart[i].name}</th>
                  <th>${state.cart[i].price * state.cart[i].count}</th>
                  <th>{state.cart[i].color}</th>
                  <th>{state.cart[i].count}</th>
                  <th className={styles.count}>
                    <button
                      onClick={() => {
                        dispatch(addCount(state.cart[i].id));
                      }}
                    >
                      +
                    </button>

                    <button
                      onClick={() => {
                        dispatch(addMin(state.cart[i].id));
                        if (state.cart[i].count === 1) {
                        }
                      }}
                    >
                      -
                    </button>
                  </th>
                  <th>
                    <button
                      className={styles.delete}
                      onClick={() => {
                        dispatch(removeItem(state.cart[i].id));
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>{" "}
                  </th>{" "}
                </tr>
              );
            })}
          </tbody>{" "}
        </table>{" "}
      </div>
      <div className={styles.totalWrapper}>
        <div className={styles.total}>
          Total:
          <br />${total}
        </div>
        <button className={styles.btn} onClick={() => {}}>
          <FontAwesomeIcon icon={faCreditCard} size="2x" />
        </button>
      </div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </body>
  );
}

export default Cart;
