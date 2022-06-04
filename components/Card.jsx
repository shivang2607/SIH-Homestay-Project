import React from 'react';
import styles from '../styles/Card.module.css'

function Card({ src, title, location, description, price }) {
    return (
        <div>
        <div class={styles.container}>
            <div class={styles.card_post}>
                <div class={styles.card_post_img}>
                    <img src={src} alt="" />
                </div>
                <div class={styles.card_post_info}>
                    <h1 class={styles.card_post_title}>{title}</h1>
                    <div class={styles.card_post_location}>
                        <span>{location}</span>
                    </div>
                    <p class={styles.card_post_text}>

                        Located in the hills above Nice, in a secure gated residence community, this luxurious villa is
                        the perfect place for a family vacation, for up to 10 persons. With 4-5 air-conditioned bedrooms,
                        fully equipped kitchen, HD home theater, large garden, private pool and spa/jacuzzi, terraces,
                        and everything you will need or want for a pleasant stay among family and friends
                    </p>
                    <div className={styles.card_post_rating_price}>
                        <h1 class={styles.card_post_price}>{price}</h1>
                        <div className={styles.rating_tab}>
                            <div className={styles.rating_icons}>
                                4.9/5
                            </div>
                            <div className={styles.rating_content}>
                                <p className={styles.review_answere}>EXCELLENT</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


                   </div>

        </div>
        

    )
}

export default Card
