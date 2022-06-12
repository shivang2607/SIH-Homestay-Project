import React, { useState } from "react";
import { db } from "../../firebase/initFirebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Card, Button } from "react-bootstrap";
import { TiCancel } from "react-icons/ti";
import styles from "../../styles/account.module.css";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";

const HomeOwner = () => {
  const [OwnerHistory, setOwnerHistory] = React.useState([]);
  const [dataHome, setdataHome] = React.useState({});
  React.useEffect(() => {
    const email = "shivang2607@gmail.com";
    const emailOwner = "aanyalodhi2001@gmail.com";
    const homeRef = collection(db, "Homes");
    const q = query(homeRef, where("host.email", "==", emailOwner));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setdataHome(doc.data());
        console.log("heyiughjd ", dataHome);
      });
    });

    if (JSON.parse(sessionStorage.getItem(`Owner ${email}`))) {
      setOwnerHistory(JSON.parse(sessionStorage.getItem(`Owner ${email}`)));
      console.log("from local session storage", OwnerHistory);
    } else {
      const docRef = doc(db, "historyHomestay", email);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setOwnerHistory(docSnap.data());
          sessionStorage.setItem(
            `Owner ${email}`,
            JSON.stringify(docSnap.data())
          );
        } else {
          window.alert("No Bookings Yet");
        }
      });
      console.log("from firebase", OwnerHistory);
    }
  }, []);

  function miliToDate(mili) {
    const date = Date(mili);
    return date;
  }

  

  return (
    <div>
      {OwnerHistory && console.log(OwnerHistory)}
      <Tabs
        className={styles.book}
        orientation="vertical"
        variant="soft-rounded"
        colorScheme="teal"
      >
        <TabList className={styles.list}>
          <Tab className="my-4 px-2">Dashboard</Tab>
          <Tab className="my-4 px-2">Current Bookings</Tab>
          <Tab className="my-4 px-2">Past Bookings</Tab>
          <Tab className="my-4 px-2">Cancelled Bookings</Tab>
        </TabList>

        <TabPanels className={`${styles.book}`}>
          <TabPanel>
            <div className="card">
              <div className="card-body">
              {dataHome.address}
                <Editable defaultValue= "hj" >
               
                  <EditablePreview />
                  <EditableInput />
                </Editable>

                <button className="btn-primary" >Update</button>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={` ${styles.current}`}>
              <div style={{ justifyContent: "center" }}>
                {OwnerHistory.current &&
                  OwnerHistory.current.map((currentBook) => {
                    return (
                      <Card className={`${styles.card}`}>
                        <Card.Body>
                          <Card.Title>
                            <h3>{currentBook.userName} </h3>
                          </Card.Title>
                          {/* <Card.Subtitle className={`${styles.location} my-1`}>
                            {currentBook.Address}, {currentBook.Location}
                          </Card.Subtitle> */}

                          <div className={`${styles.price}`}>
                            <h4>Total Rent: </h4>
                            <h2 className={`${styles.pricetag}`}>
                              Rs. 480{" "}
                              <h4 className={`${styles.subpricetag}`}>
                                (120 / head)
                              </h4>
                            </h2>
                          </div>

                          <div className={`${styles.date}`}>
                            <span>Check In Date: </span>
                          </div>
                          <div className={`${styles.date}`}>
                            <span>Check Out Date: </span>
                          </div>

                          {/* <button className={`mt-5 ${styles.btn}`}  ><TiCancel color="white" size={25}/>Cancel Booking</button> */}
                        </Card.Body>
                      </Card>
                    );
                  })}
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className={` ${styles.current}`}>
              <div style={{ justifyContent: "center" }}>
                {OwnerHistory.past &&
                  OwnerHistory.past.map((pastBook) => {
                    return (
                      <Card className={`${styles.card}`}>
                        <Card.Body>
                          <Card.Title>
                            <h3>{pastBook.userName} </h3>
                          </Card.Title>
                          <Card.Subtitle className={`${styles.location} my-1`}>
                            {pastBook.Address}, {pastBook.Location}
                          </Card.Subtitle>

                          <div className={`${styles.price}`}>
                            <h4>Total Rent: </h4>
                            <h2 className={`${styles.pricetag}`}>
                              Rs. 480{" "}
                              <h4 className={`${styles.subpricetag}`}>
                                (120 / head)
                              </h4>
                            </h2>
                          </div>

                          <div className={`${styles.date}`}>
                            <span>Check In Date: </span>
                          </div>
                          <div className={`${styles.date}`}>
                            <span>Check Out Date: </span>
                          </div>
                        </Card.Body>
                      </Card>
                    );
                  })}
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className={` ${styles.current}`}>
              <div style={{ justifyContent: "center" }}>
                {OwnerHistory.cancelled &&
                  OwnerHistory.cancelled.map((cancelledBook) => {
                    return (
                      <Card className={`${styles.card}`}>
                        <Card.Body>
                          <Card.Title>
                            <h3>{cancelledBook.userName} </h3>
                          </Card.Title>
                          <Card.Subtitle className={`${styles.location} my-1`}>
                            {cancelledBook.Address}, {cancelledBook.Location}
                          </Card.Subtitle>

                          <div className={`${styles.price}`}>
                            <h4>Total Rent: </h4>
                            <h2 className={`${styles.pricetag}`}>
                              Rs. 480{" "}
                              <h4 className={`${styles.subpricetag}`}>
                                (120 / head)
                              </h4>
                            </h2>
                          </div>

                          <div className={`${styles.date}`}>
                            <span>
                              Check In Date: {miliToDate(1653979476708)}{" "}
                            </span>
                          </div>
                          <div className={`${styles.date}`}>
                            <span>Check Out Date: </span>
                          </div>
                        </Card.Body>
                      </Card>
                    );
                  })}
              </div>{" "}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default HomeOwner;
