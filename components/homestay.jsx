import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { MdBedroomParent,MdNightShelter,MdGroups,MdLocationPin } from 'react-icons/md';
import {BiRupee } from 'react-icons/bi';
import styles from '../styles/homestay.module.css'


function HomeStay({ src, title, location, description, price }) {
    return (
        <div className={styles.house_details}>
            <div className={styles.house_title}>
                <h1>{title}</h1>
            </div>
            <div className={styles.gallery}>
                <div className={styles.gallery_carousel}>
                    <Carousel className='carousel'>
                        <Carousel.Item interval={1000}>
                            <img
                                className="img_block"
                                src={src}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={500}>
                            <img
                                className="img_block"
                                src={src}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="img_block"
                                src={src}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>


                </div>
                <div className={styles.gallery_img2}><img src={src}></img></div>
                <div className={styles.gallery_img3}><img src={src}></img></div>
                <div className={styles.gallery_img4}><img src={src}></img></div>
                <div className={styles.gallery_img5}><img src={src}></img></div>

            </div>
            <div className={styles.small_detials}>
                <h2> Tiny home hosted by Jeremy & Erle</h2>
                <p><MdLocationPin size={20}/> {location}</p>
                <p className={styles.price_div}><BiRupee size={30} /><span className='price'>{price}</span></p>
            </div>
            <div className={styles.homestay_details}>
                <div className={styles.bedrooms} >
                    <h6>Bedrooms</h6>
                    <MdNightShelter size={45} color="rgb(50, 100, 168)" /><span>2 </span>
                </div>
                <div className={styles.beds}>
                    <h6>Beds</h6>
                    <MdBedroomParent size={45} color="rgb(50, 100, 168)" /><span>2 </span>
                </div>
                <div className={styles.guests}>
                    <h6>Guests</h6>
                    <MdGroups size={45} color= "rgb(50, 100, 168)" /><span>2 </span>
                </div>
            </div>

            <div className={styles.rules}>
                <h4>Property Rules</h4>
                <h6 className={styles.check_in_time}>Check-in: <strong>12 PM</strong> Check-out: <strong>10 AM</strong></h6>
                <ul className={styles.regulations}>
                    <li>Guests with fever are not allowed</li>
                    <li>Property staff is trained on hygiene guidelines</li>
                    <li>Passport, Aadhar, Driving License and Govt. ID are accepted as ID proof(s)</li>
                    <li>Office ID is not accepted as ID proof(s)</li>
                    <li>Guests from containment zones are not allowed</li>
                </ul>
            </div>
            <hr className={styles.line} />
            <div className={styles.rating_div}>
                <h4 className={styles.user_rating}><strong>User Ratings & Reviews</strong></h4><span>(Based on user ratings sourced from other platforms)</span>
                <div className={styles.rating_tab}>
                    <div className={styles.rating_icons}>
                        4.9/5
                    </div>
                    <div className={styles.rating_content}>
                        <p className={styles.review_answere}>EXCELLENT</p>
                    </div>
                </div>

            </div>
            <div className={styles.reviews_container}>
                <div className={styles.box}>
                    <div className={styles.box_top}>
                        <div className={styles.profile}>
                            <div className={styles.profile_img}>
                                <img src={src} />
                            </div>
                            <div className={styles.name_user}>
                                <strong>Diksha Singla</strong>
                            </div>
                        </div>
                        <div className={styles.reviews}>
                            <p>4.9/5</p>
                        </div>
                    </div>
                    <div className={styles.comments_client}>
                        <p>
                            The house was beautiful and the location was superb. The heating doesn’t reach the master bedroom end of the house so this area was very cold. I believe it was due to a late arrival of the fire wood, but there was none split and the bbq and clothes dryer did not work.
                            Aside from these couple things, it was a great weekend and we had a lovely stay.
                        </p>

                    </div>

                </div>

                <div className={styles.box}>
                    <div className={styles.box_top}>
                        <div className={styles.profile}>
                            <div className={styles.profile_img}>
                                <img src={src} />
                            </div>
                            <div className={styles.name_user}>
                                <strong>Diksha Singla</strong>
                            </div>
                        </div>
                        <div className={styles.reviews}>
                            <p>4.9/5</p>
                        </div>
                    </div>
                    <div className={styles.comments_client}>
                        <p>
                            The house was beautiful and the location was superb. The heating doesn’t reach the master bedroom end of the house so this area was very cold. I believe it was due to a late arrival of the fire wood, but there was none split and the bbq and clothes dryer did not work.
                            Aside from these couple things, it was a great weekend and we had a lovely stay.
                        </p>

                    </div>

                </div>
                <div className={styles.box}>
                    <div className={styles.box_top}>
                        <div className={styles.profile}>
                            <div className={styles.profile_img}>
                                <img src={src} />
                            </div>
                            <div className={styles.name_user}>
                                <strong>Diksha Singla</strong>
                            </div>
                        </div>
                        <div className={styles.reviews}>
                            <p>4.9/5</p>
                        </div>
                    </div>
                    <div className={styles.comments_client}>
                        <p>
                            The house was beautiful and the location was superb. The heating doesn’t reach the master bedroom end of the house so this area was very cold. I believe it was due to a late arrival of the fire wood, but there was none split and the bbq and clothes dryer did not work.
                            Aside from these couple things, it was a great weekend and we had a lovely stay.
                        </p>

                    </div>

                </div>
                <div className={styles.box}>
                    <div className={styles.box_top}>
                        <div className={styles.profile}>
                            <div className={styles.profile_img}>
                                <img src={src} />
                            </div>
                            <div className={styles.name_user}>
                                <strong>Diksha Singla</strong>
                            </div>
                        </div>
                        <div className={styles.reviews}>
                            <p>4.9/5</p>
                        </div>
                    </div>
                    <div className={styles.comments_client}>
                        <p>
                            The house was beautiful and the location was superb. The heating doesn’t reach the master bedroom end of the house so this area was very cold. I believe it was due to a late arrival of the fire wood, but there was none split and the bbq and clothes dryer did not work.
                            Aside from these couple things, it was a great weekend and we had a lovely stay.
                        </p>

                    </div>

                </div>
                
                <hr className='line' />
            </div>
        </div>

           )
}

export default HomeStay
