import { useParams } from "react-router-dom";
import styles from "../css/Detail.module.css";
import { addItem } from "../store";
function De(props) {
  const { id } = useParams();
  let data = localStorage.getItem("itemData");
  data = JSON.parse(data);
  return (
    <div className={styles.content}>
      <main className={styles.mainContent}>
        <h3>{props.title}</h3>
        <p>{props.price}</p>
      </main>
    </div>
  );
}
export default De;
