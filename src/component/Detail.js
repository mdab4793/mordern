import styles from "../css/Detail.module.css";

function Detail(props) {
  return (
    <main className={styles.main}>
      <div className={styles.text}>
        <h2>{props.title}</h2>
        <p>${props.price}</p>
      </div>
    </main>
  );
}
export default Detail;
