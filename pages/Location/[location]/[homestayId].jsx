import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import HomeStay from '../../../components/homestay';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/initFirebase";



const HomestayId = () => {


  const router = useRouter();
  const { homestayId } = router.query;
  
  const [homeDetails, setHomeDetails] = useState({})

  useEffect(() => {




    if (!localStorage.getItem(`${homestayId}`)) {
      const docRef = doc(db, "Homes", `${homestayId}`);
      getDoc(docRef).then(docSnap => {
        localStorage.setItem(homestayId, JSON.stringify(docSnap.data()))
        setHomeDetails(JSON.parse(localStorage.getItem(homestayId)))
      });



    }
    else {
      setHomeDetails(JSON.parse(localStorage.getItem(homestayId)))
      console.log("This is running, local storage se get kiya h ")

    }
    console.log(homeDetails)
    console.log(homestayId)


    // download()


  }, [])


  return (
    <div>
      {console.log(homeDetails)}
      {homeDetails && <HomeStay
        details={homeDetails}
        homestayId={homestayId}
      />
      }
    </div>
  )
}

export default HomestayId



export async function getServerSideProps(context) {



  return {
    props: {},
  }
}