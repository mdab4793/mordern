import styles from "../css/Home.module.css";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <body className={styles.container}>
      <img
        className={styles.img}
        src="https://github.com/mdab4793/shop/blob/main/background/17.jpeg?raw=true"
      />
      <div className={styles.content}>
        <h1>Are you Tech-nerd?</h1>
        <p>Find Item in here and Buy the Item </p>
      </div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </body>
  );
};

export default Home;
