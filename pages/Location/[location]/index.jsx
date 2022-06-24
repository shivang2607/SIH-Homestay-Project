import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../../../components/Card";
import { db } from "../../../firebase/initFirebase";
import styles from "../../../styles/Card.module.css";

const Location = ({ homes }) => {
  const router = useRouter();
  const { location, checkIn, checkOut, guests } = router.query;
  const [homeList, setHomesList] = useState([]);
  const [homeListPage, setHomesListPage] = useState([]);
  const [count, setCount] = useState(2);
  const [more, setMore] = useState(true);
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

  

  return (
    <>
      {homeList.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10rem",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Image
            layout="intrinsic"
            src="/nohomestayfound.webp"
            alt=""
            width={900}
            height={600}
          ></Image>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                margin: "1rem",
                backgroundColor: "teal",
                color: "white",
                fontSize: "larger",
                fontWeight: "800",
                borderRadius: "15px",
                width: "40vw",
                justifyContent: "center",
                height: "5rem",
                alignItems: "center",
              }}
            >
              {" "}
              No Homestays Found
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.cards}>
            <InfiniteScroll
              dataLength={homeListPage.length}
              next={fetchMoreData}
              hasMore={more}
              loader={<h4>Loading...</h4>}
              endMessage={
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      margin: "1rem",
                      backgroundColor: "teal",
                      color: "white",
                      fontSize: "larger",
                      fontWeight: "800",
                      borderRadius: "15px",
                      width: "40vw",
                      justifyContent: "center",
                      height: "5rem",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    YOU HAVE REACHED THE END!!
                  </div>
                </div>
              }
            >
                {homeListPage.map((home) => {
                  const { booked_guests } = home;
                  console.log("avcbd",home.ratings.length);
                  let sum_star = 0;
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
                      key={home.docid}
                    />
                  );
                })}
            </InfiniteScroll>
          </div>
        </>
      )}
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
