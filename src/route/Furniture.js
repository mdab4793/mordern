import { useState, useEffect } from "react";
import Pagination from "../Pagination";
import styles from "../css/List.module.css";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Category from "../component/Category";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { addItem } from "../store";
import Footer from "../component/Footer";
import ScrollTop from "../component/ScrollTop";
function Funiture(props) {
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wish, setWish] = useState(["찜하기💙"]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {props.posts
          .slice(offset, offset + limit)
          .map(({ id, title, price }) => (
            <section className={styles.section} key={id}>
              <Category
                id={id}
                filter={props.posts[id - 24]?.filter}
                url1={props.posts[id - 24]?.url1}
                title={props.posts[id - 24]?.title}
                price={props.posts[id - 24]?.price}
              />

              {/* <button
              onClick={() => {
                let copy = [...wish];
                copy = copy + "찜완료❤️";
                setWish("찜완료❤️");
              }}
            >
              {wish}
            </button> */}
              <br />
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
      </div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default Funiture;
