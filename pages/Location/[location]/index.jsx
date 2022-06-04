import React from 'react'
import Card from '../../../components/Card';
import { useRouter } from 'next/router'



const Location = () => {

  const router = useRouter();
  const { location } = router.query;

  return (
    <>
      
        <div>

          <Card
            src="https://media.nomadicmatt.com/2018/apartment.jpg"
            title="1 Bedroom apartment"
            location="Durgapura | 4.4 km from Jaipur Airport"
            description="Superhost with great amenities and a fabolous shopping complex nearby"
            price="£70/night"
          />
          <Card
                src="https://media.nomadicmatt.com/2018/apartment.jpg"
                title="1 Bedroom apartment"
                location="Durgapura | 4.4 km from Jaipur Airport"
                description="Superhost with great amenities and a fabolous shopping complex nearby"
                price="£70/night"
            />
        </div>
      
    </>
  )
}

export default Location