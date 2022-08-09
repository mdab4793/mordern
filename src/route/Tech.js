import { useState, useEffect } from "react";
import Pagination from "../Pagination";
import styles from "../css/List.module.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Category from "../component/Category";
import axios from "axios";
import Footer from "../component/Footer";
import ScrollTop from "../component/ScrollTop";
import TechDetail from "../route/TechDetail";
function Tech(props) {
  const { id } = useParams();
  // const [props.posts, setprops.posts] = useState([]); //데이터 받아오는 함수
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [hart, setHart] = useState([]);
  let [wish, setWish] = useState([]);

  // let LowPrice = () => {
  //   let low = props.posts.sort((a, b) => a.price - b.price);
  //   setprops.posts([...low]);
  //   console.log(props.posts.sort());
  // };
  // let HighPrice = () => {
  //   let high = props.posts.sort((a, b) => b.price - a.price);
  //   setprops.posts([...high]);
  //   console.log(props.posts.sort());
  // };

  // hart.push("💙");
  // wish.push("❤️");
  // console.log(hart);

  // function LowPrice() {
  //   let low = [...props.posts];
  //   low = low.sort((a, b) => a.price - b.price);
  //   setprops.posts(low);
  // }
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://raw.githubusercontent.com/mdab4793/shop/main/Tech/Tech.json"
  //     )
  //     .then((result) => {
  //       setprops.posts(result.data);
  //     });
  // }, []);
  // function LowPrice() {
  //   //가격낮은순 함수
  //   let low = [...props.posts];
  //   low = low.sort((a, b) => a.price - b.price);
  //   setPosts(low);
  //   console.log(props.posts.sort());
  // }

  // function HighPrice() {
  //   //가격높은순 함수
  //   let high = [...props.posts];
  //   high = high.sort((a, b) => b.price - a.price);
  //   setPosts(high);
  //   console.log(props.posts.sort());
  // }

  return (
    <body className={styles.container}>
      {/* <button //가격낮은순으로 정렬
        onClick={() => {
          LowPrice();
        }}
      >
        LowPrice
      </button>{" "}
      <button //가격높은순으로 정렬
        onClick={() => {
          HighPrice();
        }}
      >
        HighPrice
      </button> */}
      <main className={styles.main}>
        {props.posts.slice(offset, offset + limit).map(({ id }) => {
          return (
            <section className={styles.section} key={id}>
              {/* <div className={styles.wrapper}>
                <Link to={`/techdetail/${id}`}>
                  <img src={props.posts[id]?.url} alt="" />
                </Link>
                <h3>{props.posts[id]?.title}</h3>
                <div>
                  <p>${props.posts[id]?.price}</p>
                </div>
              </div> */}

              <Category
                id={id}
                filter={props.posts[id]?.filter}
                url1={props.posts[id]?.url1}
                title={props.posts[id]?.title}
                price={props.posts[id]?.price}
              />

              {/* <button
                찜하기
                onClick={() => {
                  let copy = [...hart];
                  copy[id] = wish[id];
                  setHart(copy);
                  let copy1 = [...wish];
                  copy1[id] = hart[id];
                  setWish(copy1);
                }}
              >
                {hart[id]}
              </button> */}
            </section>
          );
        })}
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
    </body>
  );
}

export default Tech;
