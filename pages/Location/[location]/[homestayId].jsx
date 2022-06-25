import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import HomeStay from "../../../components/homestay";
import { db } from "../../../firebase/initFirebase";
import {doc, getDoc} from "firebase/firestore";

const HomestayId = ({ data }) => {
  const router = useRouter();
  const { homestayId } = router.query;

  const [homeDetails, setHomeDetails] = useState();

  useEffect(() => {
    setHomeDetails(JSON.parse(data));

  }, []);

  return (
    <div>
      {homeDetails && (
        <HomeStay details={homeDetails} homestayId={homestayId} />
      )}
    </div>
  );
};

export default HomestayId;

export async function getServerSideProps(context) {
  const { homestayId, checkIn, checkOut } = context.query;

  const docRef = doc(db, "Homes", homestayId);
  const docSnap = await getDoc(docRef);
  let data;
  if (docSnap.exists()) {
    data = docSnap.data();
  } else {
    console.log("No such document!");
  }

  const history = await getDoc(doc(db, "historyHomestay", data.host.email));
  const his = history.data();
  let booked_guests = 0;
  if (history.exists()) {
    const current_bookings = his.current;
    current_bookings.map((booking) => {
      console.log(booking);
      if (
        (booking.checkInTime.seconds >= checkIn &&
          booking.checkInTime.seconds <= checkOut) ||
        (booking.checkOutTime.seconds <= checkOut &&
          booking.checkOutTime.seconds >= checkIn) ||
        (booking.checkOutTime.seconds >= checkOut &&
          booking.checkInTime.seconds <= checkIn)
      ) {
        booked_guests += booking.peopleCount;
      }
    });
  }
  console.log(booked_guests);
  data = { ...data, booked_guests };

  data = JSON.stringify(data);
  return {
    props: { data },
  };
}
