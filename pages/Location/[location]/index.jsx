import React, { useEffect, useState } from 'react'
import Card from '../../../components/Card';
import { useRouter } from 'next/router'
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase/initFirebase";
import { addDoc, setDoc, getDoc, collection, Timestamp, serverTimestamp, query, where, doc, deleteDoc, getDocs, onSnapshot, arrayUnion, updateDoc, runTransaction, arrayRemove, } from "firebase/firestore";
import { useFirebase } from '../../../context/firebaseContext';
import HomeStay from '../../../components/homestay';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'next/link';

// console.log(getHomeHistory)




const Location = ({ homes }) => {

  const { getHomeHistory } = useFirebase()
  const router = useRouter();
  const { location, checkIn, checkOut, guests } = router.query;
  const [cacheHomes, setCacheHomes] = useState({})
  const [homeList, setHomesList] = useState([])
  const [page, setPage] = useState(1)
  const [homeListPage, setHomesListPage] = useState([])
  const [count, setCount] = useState(2)
  const [more, setMore] = useState(true)
  // console.log("finally chal gya yeh ",homeList)
  useEffect(() => {

    const res = async () => {
      const H = await getHomeHistory(JSON.parse(homes), checkIn, checkOut)
      console.log(JSON.parse(homes).length)
      setHomesList(H)
      setHomesListPage(H.slice(0, 2))
      setMore(true)
      H.map(ghar => {
        localStorage.setItem(ghar.docid, JSON.stringify(ghar))
      })
    }
    res()

  }, [])

  console.log("this is the lenght", homeList)


  const fetchMoreData = () => {

    console.log("Home list page", homeListPage)

    if (homeListPage.length >= homeList.length) {
      setMore(false)
      return;
    }
    setHomesListPage(prev => prev.concat(homeList.slice(count, count + 2)));

    setCount(count => count + 2);


  }


  var sum_star = 0;


  return (
    <>

      <div>
        <InfiniteScroll
          dataLength={homeListPage.length}
          next={fetchMoreData}
          hasMore={more}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b> You have seen it all, ab chup chaap book krle koi bhi ghar !!</b>
            </p>
          }

        >


          {homeListPage.map(home => {
            const { booked_guests } = home
            // console.table("This is my Home", home.ratings)
            home.ratings.map(rating => {
              sum_star = sum_star + rating.stars;
            })



            return <Card
            //  <Link href = {`/Location/${location}/${home.docid}`} > <a target="_blank">
                // onClick={() => router.push(`/Location/${location}/${home.docid}`)}
                src={home.URLS[1]}
                locate={location}
                docid={home.docid}
                title={home.homestayName}
                location={home.address}
                city={home.city}
                state={home.state}
                description={home.desc}
                price={home.pricePerNight}
                Rules={home.Rules}
                rating={sum_star}
                length_ratings={home.ratings.length}
              />
            {/* </a></Link> */}
          })}

      </InfiniteScroll>
      {/* <Card
          src="https://media.nomadicmatt.com/2018/apartment.jpg"
          title="1 Bedroom apartment 1"
          location="Durgapura | 4.4 km from Jaipur Airport"
          description="Superhost with great amenities and a fabolous shopping complex nearby"
          price="£70/night"
        />
        <Card
          src="https://media.nomadicmatt.com/2018/apartment.jpg"
          title="1 Bedroom apartment 2"
          location="Durgapura | 4.4 km from Jaipur Airport"
          description="Superhost with great amenities and a fabolous shopping complex nearby"
          price="£70/night"
        /> */}
    </div>

    </>
  )
}

export default Location

export async function getServerSideProps(context) {


  let homes = [];
  const q = query(collection(db, "Homes"), where("city", "==", context.params.location), where("active", "==", true));
  // ,where("activestate","==","true")
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (Doc) => {

    homes.push((Object.assign(Doc.data(), { "docid": Doc.id })))

  });


  homes = JSON.stringify(homes)




  return {
    props: { homes },
  }
}