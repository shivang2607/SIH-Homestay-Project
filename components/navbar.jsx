import React from "react";
import styles from "../styles/Home.module.css";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { Container, Dropdown } from "react-bootstrap";
import { useFirebase } from "../context/firebaseContext";

const NavBar = () => {
  const { signIn, checkUserCookies, getUserCookies, getHomeHistory } =
    useFirebase();
  let btn = null;
  let opts = null;
  const history = getHomeHistory();
  console.log("history: ", history);
  if (history.length > 0) {
    opts = (
      <>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </>
    );
  } else {
    opts = (
      <>
        <Link href="/">Home</Link>
        <Link href="/homestayForm" passHref>
          register your home
        </Link>
        <Link href="/about">About</Link>
      </>
    );
  }
  if (!checkUserCookies()) {
    btn = <button onClick={signIn}>Log In</button>;
  } else {
    const cookie = getUserCookies();
    btn = (
      <Dropdown>
        <Dropdown.Toggle className={styles.dropdown}>
          {cookie.details.name}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">
          <Dropdown.Item>
            <Link href={`/users/${cookie.details.token.slice(5, 25)}`}>
              Dashboard
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" className={styles.navbar}>
      <Container fluid className="mx-1">
        <Navbar.Brand href="/">Hamara Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <nav className={styles.nav}>{opts}</nav>
          {btn}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
