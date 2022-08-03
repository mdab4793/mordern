import styles from "../css/Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { connect, useDispatch } from "react-redux";
import { addItem } from "../store";
import { useNavigate, useParams } from "react-router-dom";
function Button(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <body>
      <button
        className={styles.cart}
        onClick={() => {
          navigate(`/techdetail/${id}`);
        }}
      >
        See more
      </button>
    </body>
  );
}
export default Button;
