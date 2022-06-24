import Head from "next/head";
import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Search from "../components/search";
import { useFirebase } from "../context/firebaseContext";
import HomeCarousel from "../components/homeCarousel";
import { Container } from "react-bootstrap";
import UtilityButtons from "../components/utilityButtons";
import Rough from "../components/rough";
export default function Home() {
  const { getHomeHistory } = useFirebase();
  console.log(getHomeHistory);

  React.useEffect(() => {
    // const update = async()=>{
    //   await UpdateStateHomestay();
    // }
    // update()
  }, []);

  return (
    <Container className={styles.container}>
      <Container className={styles.search}>
          <Search />
      </Container>
      <div className={styles.herocontainer}>
        <div className={styles.hero}>
          <HomeCarousel />
        </div>
      </div>
      <iframe
        className={styles.vdo}
        src="https://www.youtube-nocookie.com/embed/x1ZJhUyMwSg"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <Container className={styles.content}>
        <UtilityButtons />
      </Container>
    </Container>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
