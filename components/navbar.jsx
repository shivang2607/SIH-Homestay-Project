import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useFirebase } from "../context/firebaseContext";
import { db } from "../firebase/initFirebase";
import styles from "../styles/Home.module.css";

const NavBar = () => {
  const router = useRouter();
  const { signIn, checkUserCookies, getUserCookies, signOut, checkHomeInDb } =
    useFirebase();
  let btn = null;
  let opts = null;
  // console.log(data);
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    const { details } = getUserCookies();
    if (details) {
      getDoc(doc(db, "historyHomestay", details.email)).then((data) => {
        console.log(data.data());
        data.data() && setIsRegistered(true);
      });
    }
  }, [getUserCookies]);
  if(isRegistered){
    opts = (
      <>
        <Link style={{ textDecoration: "none" }} href="/">
          <a className={styles.link}>Home</a>
        </Link>
        {/* <Link style={{ textDecoration: "none" }} href="/about">
          <a className={styles.link}>About</a>
        </Link> */}
      </>
    );
  } else{
    opts = (
      <>
        <Link href="/">
          <a
            style={
              router.pathname === "/"
                ? { fontWeight: "bold", color: "orange" }
                : { textDecoration: "none" }
            }
            className={styles.link}
          >
            Home
          </a>
        </Link>
        <Link href="/homestayForm" passHref>
          <a
            style={
              router.pathname === "/homestayForm"
                ? { fontWeight: "bold", color: "orange" }
                : { textDecoration: "none" }
            }
            className={styles.link}
          >
            Register Your Home
          </a>
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
          <Image
            src={"/static/logo_transparent.png"}
            alt=""
            layout="intrinsic"
            width={60}
            height={60}
          />
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
