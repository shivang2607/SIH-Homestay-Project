import React from "react";
import styles from "../styles/Home.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <b><i>© <i style={{fontSize:"smaller", fontWeight:"100", color:"gray"}}>2022</i> Grahashram</i></b>
    </div>
  );
};

export default Footer;
