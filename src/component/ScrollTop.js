import styles from "../css/ScrollTop.module.css";

function ScrollTop() {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }; //맨위로가기
  return (
    <body className={styles.container}>
      <button onClick={handleTop} className={styles.button}>
        ⬆️
      </button>{" "}
    </body>
  );
}
export default ScrollTop;
