import { Carousel, Container } from "react-bootstrap";
import React from "react";
import Image from "next/image";
// import styles from "../styles/Home.module.css";

const HomeCarousel = () => {
  return (
    <Container >
      <Carousel fade interval={2500}>
        <Carousel.Item className="heroimg">
          <img className={"d-block w-100 "} src={"/static/homestay1.jpg"} alt="" />
          <Carousel.Caption>
            <h2>Wanna run from hustle and bustle of city life?</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="heroimg">
          <img className={"d-block w-100"} src={"/static/homestay2.jpg"} alt="" />
          <Carousel.Caption>
            <h2>Love nature?</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="heroimg">
          <img className={"d-block w-100"} src={"/static/homestay3.jpg"} alt="" />
          <Carousel.Caption>
            <h2>Wanna experience a new culture?</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="heroimg"> 
          <img className={"d-block w-100"} src={"/static/homestay4.jpg"} alt="" />
          <Carousel.Caption>
            <h2>Want some we time?</h2>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default HomeCarousel;
