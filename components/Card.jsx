import React from "react";
import styles from "../styles/Card.module.css";
import { useRouter } from "next/router";
import { Badge } from "@chakra-ui/react";
import Image from "next/image";
import { AiFillStar } from 'react-icons/ai'

function Card({
  src,
  title,
  location,
  description,
  price,
  locate,
  docid,
  state,
  city,
  Rules,
  rating,
  length_ratings,
  checkIn,
  checkOut,
  guests,
}) {
  const router = useRouter();
  return (
    <div className={styles.card_div}>
      <a
        href={`/Location/${city}/${docid}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
        target="_blank"
        rel="noreferrer"
      >
        <div className={styles.container}>
          <div className={styles.card_post}>
            <div className={styles.card_post_img}>
              {/* <Image  loader ={styles.card_post_img} src={src} alt="" /> */}
              <Image src={src} alt="" quality={60} layout="fill" />
            </div>
            <div className={styles.card_post_info}>
              <h1 className={styles.card_post_title}>{title}</h1>
              <div className={styles.card_post_location}>
                <span>
                  {location} {city} |{state}
                </span>
              </div>
              <p className={styles.card_post_text}>{description}</p>

              {Rules && (
                <div className={styles.badges_div}>
                  {Rules.petAllowance ? (
                    <Badge colorScheme="green" fontSize="0.87rem">
                      PET ALLOWED
                    </Badge>
                  ) : (
                    <Badge colorScheme="red" fontSize="0.87rem">
                      PET NOT ALLOWED
                    </Badge>
                  )}
                  {Rules.nonVeg ? (
                    <Badge colorScheme="green" fontSize="0.87rem">
                      NON-VEG
                    </Badge>
                  ) : (
                    <Badge colorScheme="green" fontSize="0.87rem">
                      VEGETARIAN
                    </Badge>
                  )}
                  {Rules.coupleFriendly ? (
                    <Badge colorScheme="green" fontSize="0.87rem">
                      COUPLE FRIENDLY
                    </Badge>
                  ) : (
                    <Badge colorScheme="green" fontSize="0.87rem">
                      BACHELORS ONLY
                    </Badge>
                  )}
                </div>
              )}
              <div className={styles.rating_container}>
                <div className={styles.card_post_rating_price}>
                    <div className={styles.friendly}>
                      <h1 className={styles.card_post_price}>
                        ₹ {price} / night
                      </h1>
                    <div className={styles.rating_tab}>
                      {length_ratings != 0 && (
                        <div className={styles.rating_icons}>
                          {rating / length_ratings}/5 &nbsp;<AiFillStar color="yellow"/>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Card;
