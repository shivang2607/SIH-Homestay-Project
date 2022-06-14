import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from 'react-bootstrap/Dropdown'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import searchimage from "../public/search-button.png"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import newPlaces from '../components/items'
import { useRouter } from 'next/router'


const search = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [stopDate, setStopDate] = useState(new Date())
  const [cityname, setCityName] = useState("")
  const [disname, setDisName] = useState("")
  const [statename, setStateName] = useState("")

  const router = useRouter()

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    setCityName(item.City);
    setStateName(item.State);
    setDisName(item.District)

    console.log(cityname);
    console.log(statename);
    console.log(disname);
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>

        <span style={{ display: 'block', textAlign: 'left' }}>{item.cityState}</span>

      </>
    )
  }


  return (
    <>
      <div>
        <Container className={styles.maindiv}>
          <Row >
            <Col xs={12} md={3}>
              <div>

                <div className={`${styles.guests}`}>
                  <ReactSearchAutocomplete
                    styling={{ borderRadius: "5px", boxShadow: "rgba(190, 182, 182, 0.986) 2px 3px 2px 0px" }}
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
            <Col xs={12} md={3}>
              <div>


                <input placeholder="Guests" className={`${styles.datecss} ${styles.guests}`} type="number" min="1" />
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div >
                <DatePicker placeholderText="Enter Check in Date" className={`${styles.datecss}  `} selected={startDate} onChange={date => setStartDate(date)}

                  dateFormat='dd/MM/yyyy'
                  minDate={new Date()}
                />
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div>



                <DatePicker placeholderText="Enter Check Out Date" className={`${styles.datecss}  ${styles.innerdiv}`} selected={stopDate} onChange={date => setStopDate(date)}

                  dateFormat='dd/MM/yyyy'
                  minDate={startDate}
                />

              </div>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: 'center' }}>
              <Button variant="primary" size="lg" style={{ marginTop: "2rem", padding: ".5rem 1rem" }} onClick={() => {
                router.push({
                  pathname: '/Location/[location]',
                  query: { location: 'Jaipur', checkIn: new Date().getTime() / 1000, checkOut: (new Date().getTime() + 432000000) / 1000, guests: 2 }
                })
              }}>Search</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default search;
