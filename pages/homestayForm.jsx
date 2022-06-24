import FullForm from "../components/formHomestay/fullForm";
import { useFirebase } from "../context/firebaseContext";
import React, { useEffect } from "react";
import Unauthorized from "../components/unauthorized";
import { useRouter } from "next/router";

const HomeStayForm = () => {
  const router = useRouter()
  let body = null;
  const { checkUserCookies, checkHomeInDb } = useFirebase();
  const history = checkHomeInDb();
  if (checkUserCookies()) {
    if (history.length > 0) {
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
