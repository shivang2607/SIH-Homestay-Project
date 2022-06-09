import React from "react";
import styles from "../styles/Home.module.css";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { Container, Nav } from "react-bootstrap";
import { useFirebase } from "../context/firebaseContext";

const NavBar = () => {
  const { useAuth, signIn, getCookies, checkCookies} = useFirebase();
  const { pending, isSignedIn, user, auth } = useAuth();
  if(checkCookies()) {
    const { details } = getCookies()
    console.log("email", details.email);
  }
  let btn = null;
  if (pending) {
    btn = <div>Waiting...</div>;
  }
  // console.log(auth);
  if (isSignedIn) {
    btn = (
      <div>
        <div>
          {/* <img src={user.photoURL} alt="img" /> */}
          <h3>{user.displayName}</h3>
        </div>
      </div>
    );
  }
  if (!isSignedIn) {
    btn = (
      <button
        onClick={() => {
          signIn();
        }}
      >
        Sign In
      </button>
    );
  }
  return (
    <>
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        className={styles.navbar}
      >
        <Container fluid className="mx-1">
          <Navbar.Brand href="/">Hamara Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <nav className={styles.nav}>
              <Link href="/">Home</Link>
              <Link href="/homestayForm" passHref>
                register your home
              </Link>
              <Link href="/about">About</Link>
            </nav>
            {btn}
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
