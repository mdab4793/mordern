import { useState, useEffect } from "react";
import Pagination from "../Pagination";
import styles from "../css/List.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Category from "../component/Category";
import axios from "axios";
import Footer from "../component/Footer";

function Tech(props) {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hart, setHart] = useState(true);
  const [wish, setWish] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/mdab4793/shop/main/Tech/Tech.json"
      )
      .then((result) => {
        setPosts(result.data);
      });
  }, []);

  return (
    <body className={styles.container}>
      <main className={styles.main}>
        {posts
          .slice(offset, offset + limit)
          .map(({ index, i, id, title, price }) => {
            return (
              <section className={styles.section} key={i}>
                <Link to={`/detail/${id}`}>
                  <Category
                    url={posts[id]?.url}
                    title={posts[id]?.title}
                    price={posts[id]?.price}
                  />
                </Link>
                <br />{" "}
                {/* <button
                  onClick={() => {
                    setHart(!hart);
                    setWish(!wish);
                  }}
                >
                  {hart === true ? <>찜하기💙</> : null}
                  {wish === true ? <>찜완료❤️ </> : null}
                </button> */}
              </section>
            );
          })}
      </main>
      )
      <div>
        <Pagination
          total={posts.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </body>
  );
}

export default Tech;
