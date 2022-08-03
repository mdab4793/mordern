import styles from "../css/Header.module.css";
import { Link as Link1 } from "react-router-dom";
import { Link as Link2 } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faAddressCard,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <body>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Link1 to="/">
            <h1 className={styles.mainTitle}>mordern</h1>
          </Link1>
          <ul className={styles.navMenu}>
            <li
              onClick={() => {
                setMenu(!menu);
              }}
            >
              <FontAwesomeIcon icon={faAlignJustify} size="2x" />
            </li>
          </ul>
        </div>
        {menu == true ? <Menu /> : null}
      </div>{" "}
    </body>
  );
};

function Menu(props) {
  return (
    <body>
      <ul className={styles.subContainer}>
        <Link1 to="/Cart">
          <li>
            <FontAwesomeIcon icon={faCartArrowDown} size="2x" />
          </li>
        </Link1>
        <Link1 to="/Login">
          <li>
            <FontAwesomeIcon icon={faAddressCard} size="2x" />
          </li>
        </Link1>

        <Link2 to="/Item" spy={true} smooth={true}>
          <li style={{ fontSize: "30px" }}>Item</li>
        </Link2>
      </ul>
    </body>
  );
}

export default Header;
