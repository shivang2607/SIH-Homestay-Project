import React, { useState } from "react";
import styles from "../styles/Home.module.css";
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
import classNames from 'classnames'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'

const search = () => {
  const {register,handleSubmit,formState: { errors }} = useForm();
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [stopDate, setStopDate] = useState(new Date());
  const [cityname, setCityName] = useState("");
  const [disname, setDisName] = useState("");
  const [statename, setStateName] = useState("");
  const [people,setPeople] = useState(1);
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
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

  const handlechange =(e)=>{
      /*  console.log(e.target.value); */
      setPeople(e.target.value);
      /* console.log(people) */
  }

  const handlesubmit = () => {
    if(!cityname || !startDate || !stopDate){
      console.log("empty is")
      setShow(true)
      
    }
    else{
      router.push({
        pathname: "/Location/[location]",
        query: {
          checkindate: startDate.getTime()/1000,
          checkoutdate:stopDate.getTime()/1000,
          location:cityname,statename,disname,people
  
  
        },
      });
    }
   
  }
  return (
    <>
      <div>
      <Modal show={show} onHide={() => setShow(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Please, fill all the field </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'center' , color:'blue' ,fontFamily:'Montserrat',fontSize:'18px'}}>Like CityName, Checkin Date, Check out Date</div>
         
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
        <Container className={styles.maindiv}>
        <form onSubmit={handleSubmit(handlesubmit)}>
          <Row>
            
            <Col xs={12} md={3}>
              <div>
                <div className={`${styles.guests}`}>
                  <ReactSearchAutocomplete
                    styling={{
                      borderRadius: "5px",
                      boxShadow: "rgba(190, 182, 182, 0.986) 2px 3px 2px 0px",
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
            <Col xs={12} md={3}>
              <div>
                <input
                 onChange={handlechange}
                  placeholder="Guests"
                  name="guests"
                  className={classNames(`${styles.datecss} ${styles.guests} form-control`, {"is-invalid": errors.guests})}
                  
                  type="number"
                  {...register("guests", {
                    required: "This is required",
                          
                  })}

               

                  min="1"
                />
                   {errors.guests &&(
                    <div className="invalid-feedback">{errors.guests.message}</div>
                  ) }
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div>
                <DatePicker
                  placeholderText="Enter Check in Date"
                  className={`${styles.datecss}  `}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                />
                {/* {console.log(startDate.getTime())} */}
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div>
                <DatePicker
                  placeholderText="Enter Check Out Date"
                  className={`${styles.datecss}  ${styles.innerdiv}`}
                  selected={stopDate}
                  onChange={(date) => setStopDate(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={startDate}
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
               
                style={{ marginTop: "2rem", padding: ".5rem 1rem" }}
              >
                Search
              </Button>
              
            </Col>
           
          </Row>
          </form >
        </Container>
      </div>
    </>
  );
};

export default search;
