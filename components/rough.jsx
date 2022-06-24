import React, { useState } from "react";
import styles from "../styles/search.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import searchimage from "../public/search-button.png";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import newPlaces from "../components/items";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

const Rough = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [stopDate, setStopDate] = useState(new Date());
  const [cityname, setCityName] = useState("");
  const [disname, setDisName] = useState("");
  const [statename, setStateName] = useState("");
  const [people, setPeople] = useState(1);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
    setCityName(item.City);
    setStateName(item.State);
    setDisName(item.District);

    console.log(cityname);
    console.log(statename);
    console.log(disname);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item.cityState}
        </span>
      </>
    );
  };

  const handlechange = (e) => {
    setPeople(e.target.value);
  };

  const handlesubmit = () => {
    if (!cityname || !startDate || !stopDate) {
      console.log("empty is");
      setShow(true);
    } else {
      router.push({
        pathname: "/Location/[location]",
        query: {
          location: cityname,
          checkIn: startDate.getTime() / 1000,
          checkOut: stopDate.getTime() / 1000,
          guests: people,
        },
      });
    }
  };
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
