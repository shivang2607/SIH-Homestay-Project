import FullForm from "../components/formHomestay/fullForm";
import { useFirebase } from "../context/firebaseContext";
import React, { useEffect, useState } from "react";
import Unauthorized from "../components/unauthorized";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/initFirebase";


const HomeStayForm = () => {
  const router = useRouter()
  let body = <FullForm />;
  const { checkUserCookies, getUserCookies } = useFirebase();
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    const { details } = getUserCookies();
    if (details) {
      getDoc(doc(db, "historyHomestay", details.email)).then((data) => {
        console.log(data.data());
        data.data() && setIsRegistered(true);
      });
    }
  }, [getUserCookies]);
  if (checkUserCookies()) {
    if (isRegistered) {
      router.replace("/")
    } else {
      body = <FullForm />;
    }
  } else {
    body = <Unauthorized />;
  }
  return <div>{body}</div>;
};

export default HomeStayForm;

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
