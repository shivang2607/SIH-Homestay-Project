import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { MdLocationPin, MdDirectionsRailwayFilled, MdGroups } from 'react-icons/md';
import { FaChild } from 'react-icons/fa';
import { GiCommercialAirplane } from 'react-icons/gi';
import { BiBus, BiMale, BiFemale } from 'react-icons/bi';
import styles from '../styles/homestay.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from '@chakra-ui/react'
import { useState } from 'react';
import  Reviewstars from "../components/star";
import { Badge } from '@chakra-ui/react';
import newPlaces from '../components/items'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Container, Row, Col } from "react-bootstrap";
// import styles from "../styles/stars.module.css"
import ReactTimeAgo from 'react-time-ago'

import { FaStar } from "react-icons/fa";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { useFirebase } from '../context/firebaseContext';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
// 


const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};


function HomeStay({ details, homestayId }) {

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [body, setBody] = useState("")
    const [head, setHead] = useState("")
    const [guest, setGuest] = useState(0)
    // const [cityname, setCityName] = useState("")
    // const [disname, setDisName] = useState("")
    // const [statename, setStateName] = useState("")
    const { addComment, addRating, useAuth } = useFirebase();
    const { user } = useAuth();
    const [stopDate, setStopDate] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date())
    const [show, setShow] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    

    const stars = Array(5).fill(0)

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }



    function getDataBody(val) {
        setBody(val.target.value)


    }
    function getGuests(val) {
        setGuest(val.target.value)
        
    }

    function getDataHead(val) {
        setHead(val.target.value)

    }

    function handleRating(e) {
        e.preventDefault();
        addRating(homestayId, currentValue, user);
        onEditClose();

    }




    function handleSubmit(e) {
        e.preventDefault();
        addComment(homestayId, head, user, body)
        onClose();

    }
    
    function booknow(e) {
        e.preventDefault();
       //     emailUser, 
      // userPhone,
   
    var diffrecnedate=new Date(stopDate - startDate).getDate() - 1
    var price= diffrecnedate*details.pricePerNigh;
    console.log("the owner eamil",details.host.email)
    console.log("the details.docid",details.docid)
    console.log("the user",user)
    console.log("oxer phone",details.host.phone)
    
    console.log("neame homestaya",details.homestayName)

    console.log("the ostart date",startDate)
    console.log("the stop date",stopDate)
    console.log("the diffrence date",diffrecnedate)



        // bookHomestay(user.email,details.host.email,details.docid,user.name,user.phone,details.host.phone,details.homestayName,startDate,stopDate,guest,price,details.ctiy,details.address)

    }


    
    var sum_star = 0;
    return (
        <> {details.host &&
            <div className={styles.house_details}>
                {
                 details.ratings.map(rating =>
                    {
                    sum_star = sum_star + rating.stars;
                   })
                }
                {/* {console.log(sum_star / details.ratings.length)} */}
                {/* {console.log(average_rating)} */}
                <Reviewstars></Reviewstars>
                <div className={styles.house_title}>
                    <h1>{details.homestayName}</h1>
                    {details.ratings.length !=0 &&<div className={styles.rating_icons}> <h4 className={styles.average_Rating}>{sum_star / details.ratings.length}/5</h4></div>}
                    
                </div>
                <hr className={styles.line} />
                <div className={styles.gallery}>
                    <div className={styles.gallery_carousel}>
                        {<Carousel className='carousel'>
                            <Carousel.Item interval={1000}>

                                <img
                                    className="img_block"
                                    src={details.URLS[0]}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <img
                                    className="img_block"
                                    src={details.URLS[1]}
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="img_block"
                                    src={details.URLS[2]}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>}


                    </div>
                    {details.URLS && <><div className={styles.gallery_img2}><img src={details.URLS[0]}></img></div>
                        <div className={styles.gallery_img3}><img src={details.URLS[1]}></img></div>
                        <div className={styles.gallery_img4}><img src={details.URLS[2]}></img></div>
                        <div className={styles.gallery_img5}><img src={details.URLS[1]}></img></div></>}

                </div>
                <div className={styles.small_detials}>
                    <div className={styles.sub_div}>
                        <p><MdLocationPin size={18} color="rgb(163, 23, 49)" /><span className={styles.text_location}>{details.address} , {details.city} | {details.state}</span></p>

                        <p><MdGroups size={40} /><span className={styles.text_guests}> Available Capacity&nbsp;&nbsp;&nbsp; 
                        {details.Capacity - details.booked_guests !=0 ?<strong style={{ color: "teal" }}>
                            <b>{details.Capacity - details.booked_guests}</b></strong> : 
                            <Badge colorScheme='red' fontSize='1rem'>No Rooms Available</Badge>}
                            </span>
                            </p>
                        <p className={styles.description}>
                            {details.desc}
                        </p>
                        <p className={styles.price_div}><h4 className={styles.text_price}> ₹{details.pricePerNight} <span className={`${styles.perday}`}>/Day</span></h4></p>

                    </div>


                    {details.Capacity - details.booked_guests != 0 && <div className={styles.maindiv}>
                        
                        <div className={styles.selection_div}>
                            <div>
                                <input placeholder="Enter The Guests" className={`${styles.guestscss}`} type="number" min="1" onChange={getGuests} />
                            </div>

                            <div className={styles.date_picker_dvi}>
                                <DatePicker placeholderText="Enter Check in Date" className={`${styles.datecss}  `} selected={startDate} onChange={date => setStartDate(date)}

                                    dateFormat='dd/MM/yyyy'
                                    minDate={new Date()}
                                />

                                <DatePicker placeholderText="Enter Check Out Date" className={`${styles.datecss}`} selected={stopDate} onChange={date => setStopDate(date)}

                                    dateFormat='dd/MM/yyyy'
                                    minDate={startDate}
                                />
                            </div>

                        </div>
                        <div className={styles.reserve_button}>
                            <Button colorScheme='teal' fontSize='1.3rem' variant='solid' size='lg' onClick={booknow}> BOOK NOW </Button>
                        </div>
                    </div>}
                </div>
                <div className={styles.station_details}>
                    <div className={styles.bus} >
                        <h6>Bus-Stand</h6>
                        <BiBus size={30} color="rgb(42, 132, 150)" /><span>{details.busStationDistance} KM</span>
                    </div>
                    <div className={styles.railway}>
                        <h6>Railway-Station</h6>
                        <MdDirectionsRailwayFilled size={30} color="rgb(42, 132, 150)" /><span>{details.railwayStationDistance} KM</span>
                    </div>
                    <div className={styles.airport}>
                        <h6>Airport</h6>
                        <GiCommercialAirplane size={30} color="rgb(42, 132, 150)" /><span>{details.airportDistance} KM </span>
                    </div>
                </div>
                <hr className={styles.line} />
                <div className={styles.homestay_details}>
                    <div className={styles.bedrooms} >
                        <h6>Males</h6>
                        <BiMale size={45} color="rgb(15, 86, 112)" /><span>{details.host.male} </span>
                    </div>
                    <div className={styles.beds}>
                        <h6>Children</h6>
                        <FaChild size={30} color="rgb(15, 86, 112)" /><span>{details.host.children} </span>
                    </div>
                    <div className={styles.guests}>
                        <h6>Females</h6>
                        <BiFemale size={45} color="rgb(15, 86, 112)" /><span>{details.host.female} </span>
                    </div>
                </div>
                <hr className={styles.line} />
                <div className={styles.rules}>
                    <h4>Property Rules</h4>
                    <ul className={styles.regulations}>
                        <li><strong>Opening Time</strong> {details.Rules.openTime}</li>
                        {details.Rules && details.Rules.Rules.map(rule => {
                            return <li>{rule}</li>
                        })}
                    </ul>
                    <div className={styles.badges_div}>
                        {details.Rules.alcoholTolerant ? <Badge colorScheme="whatsapp" fontSize='1rem'>ALCOHOL TOLERANT</Badge> : <Badge colorScheme='red' fontSize='1rem'>
                            ALCOHOL INTOLERANT
                        </Badge>}
                        {details.Rules.petAllowance ? <Badge colorScheme='green' fontSize='1rem'>
                            PETS ALLOWED
                        </Badge> : <Badge colorScheme='red' fontSize='1rem'>PETS NOT ALLOWED</Badge>}
                        {details.Rules.nonVeg ? <Badge colorScheme='green' fontSize='1rem'>
                            NON-VEG
                        </Badge> : <Badge colorScheme='green' fontSize='1rem'>
                            VEGETARIAN
                        </Badge>}
                        {details.Rules.coupleFriendly ? <Badge colorScheme='green' fontSize='1rem'>
                            COUPLE FRIENDLY
                        </Badge> : <Badge colorScheme='green' fontSize='1rem'>BACHELORS ONLY</Badge>}
                        {details.Rules.nonVegTolerant ? <Badge colorScheme='green' fontSize='1rem'>
                            NON-VEG TOLERANT
                        </Badge> : <Badge colorScheme='red' fontSize='1rem'>NON-VEG INTOLERANT</Badge>}
                        {details.AC ? <Badge colorScheme='green' fontSize='1rem'>
                            AC
                        </Badge> : <Badge colorScheme='red' fontSize='1rem'>
                            NON AC
                        </Badge>}
                    </div>
                </div>




                <hr className={styles.line} />
                {details.comments.length != 0 && <>  <hr className={styles.line} /> <div>
                    <div className={styles.rating_div}>
                        <h4 className={styles.user_rating}><strong>User Ratings & Reviews</strong></h4><span>(Based on user ratings and reviews)</span>
                    </div>
                    {details.comments.map(comment => {
                        // console.log("these commet", comment)
                        return <div className={styles.reviews_container}>
                            <div className={styles.box}>
                                <div className={styles.box_top}>
                                    <div className={styles.profile}>


                                        <div className={styles.comment_user}>
                                            <strong>{comment.head}</strong>
                                        </div>
                                        <div className={styles.name_user}>
                                            <strong>{/*comment.user.name*/}DIKSHA SINGLA .. <ReactTimeAgo date={new Date(comment.addedOn.seconds * 1000 + comment.addedOn.nanoseconds / 1000000,)} locale="en-US"/> 
                                            
                                           </strong>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.comments_client}>
                                    <p>{comment.body}

                                    </p>

                                </div>

                            </div>
                        </div>
                    })}
                </div>  <hr className='line' /></>}

                <div className={styles.add_ratrev}>
                    <div className={styles.add_buttons}>
                        {/* {user ? <Button onClick={onEditOpen} colorScheme='teal' fontSize='1.3rem' variant='outline' size='lg'>
                            ADD RATINGS
                        </Button> : <Button onClick={onEditOpen} colorScheme='teal' fontSize='1.3rem' variant='outline' size='lg' isDisabled='false'>
                            ADD RATINGS
                        </Button>}

                        {user ?<Button onClick={onOpen} colorScheme='teal' variant='outline' fontSize='1.3rem' size='lg'   >
                            ADD REVIEWS
                        </Button> : <Button onClick={onOpen} colorScheme='teal' variant='outline' fontSize='1.3rem' size='lg' isDisabled='false'  >
                            ADD REVIEWS
                        </Button>} */}

                        <Button onClick={onEditOpen} colorScheme='teal' fontSize='1.3rem' variant='outline' size='lg'>
                            ADD RATINGS
                        </Button>
                        <Button onClick={onOpen} colorScheme='teal' variant='outline' fontSize='1.3rem' size='lg'   >
                            ADD REVIEWS
                        </Button>

                    </div>
                    <div>
                        <Modal closeOnOverlayClick={false} isOpen={isEditOpen} onClose={onEditClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>
                                    <div className={styles.box_top}>
                                        <div className={styles.profile}>
                                            <div className={styles.username_Review}>
                                                <strong>Diksha Singla{/*user.name*/}</strong>
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
                                                            color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                                            className={styles.faltu}
                                                        />

                                                    )
                                                })}
                                                <p className={styles.rating_value}>{currentValue}/5</p>
                                            </div>

                                        </div>

                                    </div>

                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={handleRating}>
                                        Add Rating
                                    </Button>
                                    <Button onClick={onEditClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>

                    </div>
                    <div className={styles.modal_div}>
                        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='xl'>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>
                                    <div className={styles.box_top}>
                                        <div className={styles.profile}>
                                            <div className={styles.username_Review}>
                                                <strong>Diksha Singla{/*user.name*/}</strong>
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
                                                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                                        className={styles.faltu}
                                                    />

                                                )
                                            })}
                                            <p className={styles.rating_value}>{currentValue}/5</p>
                                        </div>

                                    </div>

                                    <Textarea placeholder='Write your Short Review here' size='lg' marginBottom='1rem' minHeight='1rem' onChange={getDataHead} />
                                    <Textarea placeholder='Write your Review here' size='lg' minHeight='6rem' onChange={getDataBody} />
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                                        Add Review
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default HomeStay
