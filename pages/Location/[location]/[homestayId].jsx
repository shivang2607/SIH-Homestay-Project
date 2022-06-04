import React from 'react'
import { useRouter } from 'next/router'
import HomeStay from '../../../components/homestay';


const HomestayId = () => {


  const router = useRouter();
  const {homestayId} = router.query;

  return (
    <div>
       <HomeStay
                src="https://media.nomadicmatt.com/2018/apartment.jpg"
                title="Himalayan Hideout"
                location="Choj Village | 1.8 km from city centre
                1.9 km from Manikaran Gurudwara"
                description="Superhost with great amenities and a fabolous shopping complex nearby"
                price="70/night"
            />
    </div>
  )
}

export default HomestayId