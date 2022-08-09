import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Pagination";
import styles from "../css/List.module.css";
import { Link, useNavigate } from "react-router-dom";
import Category from "../component/Category";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../store";
import Footer from "../component/Footer";
import ScrollTop from "../component/ScrollTop";

function Accessory(props) {
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wish, setWish] = useState(["찜하기💙"]);

  // function LowPrice() {
  //   let low = [...props.posts];
  //   low = low.sort((a, b) => a.price - b.price);
  //   setprops.posts(low);
  // }

  // function HighPrice() {
  //   let high = [...props.posts];
  //   high = high.sort((a, b) => b.price - a.price);
  //   setprops.posts(high);
  // }
  return (
    <div className={styles.container}>
      {/* <button //가격낮은순으로 정렬
        onClick={() => {
          LowPrice();
        }}
      >
        LowPrice
      </button>{" "}
      <button
        onClick={() => {
          HighPrice();
        }}
      >
        HighPrice
      </button> */}
      <main className={styles.main}>
        {props.posts
          .slice(offset, offset + limit)
          .map(({ id, title, price }) => (
            <section className={styles.section} key={id}>
              <Category
                id={id}
                filter={props.posts[id - 33]?.filter}
                url1={props.posts[id - 33]?.url1}
                title={props.posts[id - 33]?.title}
                price={props.posts[id - 33]?.price}
              />{" "}
              {/* <button
              onClick={() => {
                let copy = [...wish];
                copy = copy + "찜완료❤️";
                setWish("찜완료❤️");
              }}
            >
              {wish}
            </button> */}
            </section>
          ))}
      </main>{" "}
      <ScrollTop />
      <div>
        <Pagination
          total={props.posts.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>{" "}
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default Accessory;
