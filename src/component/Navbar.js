import styles from "../css/Navbar.module.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faAddressCard,
  faAlignJustify,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Navbar(props) {
  const [isToggled, setIsToggled] = useState(false);

  /* 로그아웃 기능 */
  function logout() {
    localStorage.removeItem("emailCheck");
    props.setEmailCheck(false);
  }

  return (
    <body>
      <nav className={styles.navbar}>
        <header className={styles.navbarTitle}>
          <Link to={"/"}>
            <div>Mordern</div>
          </Link>
        </header>
        <div
          className={styles.toggle}
          onClick={() => {
            setIsToggled(!isToggled);
          }}
        >
          <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} />
        </div>
        {isToggled === true ? (
          <>
            <ul className={styles.navbarMenu}>
              <Link to={"/tech"}>
                <li>Tech</li>
              </Link>
              <Link to={"/accessory"}>
                <li>Acc</li>
              </Link>
              <Link to={"/furniture"}>
                <li>Funiture</li>
              </Link>
            </ul>
            <ul className={styles.navIcon}>
              <Link to={"/cart"}>
                <li>
                  <FontAwesomeIcon icon={faCartArrowDown} />
                </li>
              </Link>
              {props.emailCheck === false ? (
                <li onClick={props.onLogin}>Login</li>
              ) : (
                <li onClick={logout}>Logout</li>
              )}
            </ul>
          </>
        ) : (
          <></>
        )}
      </nav>
    </body>
  );
}

export default Navbar;
