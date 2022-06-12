import FullForm from "../components/formHomestay/fullForm";
import { useFirebase } from "../context/firebaseContext";
import React, { useEffect } from "react";

const HomeStayForm = () => {
  let body = null;
  const { checkCookies, signIn } = useFirebase();
  if(checkCookies()){
    body = <FullForm />;
  } else {
    body = (
      <div>
        <h1>You need to log in to register your home</h1>
        <button onClick={signIn}>Log In</button>
      </div>
    )
  }
  return (
    // <FullForm />
    <>{body}</>
  );
};

export default HomeStayForm;

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
