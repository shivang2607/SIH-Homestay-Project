import FullForm from "../components/formHomestay/fullForm";
import { useFirebase } from "../context/firebaseContext";
import React, { useEffect } from "react";
import Unauthorized from "../components/unauthorized";

const HomeStayForm = () => {
  let body = null;
  const { checkUserCookies, signIn } = useFirebase();
  if(checkUserCookies()){
    body = <FullForm />;
  } else {
    body = (
      <Unauthorized />
    )
  }
  return (
    <div>
      {body}
    </div>
  );
};

export default HomeStayForm;

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
