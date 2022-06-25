import React from "react";
import styles from "../styles/utils.module.css";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";

const UtilityButtons = () => {
  return (
    <div className={styles.container}>
      <Link href={"/homestayForm"}>
        <div className={styles.button}>
          <div className={styles.image}>
          <Image src="/static/icon.png" alt="" className={`${styles.image} rounded-full`} layout="fixed" width={175} height={175} objectFit="cover" ></Image>
          </div>
          <h3>Register Home</h3>
        </div>
      </Link>
    </div>
  );
};

export default UtilityButtons;
