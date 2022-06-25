import React, { useState } from "react";
import styles from "../styles/search.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";

const Rough = () => {
 
  const router = useRouter();

  const [show, setShow] = useState(false);

 
  return (
    <>
      <div>
        <Modal show={show} onHide={() => setShow(false)} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Please, fill all the field </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                textAlign: "center",
                color: "blue",
                fontFamily: "Montserrat",
                fontSize: "18px",
              }}
            >
              Like CityName, Checkin Date, Check out Date
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Container className={styles.search__container}></Container>
      </div>
    </>
  );
};

export default Rough;
