import React, { useState } from "react";
import { db } from "../../firebase/initFirebase";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import classNames from "classnames";
import { useFirebase } from "../../context/firebaseContext";
import {
  Switch,
  FormControl,
  FormLabel,
  StylesProvider,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Card, Button } from "react-bootstrap";
import { TiCancel } from "react-icons/ti";
import styles from "../../styles/account.module.css";
import { MdDelete, MdAddBox } from "react-icons/md";

const HomeOwner = () => {
  const [OwnerHistory, setOwnerHistory] = React.useState([]);
  const [dataHome, setdataHome] = React.useState({});
  const [active, setActive] = useState(true);
  const [rules, setRules] = useState({
    nonVeg: false,
    nonVegTolerant: false,
    alcoholTolerant: false,
    coupleFriendly: false,
    petAllowance: false,
    AC: false,
  });
  const [loading, setLoading] = React.useState(false);

  const { setActiveStatus, updateHomestay, getUserCookies } = useFirebase();
  const { details } = getUserCookies();
  const [docId, setDocId] = useState();

  //  const [rules,setRules]=React.useState();

  React.useEffect(() => {
    // console.log("HHare Kris");
    const email = details.email;
    const homeRef = collection(db, "Homes");
    const q = query(homeRef, where("host.email", "==", email));

    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.empty) {
        setLoading(true);
      } else {
        setLoading(false);
        querySnapshot.forEach((doc) => {
          setdataHome(doc.data());
          setDocId(doc.id);
          rules = doc.data().Rules.Rules;
          // dataHome && console.log("heyiughjd ", dataHome);
        });

        // if (JSON.parse(sessionStorage.getItem(`Owner ${email}`))) {
        //   setOwnerHistory(JSON.parse(sessionStorage.getItem(`Owner ${email}`)));
        //   //  console.log("from local session storage", OwnerHistory);
        // } else {
        const docRef = doc(db, "historyHomestay", email);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setOwnerHistory(docSnap.data());
            sessionStorage.setItem(
              `Owner ${email}`,
              JSON.stringify(docSnap.data())
            );
          } else {
            // window.alert("No Bookings Yet owener");
          }
        });
        // console.log("from firebase", OwnerHistory);
        //}
      }
    });
  }, []);

  React.useEffect(() => {
    reset({
      rent: dataHome.pricePerNight,
      rules: dataHome.Rules?.Rules,
      description: dataHome.desc,
    });

    setRules((rules) => ({
      ...rules,
      ...dataHome.Rules,
      ...dataHome,
    }));
  }, [dataHome]);

  React.useEffect(() => {
    if (docId != null) setActiveStatus(docId, active);
  }, [active]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "rules", // unique name for your Field Array
    }
  );

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setRules((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  }

  function miliToDate(time) {
    const fireBaseTime = new Date(
      time.seconds * 1000 + time.nanoseconds / 1000000
    );
    const date = fireBaseTime.toDateString();
    //console.log(fireBaseTime)
    return fireBaseTime;
  }
  function Submit(data) {
    //console.log(data, rules);
    updateHomestay(
      docId,
      data.description,
      rules.AC,
      Number(data.rent),
      rules.nonVeg,
      rules.alcoholTolerant,
      rules.coupleFriendly,
      rules.nonVegTolerant,
      rules.petAllowance,
      data.rules,
      dataHome.Rules?.openTime
    );
  }

  // {dataHome.Rules?.Rules.map(value=>(

  //   append(value)
  // ))}

  return (
    <>{
      !loading? 
      <div>
        {dataHome && console.log("data", OwnerHistory)}
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
              <div className={styles.activebutton}>
                <Switch
                  id="active"
                  isChecked={active}
                  onChange={(e) => {
                    setActive(!active);
                  }}
                  size="lg"
                ></Switch>
                {active ? "Deactivate Home " : "Activate Home"}
              </div>

              <div className={`${styles.update} card m-0`}>
                <div className="card-body">
                  <form onSubmit={handleSubmit(Submit)}>
                    {/* <button onClick={reset(dataHome)}>resst</button> */}

                    <div className="form-group ">
                      <label htmlFor="rent" className="mb-1">
                        Rent
                      </label>
                      <input
                        id="rent"
                        name="rent"
                        type="text"
                        className={classNames(
                          `${styles.textfield} form-control`,
                          {
                            "is-invalid": errors.rent,
                          }
                        )}
                        placeholder="Rent per Person"
                        {...register("rent", {
                          required: "This is required",
                        })}
                        defaultValue="kjf"
                      />
                      {errors.rent && (
                        <div className="invalid-feedback">
                          {errors.rent.message}
                        </div>
                      )}
                    </div>

                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      defaultValue={dataHome.desc}
                      className={classNames(
                        ` ${styles.textfield} form-control`,
                        {
                          "is-invalid": errors.description,
                        }
                      )}
                      {...register("description", {
                        required: "This is required",
                      })}
                    />

                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description.message}
                      </div>
                    )}

                    <fieldset
                      className={`${styles.features} row border p-4 my-3 mx-1 `}
                    >
                      <legend>Features</legend>

                      <div className="row ">
                        <FormControl
                          display="flex"
                          className=" col col-xs-12 mb-2"
                        >
                          <Switch
                            id="nonVegTolerant"
                            name="nonVegTolerant"
                            // isChecked={dataHome.Rules?.nonVegTolerant}
                            isChecked={rules.nonVegTolerant}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                          <FormLabel htmlFor="tolerrenceNonveg" mb="0">
                            Non-veg Tolerrence
                          </FormLabel>
                        </FormControl>

                        <FormControl
                          display="flex"
                          className=" col  col-xs-12 mb-2 "
                        >
                          <Switch
                            id="nonVeg"
                            name="nonVeg"
                            isChecked={rules.nonVeg}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />

                          <FormLabel htmlFor="nonVeg" mb="0">
                            Non-vegetarian
                          </FormLabel>
                        </FormControl>

                        <FormControl
                          display="flex"
                          className="col  col-xs-12 mb-2 "
                        >
                          <Switch
                            id="petAllowance"
                            name="petAllowance"
                            isChecked={rules.petAllowance}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                          <FormLabel htmlFor="pet" mb="0">
                            Pets Allowed
                          </FormLabel>
                        </FormControl>
                      </div>

                      <div className="row">
                        <FormControl
                          display="flex"
                          className=" col col-xs-12 mb-2 "
                        >
                          <Switch
                            id="coupleFriendly"
                            name="coupleFriendly"
                            isChecked={rules.coupleFriendly}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                          <FormLabel htmlFor="couple" mb="0">
                            Couple friendly
                          </FormLabel>
                        </FormControl>

                        <FormControl
                          display="flex"
                          className=" col col-xs-12 mb-2"
                        >
                          <Switch
                            id="alcoholTolerant"
                            name="alcoholTolerant"
                            isChecked={rules.alcoholTolerant}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                          <FormLabel htmlFor="alcohol" mb="0">
                            Alcohol Tolerrence
                          </FormLabel>
                        </FormControl>

                        <FormControl
                          display="flex"
                          className="col col-xs-12 mb-2 "
                        >
                          <Switch
                            id="AC"
                            name="AC"
                            isChecked={rules.AC}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                          <FormLabel htmlFor="ac" mb="0">
                            Air Conditioner
                          </FormLabel>
                        </FormControl>
                      </div>
                    </fieldset>

                    <fieldset
                      className={`${styles.features} row border p-4 my-3 mx-1 `}
                    >
                      <legend>Rules</legend>

                      {fields.map((field, index) => (
                        <div key={index} className="form-group row my-2 mx-1">
                          <div className="col-md-11">
                            <input
                              id={`rules.${index}`}
                              key={field.id}
                              name={`rules.${index}`}
                              type="text"
                              className={classNames(
                                `${styles.textfield} form-control my-1`,
                                {
                                  "is-invalid": errors.rules?.[index],
                                }
                              )}
                              // defaultValue={field}
                              placeholder={"rule" + [index + 1]}
                              {...register(`rules.${index}`, {
                                required: "This is required",
                              })}
                            />
                          </div>
                          {errors.rules?.[index] && (
                            <div className="invalid-feedback">
                              {errors.rules?.[index]?.message}
                            </div>
                          )}

                          <div className="col-md-1">
                            <button
                              type="button"
                              className="btn col "
                              onClick={() => remove(index)}
                            >
                              <MdDelete color="tomato" size={40} />
                            </button>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="btn mr-2 "
                        onClick={() => append(null)}
                      >
                        <MdAddBox color="blue" size={70} />
                      </button>
                    </fieldset>

                    {/* {dataHome.Rules?.Rules.map((rule)=>
        {
         return (
         // append(rule) 
         console.log(rule)
         )
        })} */}

                    <button
                      type="submit"
                      className={`${styles.submit} form--submit`}
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </TabPanel>

            <TabPanel className={` ${styles.current}`}>
              <div>
                <div style={{ justifyContent: "center" }}>
                  {OwnerHistory.current?.length > 0 ? (
                    OwnerHistory.current.map((currentBook) => {
                      return (
                        <Card
                          className={`${styles.card}`}
                          key={currentBook.bookingId}
                        >
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
                            {/* <button className={`mt-5 ${styles.btn}`}  ><TiCancel color="white" size={25}/>Cancel Booking</button> */}
                          </Card.Body>
                        </Card>
                      );
                    })
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
                </div>
              </div>
            </TabPanel>

            <TabPanel className={` ${styles.current}`}>
              <div>
                <div style={{ justifyContent: "center" }}>
                  {OwnerHistory.past?.length > 0 ? (
                    OwnerHistory.past.map((pastBook) => {
                      return (
                        <Card
                          className={`${styles.card}`}
                          key={pastBook.bookingId}
                        >
                          <Card.Body>
                            <Card.Title>
                              <h3>{pastBook.userName} </h3>
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
                                  ({pastBook.TotalRent / pastBook.peopleCount} /
                                  head)
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
                </div>
              </div>
            </TabPanel>

            <TabPanel className={`${styles.current}`}>
              <div>
                <div style={{ justifyContent: "center" }}>
                  {OwnerHistory.cancelled?.length > 0 ? (
                    OwnerHistory.cancelled.map((cancelledBook) => {
                      return (
                        <Card
                          className={`${styles.card}`}
                          key={cancelledBook.bookingId}
                        >
                          <Card.Body>
                            <Card.Title>
                              <h3>{cancelledBook.userName} </h3>
                            </Card.Title>
                            <Card.Subtitle
                              className={`${styles.location} my-1`}
                            >
                              {cancelledBook.Address}, {cancelledBook.Location}
                            </Card.Subtitle>

                            <div className={`${styles.price}`}>
                              <h4>Total Rent: </h4>
                              <h2 className={`${styles.pricetag}`}>
                                Rs. {cancelledBook.TotalRent}{" "}
                                <div className={`${styles.subpricetag}`}>
                                  (
                                  {cancelledBook.TotalRent /
                                    cancelledBook.peopleCount}{" "}
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
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>:
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          src="/no-data-found.webp"
          layout="intrinsic"
          height={800}
          width={1000}
          alt=""
        />
      </div>}
    </>
  );
};

export default HomeOwner;
