import React, { useState } from "react";
import styles from "../styles/search.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import newPlaces from "../location";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { v4 } from "uuid";

const Search = () => {
  const tomorrow = new Date(); // The Date object returns today's timestamp
  tomorrow.setDate(tomorrow.getDate() + 1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [stopDate, setStopDate] = useState("");
  const [nextdate, setNextDate] = useState("");
  const [cityname, setCityName] = useState("");
  const [disname, setDisName] = useState("");
  const [statename, setStateName] = useState("");
  const [people, setPeople] = useState(1);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOnSearch = (string, results) => {
    
  };

  const handleOnHover = (result) => {
  };

  const handleOnSelect = (item) => { 
    setCityName(item.City);
    setStateName(item.State);
    setDisName(item.District);

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
 
  {console.log(nextdate)}

  const handlesubmit = () => {
    if (!cityname || !startDate || !stopDate || !people) {
      setShow(true);
    } else {
      setLoading(true);

      loading ||
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
      <div
        style={{
          display: "flex",
          width: "100vw",
          justifyContent: "center",
          justifySelf: "center",
        }}
      >
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
                fontSize: "17px",
              }}
            >
              Like CityName, Guests, Checkin Date, Checkout Date
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* <div style={{display:"flex",width:"100%"}} className={styles.maindiv}> */}
        <div className={styles.maindiv} style={{ width:'99vw'}}>
          <form onSubmit={handleSubmit(handlesubmit)}>
            <Row>
              <Col xs={12} md={12} lg={3}>
                <div>
                  <div className={`${styles.autosearch}`}>
                    <ReactSearchAutocomplete
                      styling={{
                        borderRadius: "5px",
                        zIndex: "3",
                        border: "none",
                        filter: "alpha(opacity=60)",
                        backgroundColor: "#121212",
                        color: "cadetblue",
                        height: "2.5rem",
                      }}
                      items={newPlaces}
                      placeholder="Enter City/Town"
                      onSearch={handleOnSearch}
                      onHover={handleOnHover}
                      onSelect={handleOnSelect}
                      onFocus={handleOnFocus}
                      autoFocus
                      fuseOptions={{ keys: ["City", "State"] }}
                      formatResult={formatResult}
                      resultStringKeyName="cityState"
                    />
                  </div>
                </div>
              </Col>
              <Col xs={4} md={4} lg={3}>
                <div>
                  <input
                    onChange={handlechange}
                    placeholder="Guests"
                    name="guests"
                    className={classNames(
                      `${styles.datecss} ${styles.guests}`,
                      { "is-invalid": errors.guests }
                    )}
                    type="number"
                    min="1"
                  />
                </div>
              </Col>
                <Col xs={8} md={4} lg={3}>
                  <div className={styles.dates}>
                    <DatePicker
                      placeholderText="Enter Check in Date"
                      className={`${styles.datecss}  `}
                      selected={startDate}
                      onChange={(date) => {setStartDate(date) ; setNextDate(new Date(date.getTime() + (24 * 60 * 60 * 1000))) }}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                    />

                  </div>
                </Col>
                <Col xs={8} md={4} lg={3}>
                  <div className={styles.dates}>
                    <DatePicker
                      placeholderText="Enter Check Out Date"
                      className={`${styles.datecss}  ${styles.innerdiv}`}
                      selected={stopDate}
                      onChange={(date) => setStopDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={nextdate}
                    />
                  </div>
                </Col>
            </Row>
            <Row>
              <Col style={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  style={{
                    color: "#121212",
                    marginTop: "1.25rem",
                    padding: ".375rem 0.75rem",
                    backgroundColor: "#abe9cd",
                    backgroundImage:
                      "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
                  }}
                >
                  {loading ? (
                    <>
                      {" "}
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </>
  );
};

export default Search;
