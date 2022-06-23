import React from "react";
import Carousel from "react-bootstrap/Carousel";
import {
  MdLocationPin,
  MdDirectionsRailwayFilled,
  MdGroups,
} from "react-icons/md";
import { FaChild } from "react-icons/fa";
import Spinner from 'react-bootstrap/Spinner';
import { MdLocationCity } from "react-icons/md";
import { GiCommercialAirplane } from "react-icons/gi";
import { BiBus, BiMale, BiFemale } from "react-icons/bi";
import styles from "../styles/homestay.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { Badge } from "@chakra-ui/react";
import newPlaces from "../components/items";
import { Button } from "@chakra-ui/react";
import { v4 } from "uuid";
import Image from "next/image";
import Reviewstars from "./star";
// import styles from "../styles/stars.module.css"
import ReactTimeAgo from "react-time-ago";
import { useRouter } from "next/router";
import { AiFillStar } from 'react-icons/ai'

import { FaStar } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useFirebase } from "../context/firebaseContext";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
//

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function HomeStay({ details, homestayId }) {
  const router = useRouter();
  const { checkIn, checkOut, guests, location } = router.query;
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState();
  const [body, setBody] = useState("");
  const [head, setHead] = useState("");
  const [guest, setGuest] = useState(router.query.guests);
 
 

  var checkin_date = new Date(checkIn * 1000);

  var checkout_date = new Date(checkOut * 1000);

  const {
    addComment,
    addRating,
    useAuth,
    bookHomestay,
    sendMail,
    checkUserCookies,
    signIn,
    getUserCookies,
  } = useFirebase();
  const cookies = getUserCookies();
  let name = "";
  if (checkUserCookies()) {
    name = cookies.details.name;
  }
  const { user } = useAuth();
  const [stopDate, setStopDate] = useState(checkout_date);
  const [startDate, setStartDate] = useState(checkin_date);
  const [show, setShow] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [cityname, setCityName] = useState(location);
  const [disname, setDisName] = useState("");
  const [statename, setStateName] = useState("");

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
  };

  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  function getDataBody(val) {
    setBody(val.target.value);
  }

  function getGuests(val) {
    if (val.target.value > 15) {
      setGuest(15);
    } else if (val.target.value < 1) {
      setGuest(1);
    } else {
      setGuest(val.target.value);
    }
  }

  function getDataHead(val) {
    setHead(val.target.value);
  }

  function handleRating(e) {
    e.preventDefault();
    addRating(homestayId, currentValue, name);
    onEditClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    addComment(homestayId, head, name, body);
    addRating(homestayId, currentValue, name);
    onClose();
  }
  var old_checkin_Date = checkin_date;
  checkin_date =
    checkin_date.getDate() +
    "/" +
    checkin_date.getMonth() +
    "/" +
    checkin_date.getFullYear();
  var old_checkout_Date = checkout_date;
  checkout_date =
    checkout_date.getDate() +
    "/" +
    checkout_date.getMonth() +
    "/" +
    checkout_date.getFullYear();

  var diffrecnedate =new Date(old_checkout_Date - old_checkin_Date).getDate() - 1;

  var price = diffrecnedate * details.pricePerNight * guest ;
  

  async function booknow(e) {
    e.preventDefault();
    setLoading(true);
    details.booked_guests = details.booked_guests + guest;
    console.log("this is the booked guests", details.booked_guests);
    console.log("the owner eamil", details.host.email);
    console.log("the details.docid", details.docid);
    console.log("the user", user);
    console.log("oxer phone", details.host.phone);
    console.log("neame homestaya", details.homestayName);
    console.log("the ostart date", startDate);
    console.log("the stop date", stopDate);
    console.log("the diffrence date", diffrecnedate);

    const bookingID = v4();
    await bookHomestay(
      bookingID,
      cookies.details.email,
      details.host.email,
      homestayId,
      cookies.details.name,
      details.host.phone,
      details.homestayName,
      startDate,
      stopDate,
      Number(guest),
      price,
      details.city,
      details.address
    );

    //to the user

    sendMail(
      details.homestayName,
      cookies.details.email,
      cookies.details.name,
      `<p>Your booking of  ${details.homestayName}   from <strong>${checkin_date}</strong> to <strong> ${checkout_date}</strong> has been confirmed</p>`,
      "HOMESTAY BOOKED",
      "Congratulations"
    );

    // to the host
    sendMail(
      details.homestayName,
      details.host.email,
      details.host.name,
      `<p>Your homestay   ${details.homestayName}   has been booked from  <strong>${checkin_date}</strong> to <strong> ${checkout_date}</strong> by detials of the person who has booked it </p>`,
      "HOMESTAY BOOKED",
      "Congratulations"
    );
    router.replace(`/users/${cookies.details.token.slice(5, 25)}`);
    setLoading(false);
  }

  var sum_star = 0;
  return (
    <>
      {details.host ? (
        
        <div>

          <div>
          
            <div className={styles.header_div}>
              <div>
                <div className={styles.rescearch_div}>
                  <ReactSearchAutocomplete
                    styling={{
                      borderRadius: "5px",
                      width: "30px !important",
                      zIndex: "3",
                      border: "none",
                      opacity: "0.6",
                      filter: "alpha(opacity=60)",
                      backgroundColor: "#000",
                      color: "grey",
                    }}
                    items={newPlaces}
                    placeholder="Enter City/Town"
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    fuseOptions={{ keys: ["City", "State"] }}
                    resultStringKeyName="cityState"
                  />
                </div>
              </div>
              <div className={styles.aisehi}>
                <div className={styles.guests_div}>
                  <input
                    placeholder={`Guests: ${guests}`}
                    className={styles.placeholder_guets}
                    type="number"
                    min="1"
                    onChange={getGuests}
                  />
                </div>

                <div className={styles.start_date}>
                  <DatePicker
                    placeholderText="Enter Check in Date"
                    className={styles.datecss}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                  />
                </div>

                <div className={styles.end_date}>
                  <DatePicker
                    placeholderText="Enter Check Out Date"
                    className={styles.datecss}
                    selected={stopDate}
                    onChange={(date) => setStopDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={startDate}
                  />
                </div>

                <div className={styles.seacrh_button}>
                  <Button
                    colorScheme="twitter"
                    fontSize="1.2rem"
                    variant="solid"
                    padding="1rem"
                    size="md"
                    paddingLeft="1.5rem"
                    paddingRight="1.5rem"
                    marginTop="0.2rem"
                    borderRadius="3rem"
                    onClick={() => {
                      if (cityname != location) {
                        router.push({
                          pathname: "/Location/[location]",
                          query: {
                            location: cityname,
                            checkIn: startDate.getTime() / 1000,
                            checkOut: stopDate.getTime() / 1000,
                            guests: guest,
                          },
                        });
                      } else {
                        router.push({
                          pathname: "/Location/[location]/" + homestayId,
                          query: {
                            location: cityname,
                            checkIn: startDate.getTime() / 1000,
                            checkOut: stopDate.getTime() / 1000,
                            guests: guest,
                          },
                        });
                      }
                    }}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.house_details}>
            {details.ratings.map((rating) => {
              sum_star = sum_star + rating.stars;
            })}

            <div className={styles.house_title}>
              <h1>{details.homestayName}</h1>
              {details.ratings.length != 0 && (
                <div className={styles.rating_icons}>
                  {" "}
                  <h4 className={styles.average_Rating}>
                    {(sum_star / details.ratings.length).toFixed(1)}/5 <AiFillStar color="yellow"/>
                  </h4>
                </div>
              )}
            </div>
            <hr className={styles.line} />
            <div className={styles.gallery}>
              <div className={styles.gallery_carousel}>
                {
                  <Carousel className="carousel">
                    <Carousel.Item interval={1000}>
                      <Image
                        src={details.URLS[0]}
                        height={40}
                        width={60}
                        alt="First slide"
                        layout="responsive"
                        quality={100}
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                      <Image
                        src={details.URLS[1]}
                        height={40}
                        width={60}
                        alt="Second slide"
                        layout="responsive"
                        quality={60}
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      {/* <div className={styles.img_block}> */}
                      <Image
                        src={details.URLS[2]}
                        height={40}
                        width={60}
                        alt="Third slide"
                        layout="responsive"
                        quality={60}
                      />
                      {/* </div> */}
                    </Carousel.Item>
                  </Carousel>
                }
              </div>
              {details.URLS && (
                <>
                  <div className={styles.gallery_img2}>
                    <Image
                      height={40}
                      width={60}
                      layout="responsive"
                      quality={60}
                      alt=""
                      src={details.URLS[0]}
                    />
                  </div>
                  <div className={styles.gallery_img3}>
                    <Image
                      height={40}
                      width={60}
                      layout="responsive"
                      quality={60}
                      src={details.URLS[1]}
                      alt=""
                    />
                  </div>
                  <div className={styles.gallery_img4}>
                    <Image
                      height={40}
                      width={60}
                      layout="responsive"
                      quality={60}
                      alt=""
                      src={details.URLS[2]}
                    />
                  </div>
                  <div className={styles.gallery_img5}>
                    <Image
                      height={40}
                      width={60}
                      layout="responsive"
                      quality={60}
                      alt=""
                      src={details.URLS[1]}
                    />
                  </div>
                </>
              )}
            </div>
            <div className={styles.small_detials}>
              <div className={styles.sub_div}>
                <p>
                  <MdLocationPin size={18} color="rgb(163, 23, 49)" />
                  <span className={styles.text_location}>
                    {details.address} , {details.city} | {details.state}
                  </span>
                </p>

                <p>
                  <MdGroups size={40} />
                  <span className={styles.text_guests}>
                    {" "}
                    Available Capacity&nbsp;&nbsp;&nbsp;
                    {console.log(
                      "these are bookoed guests",
                      details.booked_guests
                    )}
                    {details.Capacity - details.booked_guests > 0 ? (
                      <strong style={{ color: "teal" }}>
                        <b>{details.Capacity - details.booked_guests}</b>
                      </strong>
                    ) : (
                      <Badge colorScheme="red" fontSize="1rem">
                        No Rooms Available
                      </Badge>
                    )}
                  </span>
                </p>
                <p className={styles.description}>{details.desc}</p>
                <p className={styles.price_div}>
                  <h4 className={styles.text_price}>
                    {" "}
                    ₹{details.pricePerNight*guest}{" "}
                    <span className={`${styles.perday}`}>/Day</span>
                  </h4>
                </p>
              </div>

              {details.Capacity - details.booked_guests-guest >=0 && (
                <div className={styles.maindiv}>
                  <div className={styles.selection_div}>
                    <div className={styles.totalprice_div}>
                      <div className={styles.price_heading}>
                        <p> Total Rent</p>
                      </div>
                      <div className={styles.totalrent}>
                        {/* <p className={styles.dates}>
                          {" "}
                          {diffrecnedate} Days
                        </p> */}
                        <p className={styles.total_price1}> ₹ {price}</p>
                        <p className={styles.number_guests}>
                          {" "}
                         (for {diffrecnedate} days)
                        </p>
                      </div>
                    </div>

                    <div className={styles.date_picker_dvi}>
                      <div>
                        <p> CHECK-IN DATE</p>
                        <p>{checkin_date}</p>
                      </div>

                      <div>
                        <p>CHECK-OUT DATE</p>
                        <p>{checkout_date}</p>
                      </div>
                    </div>
                  </div>
                  {checkUserCookies() ? (
                    <div className={styles.reserve_button}>
                      <Button
                        colorScheme="teal"
                        fontSize="1.3rem"
                        variant="solid"
                        size="lg"
                        onClick={booknow}
                        disabled={loading}
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
                            Booking...
                          </>
                        ) : (
                          "BOOK NOW"
                        )}
                        
                      </Button>
                    </div>
                  ) : (
                    <div className={styles.reserve_button}>
                      <Button
                        colorScheme="teal"
                        fontSize="1.3rem"
                        variant="solid"
                        size="lg"
                        onClick={signIn}
                      >
                        SIGN IN TO BOOK NOW
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={styles.station_details}>
              <div className={styles.bus}>
                <h6>Bus-Stand</h6>
                <BiBus size={30} color="rgb(42, 132, 150)" />
                <span>{details.busStationDistance} KM</span>
              </div>
              <div className={styles.railway}>
                <h6>Railway-Station</h6>
                <MdDirectionsRailwayFilled
                  size={30}
                  color="rgb(42, 132, 150)"
                />
                <span>{details.railwayStationDistance} KM</span>
              </div>
              <div className={styles.airport}>
                <h6>Airport</h6>
                <GiCommercialAirplane size={30} color="rgb(42, 132, 150)" />
                <span>{details.airportDistance} KM </span>
              </div>
            </div>
            <hr className={styles.line} />
            <div className={styles.homestay_details}>
              <div className={styles.bedrooms}>
                <h6>Males</h6>
                <BiMale size={45} color="rgb(15, 86, 112)" />
                <span>{details.host.male} </span>
              </div>
              <div className={styles.beds}>
                <h6>Children</h6>
                <FaChild size={30} color="rgb(15, 86, 112)" />
                <span>{details.host.children} </span>
              </div>
              <div className={styles.guests}>
                <h6>Females</h6>
                <BiFemale size={45} color="rgb(15, 86, 112)" />
                <span>{details.host.female} </span>
              </div>
            </div>
            <hr className={styles.line} />

            {details.comments?.length != 0 && (
              <>
                {" "}
                <hr className={styles.line} />{" "}
                <div>
                  <div className={styles.location_div}>
                    <p>
                      <MdLocationCity size={30} />
                      <h4 className={styles.pop_locations}>
                        <strong>Popular Locations Nearby</strong>
                      </h4>
                    </p>
                  </div>
                  {details.popularDestinationsNearby.map((comment) => {
                    return (
                      <div className={styles.popular_container} key={v4()}>
                        <div className={styles.box}>
                          <div className={styles.box_top}>
                            <div className={styles.profile1}>
                              <div className={styles.comment_user1}>
                                <p>
                                  <MdLocationPin
                                    size={25}
                                    color="rgb(163, 23, 49)"
                                  />
                                  <strong>{comment.head}</strong>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className={styles.comments_client}>
                            <p>{comment.body}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>{" "}
                <hr className="line" />
              </>
            )}
            <div className={styles.rules}>
              <h4>Property Rules</h4>
              <ul className={styles.regulations}>
                <li>
                  <strong>Opening Time</strong> {details.Rules.openTime}
                </li>
                {details.Rules &&
                  details.Rules.Rules.map((rule) => {
                    return <li key={v4()}>{rule}</li>;
                  })}
              </ul>
              <div className={styles.badges_div}>
                {details.Rules.alcoholTolerant ? (
                  <Badge colorScheme="whatsapp" fontSize="1rem">
                    ALCOHOL TOLERANT
                  </Badge>
                ) : (
                  <Badge colorScheme="red" fontSize="1rem">
                    ALCOHOL INTOLERANT
                  </Badge>
                )}
                {details.Rules.petAllowance ? (
                  <Badge colorScheme="green" fontSize="1rem">
                    PETS ALLOWED
                  </Badge>
                ) : (
                  <Badge colorScheme="red" fontSize="1rem">
                    PETS NOT ALLOWED
                  </Badge>
                )}
                {details.Rules.nonVeg ? (
                  <Badge colorScheme="green" fontSize="1rem">
                    NON-VEG
                  </Badge>
                ) : (
                  <Badge colorScheme="green" fontSize="1rem">
                    VEGETARIAN
                  </Badge>
                )}
                {details.Rules.coupleFriendly ? (
                  <Badge colorScheme="green" fontSize="1rem">
                    COUPLE FRIENDLY
                  </Badge>
                ) : (
                  <Badge colorScheme="green" fontSize="1rem">
                    BACHELORS ONLY
                  </Badge>
                )}
                {details.Rules.nonVegTolerant ? (
                  <Badge colorScheme="green" fontSize="1rem">
                    NON-VEG TOLERANT
                  </Badge>
                ) : (
                  <Badge colorScheme="red" fontSize="1rem">
                    NON-VEG INTOLERANT
                  </Badge>
                )}
                {details.AC ? (
                  <Badge colorScheme="green" fontSize="1rem">
                    AC
                  </Badge>
                ) : (
                  <Badge colorScheme="red" fontSize="1rem">
                    NON AC
                  </Badge>
                )}
              </div>
            </div>

            <hr className={styles.line} />
            {details.comments?.length != 0 && (
              <>
                {" "}
                <hr className={styles.line} />{" "}
                <div>
                  <div className={styles.rating_div}>
                    <h4 className={styles.user_rating}>
                      <strong>User Ratings & Reviews</strong>
                    </h4>
                    <span>(Based on user ratings and reviews)</span>
                  </div>
                  {details.comments?.map((comment) => {
                    return (
                      <div className={styles.reviews_container} key={v4()}>
                        <div className={styles.box}>
                          <div className={styles.box_top}>
                            <div className={styles.profile}>
                              <div className={styles.comment_user}>
                                <strong>{comment.head}</strong>
                              </div>
                              <div className={styles.name_user}>
                                <strong>
                                 { comment.user}<br/>
                                  {/* {name} */}
                                  <ReactTimeAgo
                                    date={
                                      new Date(
                                        comment.addedOn.seconds * 1000 +
                                          comment.addedOn.nanoseconds / 1000000
                                      )
                                    }
                                    locale="en-US"
                                  />
                                </strong>
                              </div>
                            </div>
                          </div>
                          <div className={styles.comments_client}>
                            <p>{comment.body}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>{" "}
                <hr className="line" />
              </>
            )}

            <div className={styles.add_ratrev}>
              <div className={styles.add_buttons}>
                {checkUserCookies() ? (
                  <Button
                    onClick={onEditOpen}
                    colorScheme="teal"
                    fontSize="1.3rem"
                    variant="outline"
                    size="lg"
                  >
                    ADD RATINGS
                  </Button>
                ) : (
                  <Button
                    onClick={onEditOpen}
                    colorScheme="teal"
                    fontSize="1.3rem"
                    variant="outline"
                    size="lg"
                    isDisabled="false"
                  >
                    ADD RATINGS
                  </Button>
                )}

                {checkUserCookies() ? (
                  <Button
                    onClick={onOpen}
                    colorScheme="teal"
                    variant="outline"
                    fontSize="1.3rem"
                    size="lg"
                  >
                    ADD REVIEWS
                  </Button>
                ) : (
                  <Button
                    onClick={onOpen}
                    colorScheme="teal"
                    variant="outline"
                    fontSize="1.3rem"
                    size="lg"
                    isDisabled="false"
                  >
                    ADD REVIEWS
                  </Button>
                )}
              </div>
              <div>
                <Modal
                  closeOnOverlayClick={false}
                  isOpen={isEditOpen}
                  onClose={onEditClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      <div className={styles.box_top}>
                        <div className={styles.profile}>
                          <div className={styles.username_Review}>
                            <strong>{}</strong>
                          </div>
                        </div>
                      </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <div className={styles.review_stars}>
                        <div className={styles.container}>
                          <div className={styles.stars}>
                            {stars.map((_, index) => {
                              return (
                                <FaStar
                                  key={index}
                                  size={35}
                                  onClick={() => handleClick(index + 1)}
                                  onMouseOver={() => handleMouseOver(index + 1)}
                                  onMouseLeave={handleMouseLeave}
                                  color={
                                    (hoverValue || currentValue) > index
                                      ? colors.orange
                                      : colors.grey
                                  }
                                  className={styles.faltu}
                                />
                              );
                            })}
                            <p className={styles.rating_value}>
                              {currentValue}/5
                            </p>
                          </div>
                        </div>
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={handleRating}>
                        Add Rating
                      </Button>
                      <Button onClick={onEditClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
              <div className={styles.modal_div}>
                <Modal
                  closeOnOverlayClick={false}
                  isOpen={isOpen}
                  onClose={onClose}
                  size="xl"
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      <div className={styles.box_top}>
                        <div className={styles.profile}>
                          <div className={styles.username_Review}>
                            <strong>{name}</strong>
                          </div>
                        </div>
                      </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <div className={styles.container}>
                        <div className={styles.stars}>
                          {stars.map((_, index) => {
                            return (
                              <FaStar
                                key={index}
                                size={35}
                                onClick={() => handleClick(index + 1)}
                                onMouseOver={() => handleMouseOver(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                color={
                                  (hoverValue || currentValue) > index
                                    ? colors.orange
                                    : colors.grey
                                }
                                className={styles.faltu}
                              />
                            );
                          })}
                          <p className={styles.rating_value}>
                            {currentValue}/5
                          </p>
                        </div>
                      </div>

                      <Textarea
                        placeholder="Write your Short Review here"
                        size="lg"
                        marginBottom="1rem"
                        minHeight="1rem"
                        onChange={getDataHead}
                      />
                      <Textarea
                        placeholder="Write your Review here"
                        size="lg"
                        minHeight="6rem"
                        onChange={getDataBody}
                      />
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Add Review
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </div>
          </div>
        // </div>
      ) : (
        <Reviewstars />
      )}
    </>
  );
}

export default HomeStay;
