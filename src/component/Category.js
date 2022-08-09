import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "../css/List.module.css";

function Category(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <body className={styles.wrapper}>
      <img src={props.url1} alt="" />
      <div
        onClick={() => {
          navigate(`/${props.filter}detail/${props.id}`);
        }}
      >
        <h3>{props.title}</h3>
        <div>
          <p>${props.price}</p>
        </div>
      </div>
    </body>
  );
}

export default Category;
