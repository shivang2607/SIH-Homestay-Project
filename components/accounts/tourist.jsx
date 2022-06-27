import React from "react";
import { db } from "../../firebase/initFirebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Card, Button } from "react-bootstrap";
import { TiCancel } from "react-icons/ti";
import { useFirebase } from "../../context/firebaseContext";
import Spinner from "react-bootstrap/Spinner";
import { v4 } from "uuid";


//email send
import Image from "next/image";
import styles from "../../styles/account.module.css";

const Tourist = () => {
  const [userHistory, setUserHistory] = React.useState([]);
  const { getUserCookies, cancelBooking, sendMail } = useFirebase();
  const { details } = getUserCookies();
  const [currentId, setCurrentId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [cancelling, setCancelling] = React.useState(false);
  const [cancelbookid, setCancelbookid] = React.useState(null);

  React.useEffect(() => {
    const email = details.email;

    const docRef = doc(db, "historyUser", email);
    const unsub = onSnapshot(docRef, (docSnap) => {
      console.log("attached");
      if (docSnap.exists()) {
        setLoading(false);
        setCancelling(false), setCancelbookid(null);
        setUserHistory(docSnap.data());

        sessionStorage.setItem(
          `tourist ${email}`,
          JSON.stringify(docSnap.data())
        );
      } else {
        setLoading(true);
      }
    });

    return () => {
      console.log("detached \n hello");
      unsub();
    };
  }, []);

  async function cancelBooking1(currentbook) {
    setCancelling(true);
    const emailUser = details.email;
    const userName = details.name;
    const {
      bookingId,
      emailOwner,
      homeStayId,
      HomestayName,
      checkInTime,
      checkOutTime,
      peopleCount,
      TotalRent,
      Location,
      Address,
      ownerPhone,
      bookedAt,
    } = currentbook;

    setCancelbookid(bookingId);

    await cancelBooking(
      bookingId,
      emailUser,
      emailOwner,
      homeStayId,
      userName,
      HomestayName,
      miliToDate(checkInTime),
      miliToDate(checkOutTime),
      peopleCount,
      TotalRent,
      Location,
      Address,
      ownerPhone,
      miliToDate(bookedAt)
    );

    const greetings = "Hope , Your are doing fine";
    const Homestayname = "GrahAshram";
    const subject = "Booking Cancelled";

    const messageuser = `<p>As per your request, your booking at ${HomestayName} between the dates  ${miliToDate(
      checkInTime
    ).toDateString()} to ${miliToDate(
      checkOutTime
    ).toDateString()} has been successfully cancelled <br/> bookingId: ${bookingId} <br/> Total Rent booked: ${TotalRent} <br/> Number of people: ${peopleCount}. </p>`;

    let userData = {
      fromName: Homestayname,
      fromEmail: emailOwner,
      toEmail: emailUser,
      subject: subject,
      html: messageuser,
    };
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => {
      console.log("mail: ", res.status);
    });

    const messageOwner = `<p>Booking at your Home (With Booking ID : ${bookingId} ) between the dates  ${miliToDate(
      checkInTime
    ).toDateString()}   to ${miliToDate(
      checkOutTime
    ).toDateString()}  has been canelled by ${userName} <br/>  Total Rent: ${TotalRent} <br/> Number of people: ${peopleCount}  <br/> <br/> Have a nice day. </p>`;
    let ownerData = {
      fromName: userName,
      fromEmail: emailUser,
      toEmail: emailOwner,
      subject: subject,
      html: messageOwner,
    };
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ownerData),
    }).then((res) => {
      console.log("mail: ", res.status);
    });
    sessionStorage.clear();
  }

  function miliToDate(time) {
    const fireBaseTime = new Date(
      time.seconds * 1000 + time.nanoseconds / 1000000
    );
    const date = fireBaseTime.toDateString();
    return fireBaseTime;
  }

  return (
    <>
      {!loading ? (
        <div>
          <Tabs
            className={styles.book}
            orientation="vertical"
            variant="soft-rounded"
            colorScheme="teal"
          >
            <TabList className={styles.list}>
              <Tab className="my-4 px-2">Current Bookings</Tab>
              <Tab className="my-4 px-2">Past Bookings</Tab>
              <Tab className="my-4 px-2">Cancelled Bookings</Tab>
            </TabList>

            <TabPanels className={`${styles.book}`}>
              <TabPanel className={` ${styles.current}`}>
                {/* <button className={`mt-5 ${styles.btn}`}onClick={cancelBooking1}>kjuyu</button> */}
                <div>
                  <div style={{ justifyContent: "center" }}>
                    {userHistory.current?.length > 0 ? (
                      userHistory.current.map((currentBook) => {
                        return (
                          <>
                            <Card
                              className={`${styles.card}`}
                              key={currentBook.bookingId}
                            >
                              <Card.Body>
                                <Card.Title>
                                  <h3>{currentBook.HomestayName} </h3>
                                </Card.Title>
                                <Card.Subtitle
                                  className={`${styles.location} my-1`}
                                >
                                  {currentBook.Address}, {currentBook.Location}
                                </Card.Subtitle>

                                <div className={`${styles.price}`}>
                                  <h4>Total Rent: </h4>
                                  <h2 className={`${styles.pricetag}`}>
                                    Rs. {currentBook.TotalRent}{" "}
                                    <div className={`${styles.subpricetag}`}>
                                      (
                                      {currentBook.TotalRent /
                                        currentBook.peopleCount}{" "}
                                      / head)
                                    </div>
                                  </h2>
                                </div>

                                <div className={`${styles.date}`}>
                                  <span className={`${styles.dateLabel}`}>
                                    Check In Date:{" "}
                                  </span>{" "}
                                  <div className={`${styles.datetag}`}>
                                    {miliToDate(
                                      currentBook.checkInTime
                                    ).toDateString()}
                                  </div>
                                </div>
                                <div className={`${styles.date}`}>
                                  <span className={`${styles.dateLabel}`}>
                                    Check Out Date:{" "}
                                  </span>{" "}
                                  <div className={`${styles.datetag}`}>
                                    {miliToDate(
                                      currentBook.checkOutTime
                                    ).toDateString()}
                                  </div>
                                </div>

                                <div className={`${styles.date}`}>
                                  <span className={`${styles.dateLabel}`}>
                                    Booked On:{" "}
                                  </span>
                                  <div className={`${styles.canceltag}`}>
                                    {miliToDate(
                                      currentBook.bookedAt
                                    ).toDateString()}
                                  </div>
                                </div>

                                <button
                                  className={`mt-5 ${styles.btn}`}
                                  onClick={() => cancelBooking1(currentBook)}
                                >
                                  {cancelbookid === currentBook.bookingId &&
                                  cancelling ? (
                                    <>
                                      {" "}
                                      <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                      />
                                      Cancelling
                                    </>
                                  ) : (
                                    <>
                                      <TiCancel color="white" size={25} />
                                      Cancel Booking
                                    </>
                                  )}
                                </button>
                              </Card.Body>
                            </Card>
                          </>
                        );
                      })
                    ) : (
                      <div>
                        <Image
                          src="/no-data-found.webp"
                          layout="intrinsic"
                          height={800}
                          width={1000}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className={` ${styles.current}`}>
                  <div style={{ justifyContent: "center" }}>
                    {userHistory.past?.length > 0 ? (
                      userHistory.past.map((pastBook) => {
                        return (
                          <Card
                            className={`${styles.card}`}
                            key={v4()}
                          >
                            <Card.Body>
                              <Card.Title>
                                <h3>{pastBook.HomestayName} </h3>
                              </Card.Title>
                              <Card.Subtitle
                                className={`${styles.location} my-1`}
                              >
                                {pastBook.Address}, {pastBook.Location}
                              </Card.Subtitle>

                              <div className={`${styles.price}`}>
                                <h4>Total Rent: </h4>
                                <h2 className={`${styles.pricetag}`}>
                                  Rs. {pastBook.TotalRent}{" "}
                                  <div className={`${styles.subpricetag}`}>
                                    (120 / head)
                                  </div>
                                </h2>
                              </div>

                              <div className={`${styles.date}`}>
                                <span className={`${styles.dateLabel}`}>
                                  Check In Date:{" "}
                                </span>{" "}
                                <div className={`${styles.datetag}`}>
                                  {miliToDate(
                                    pastBook.checkInTime
                                  ).toDateString()}
                                </div>
                              </div>
                              <div className={`${styles.date}`}>
                                <span className={`${styles.dateLabel}`}>
                                  Check Out Date:{" "}
                                </span>{" "}
                                <div className={`${styles.datetag}`}>
                                  {miliToDate(
                                    pastBook.checkOutTime
                                  ).toDateString()}
                                </div>
                              </div>

                              <div className={`${styles.date}`}>
                                <span className={`${styles.dateLabel}`}>
                                  Booked On:{" "}
                                </span>
                                <div className={`${styles.canceltag}`}>
                                  {miliToDate(pastBook.bookedAt).toDateString()}
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        );
                      })
                    ) : (
                      <div>
                        <Image
                          src="/no-data-found.webp"
                          layout="intrinsic"
                          height={800}
                          width={1000}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                </div>
              </TabPanel>
              <TabPanel className={` ${styles.current}`}>
                <div>
                  <div style={{ justifyContent: "center" }}>
                    {userHistory.cancelled?.length > 0 ? (
                      userHistory.cancelled.map((cancelledBook) => {
                        return (
                          <Card
                            className={`${styles.card}`}
                            key={v4()}
                          >
                            <Card.Body>
                              <Card.Title>
                                <h3>{cancelledBook.HomestayName} </h3>
                              </Card.Title>
                              <Card.Subtitle
                                className={`${styles.location} my-1`}
                              >
                                {cancelledBook.Address},{" "}
                                {cancelledBook.Location}
                              </Card.Subtitle>

                              <div className={`${styles.price}`}>
                                <h4>Total Rent: </h4>
                                <h2 className={`${styles.pricetag}`}>
                                  Rs. {cancelledBook.TotalRent}{" "}
                                  <div className={`${styles.subpricetag}`}>
                                    (
                                    {cancelledBook.TotalRent /
                                      cancelledBook.peopleCount}
                                    / head)
                                  </div>
                                </h2>
                              </div>

                              <div className={`${styles.date}`}>
                                <span className={`${styles.dateLabel}`}>
                                  Check In Date:{" "}
                                </span>{" "}
                                <div className={`${styles.datetag}`}>
                                  {miliToDate(
                                    cancelledBook.checkInTime
                                  ).toDateString()}
                                </div>
                              </div>
                              <div className={`${styles.date}`}>
                                <span className={`${styles.dateLabel}`}>
                                  Check Out Date:{" "}
                                </span>{" "}
                                <div className={`${styles.datetag}`}>
                                  {miliToDate(
                                    cancelledBook.checkOutTime
                                  ).toDateString()}
                                </div>
                              </div>

                              <div className={`${styles.date} my-5`}>
                                <span className={`${styles.dateLabel}`}>
                                  Cancelled On:{" "}
                                </span>
                                <div className={`${styles.canceltag}`}>
                                  {miliToDate(
                                    cancelledBook.cancelledAt
                                  ).toDateString()}
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        );
                      })
                    ) : (
                      <div>
                        <Image
                          src="/no-data-found.webp"
                          layout="intrinsic"
                          height={800}
                          width={1000}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/no-data-found.webp"
            layout="intrinsic"
            height={800}
            width={1000}
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Tourist;
