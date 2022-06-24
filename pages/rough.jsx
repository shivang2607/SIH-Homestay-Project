import React from "react";
import { useFirebase } from "../context/firebaseContext";

const Rough = () => {
  const { sendMail } = useFirebase();
  return (
    <div>
      <button onClick={() => {
        sendMail("akshat","shivangkh26@gmail.com", "shivang", "room booked", "subject", "body");
      }}>
        send mail
      </button>
    </div>
  )
};

export default Rough;
