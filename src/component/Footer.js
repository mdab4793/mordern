import styles from "../css/Footer.module.css";

function Footer() {
  return (
    <body className={styles.wrapper}>
      <footer className={styles.footer}>
        <img
          className={styles.img}
          src={
            "https://github.com/mdab4793/shop/blob/main/instagram%20(1).png?raw=true"
          }
        ></img>
        <div>email:mdab4793@naver.com</div>
        <div>contect:010-7769-1868</div>
      </footer>
    </body>
  );
}
export default Footer;
