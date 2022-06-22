import React, { useEffect, useState } from "react";
import Card from "../../../components/Card";
import { useRouter } from "next/router";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase/initFirebase";
import {
  addDoc,
  setDoc,
  getDoc,
  collection,
  Timestamp,
  serverTimestamp,
  query,
  where,
  doc,
  deleteDoc,
  getDocs,
  onSnapshot,
  arrayUnion,
  updateDoc,
  runTransaction,
  arrayRemove,
} from "firebase/firestore";
import { useFirebase } from "../../../context/firebaseContext";
import HomeStay from "../../../components/homestay";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";

const Location = ({ homes }) => {
  const router = useRouter();
  const { location, checkIn, checkOut, guests } = router.query;
  const [cacheHomes, setCacheHomes] = useState({});
  const [homeList, setHomesList] = useState([]);
  const [page, setPage] = useState(1);
  const [homeListPage, setHomesListPage] = useState([]);
  const [count, setCount] = useState(2);
  const [more, setMore] = useState(true);
  // console.log("finally chal gya yeh ",homeList)
  useEffect(() => {
    const res = async () => {
      setHomesList(JSON.parse(homes));
      setHomesListPage(JSON.parse(homes).slice(0, 2));
      setMore(true);
    };
    res();
  }, []);

  console.log("this is the lenght", homeList);

  const fetchMoreData = () => {
    console.log("Home list page", homeListPage);

    if (homeListPage.length >= homeList.length) {
      setMore(false);
      return;
    }
    setHomesListPage((prev) => prev.concat(homeList.slice(count, count + 2)));

    setCount((count) => count + 2);
  };

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
            <p style={{ textAlign: "center" }}>
              <b>
                {" "}
                You have seen it all, ab chup chaap book krle koi bhi ghar !!
              </b>
            </p>
          }
        >
          {homeListPage.map((home) => {
            const { booked_guests } = home;
            // console.table("This is my Home", home.ratings)
            home.ratings.map((rating) => {
              sum_star = sum_star + rating.stars;
            });

            return (
              <Card
                src={home.URLS[1]}
                checkIn={checkIn}
                checkOut={checkOut}
                guests={guests}
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
            );
            {
            
            }
          })}
        </InfiniteScroll>
        
      </div>
    </>
  );
};

export default Location;

export async function getServerSideProps(context) {
  let homes = [];
  const q = query(
    collection(db, "Homes"),
    where("city", "==", context.params.location),
    where("active", "==", true)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (Doc) => {
    homes.push(Object.assign(Doc.data(), { docid: Doc.id }));
  });

  homes = JSON.stringify(homes);

  return {
    props: { homes },
  };
}
