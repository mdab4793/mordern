import styles from "../css/Category.module.css";

function Category(props) {
  return (
    <body className={styles.container}>
      <img className={styles.contentImg} src={props.url} alt="" />
      <h3>{props.title}</h3>
      <div>
        <p>${props.price}</p>
      </div>
    </body>
  );
}

export default Category;
