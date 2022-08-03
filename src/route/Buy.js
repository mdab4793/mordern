import { useDispatch, useSelector } from "react-redux";
import styles from "../css/Cart.module.css";
import { addCount, addMin, removeItem } from "../store";

import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
function Buy() {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  return (
    <body>
      <body className={styles.bg}>
        <Navbar />
        <table className={styles.wrapper}>
          <tbody>
            {state.cart.map((a, i) => {
              //store.js에서의 cart
              return (
                <tr key={i}>
                  <th>{state.cart[i].id}</th>
                  <th>{state.cart[i].name}</th>
                  <th>{state.cart[i].price}</th>
                  <th>{state.cart[i].count}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </body>
      <footer>
        <Footer />
      </footer>
    </body>
  );
}

export default Buy;
