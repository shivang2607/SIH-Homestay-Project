import React from "react";
import styles from "../styles/Home.module.css";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { Container, Dropdown } from "react-bootstrap";
import { useFirebase } from "../context/firebaseContext";
import Image from "next/image";
const NavBar = () => {
  const { signIn, checkUserCookies, getUserCookies, checkHomeInDb, signOut } =
    useFirebase();
  let btn = null;
  let opts = null;
  const history = checkHomeInDb();
  console.log("history: ", history);
  if (history.length > 0) {
    opts = (
      <>
        <Link style={{ textDecoration: "none" }} href="/">
          <a className={styles.link}>Home</a>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/about">
          <a className={styles.link}>About</a>
        </Link>
      </>
    );
  } else {
    opts = (
      <>
        <Link style={{ textDecoration: "none" }} href="/">
          <a className={styles.link}>Home</a>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/homestayForm" passHref>
          <a className={styles.link}>register your home</a>
        </Link>
        {/* <Link href="/about">About</Link> */}
      </>
    );
  }
  if (!checkUserCookies()) {
    btn = <button onClick={signIn}>Log In</button>;
  } else {
    const cookie = getUserCookies();
    btn = (
      <Dropdown>
        <Dropdown.Toggle className={styles.dropdown} variant="light">
          {cookie.details.name}
        </Dropdown.Toggle>
        <Dropdown.Menu variant="light">
          <Dropdown.Item>
            <Link href={`/users/${cookie.details.token.slice(5, 25)}`}>
              Dashboard
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href={"#"}>
              <button onClick={signOut}>Sign Out</button>
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" className={styles.navbar}>
      <Container fluid className="mx-1">
        <Navbar.Brand href="/">
          <Image src={"/static/logo_transparent.png"} alt="" layout="intrinsic" width={60} height={60}/>
        </Navbar.Brand>
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
