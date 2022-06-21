import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase/initFirebase";
import { v4 } from "uuid";
import Cookies from "js-cookie";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
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
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import Router from "next/router";
import emailjs from '@emailjs/browser';

const FirebaseContext = React.createContext();
export function useFirebase() {
  return React.useContext(FirebaseContext);
}

export async function UpdateStateHomestay() {
  const historyUserRef = collection(db, "historyUser");
  const historyHomestayRef = collection(db, "historyHomestay");
  onSnapshot(historyHomestayRef, (snapshot) => {
    snapshot.docs.map((document) => {
      document.data().current.forEach(async (element) => {
        console.log(element);
        if (element.checkOutTime < Timestamp.now().seconds * 1000) {
          await setDoc(
            doc(db, "historyHomestay", document.id),
            {
              current: arrayRemove(element),
              past: arrayUnion(element),
            },
            { merge: true }
          );
        } else {
          console.log("I dont know whats happening");
        }
      });
    });
  });

  onSnapshot(historyUserRef, (snapshot) => {
    snapshot.docs.map((document) => {
      document.data().current.forEach(async (element) => {
        console.table(element.checkOutTime, Timestamp.now().seconds * 1000);
        if (element.checkOutTime < Timestamp.now().seconds * 1000) {
          await setDoc(
            doc(db, "historyUser", document.id),
            {
              current: arrayRemove(element),
              past: arrayUnion(element),
            },
            { merge: true }
          );
        } else {
          console.log("I dont know whats happening");
        }
      });
    });
  });
}

export function FirebaseProvider({ children }) {
  const [loading, setLoading] = useState(false);

  async function addHomestay(
    homestayName,
    desc,
    name,
    email,
    phone,
    male,
    female,
    children,
    petAllowance,
    alcoholTolerant,
    coupleFriendly,
    nonVegTolerant,
    nonVeg,
    Rules,
    openTime,
    AC,
    city,
    state,
    address,
    Capacity,
    pricePerNight,
    popularDestinationsNearby,
    images,
    airportDistance,
    busStationDistance,
    railwayStationDistance
  ) {
    let imageUrls = [];
    //images upload hori h yahase
    if (!images) return console.log("bhaai images to daaal");
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `images/${email}/${images[i].name + v4()}`);
      await uploadBytes(imageRef, images[i]).then(() => {
        console.log("uploaded");
      });

      const url = await getDownloadURL(imageRef);
      imageUrls[i] = url;
    }

    await addDoc(collection(db, "Homes"), {
      // homestayName: "maatoshri",
      // desc: "",
      homestayName,
      URLS: imageUrls,
      desc,
      comments: [],
      active: true,
      ratings: [],
      host: {
        // name: "shivang",
        // email: "hostname@gmail.com",
        // phone: "9079377724",
        // male: 2,
        // female: 1,
        // children: 1,
        name,
        email,
        phone,
        male,
        female,
        children,
      },
      Rules: {
        // petAllowance: true,
        // alcoholTolerant: false,
        // coupleFriendly: true,
        // nonVegTolerant:false,
        // nonVeg:false,
        // Rules: ["abcd", "efgh"],
        // openTime: "6:00 AM to 11:00 PM"
        petAllowance,
        alcoholTolerant,
        coupleFriendly,
        nonVegTolerant,
        nonVeg,
        Rules,
        openTime,
      },
      // AC: true,
      // city: "jaipur",
      // state: "Rajasthan",
      // address: "B-48 model Town, Jagatpura",
      // Capacity: 5,
      // pricePerNight: 120,
      // popularDestinationsNearby: [
      //     {
      //         head: "patrika Gate",
      //         body: "A wonderful place to visit",
      //     },
      //     {
      //         head: "Amer Fort",
      //         body: "A wonderful palace to visit"
      //     }
      // ]
      AC,
      city,
      state,
      address,
      Capacity,
      pricePerNight,
      popularDestinationsNearby,
      registerTime: Timestamp.now(),
      airportDistance,
      busStationDistance,
      railwayStationDistance,
    });
  }

  async function setActiveStatus(docid, state) {
    const activeRef = doc(db, "Homes", docid);

    await updateDoc(activeRef, {
      active: state,
    });
  }

  async function addComment(id = "wdFQ8rBHcAYaPzelHNb3", head, user, body) {
    const commentRef = doc(db, "Homes", id);

    await updateDoc(commentRef, {
      comments: arrayUnion({
        user,
        head,
        body,
        addedOn: Timestamp.now(),
      }),
    });
  }

  async function addRating(id = "wdFQ8rBHcAYaPzelHNb3", stars, user) {
    // console.log((Timestamp.now()).toMillis())
    const ratingRef = doc(db, "Homes", id);
    await updateDoc(ratingRef, {
      ratings: arrayUnion({ user, stars, addedOn: Timestamp.now() }),
    });
  }

  async function bookHomestay(
    emailUser,
    emailOwner,
    homeStayId,
    userName,
    userPhone,
    HomestayName,
    checkInTime,
    checkOutTime,
    peopleCount,
    TotalRent,
    Location,
    Address
  ) {
    const historyUserRef = doc(db, "historyUser", emailUser);
    const historyHomestayRef = doc(db, "historyHomestay", emailOwner);
    // homeStayId = "wdFQ8rBHcAYaPzelHNb3";
    // userName = "Shivang";
    // userPhone = "9259905738";
    // HomestayName = "maatoshri"
    try {
      const bookHome = await runTransaction(db, async (transaction) => {
        // console.log(homedoc.data().accomodation.currentAvailable)

        transaction.set(
          historyHomestayRef,
          {
            current: arrayUnion({
              userName,
              userPhone,
              checkInTime: Timestamp.now(),
              checkOutTime: Timestamp.now().toMillis(),
              peopleCount,
              TotalRent,
            }),
          },
          { merge: true }
        );

        transaction.set(
          historyUserRef,
          {
            current: arrayUnion({
              homeStayId,
              HomestayName,
              checkInTime: Timestamp.now(),
              checkOutTime: Timestamp.now().toMillis(),
              Location,
              Address,
              peopleCount,
              TotalRent,
            }),
          },
          { merge: true }
        );

        return console.log("booked");

        return bookHome;
      });
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  }



  async function updateHomestay(docid, desc,AC, pricePerNight, nonVeg, alcoholTolerant, coupleFriendly, nonVegTolerant, petAllowance,Rules,openTime){
      const docref = doc(db, "Homes", docid);
      await updateDoc(docref, {
        pricePerNight,
  Rules:{
    Rules,
    nonVeg,alcoholTolerant, coupleFriendly, petAllowance, nonVegTolerant, openTime
  },
  desc,AC,
});
  }

  async function cancelBooking(
    bookingId,
    emailUser,
    emailOwner,
    homeStayId,
    userName,
    HomestayName,
    checkInTime,
    checkOutTime,
    peopleCount,
    TotalRent,
    Location,
    Address,
    ownerPhone,
    bookedAt,
  ) {

    const historyHomestayRef = doc(db, "historyHomestay", emailOwner);
    const historyUserRef = doc(db, "historyUser", emailUser);
    console.table(bookingId, emailUser, emailOwner,homeStayId,userName,HomestayName,checkInTime,checkOutTime,peopleCount,TotalRent,Location,Address,ownerPhone,bookedAt)
    try {
      const bookHome = await runTransaction(db, async (transaction) => {
        transaction.set(
          historyHomestayRef,
          {
            current: arrayRemove({
             TotalRent,
             bookingId,
             checkInTime,
             checkOutTime,
             emailUser,
             peopleCount,
             userName,
             bookedAt,
            }),
            cancelled: arrayUnion({
              TotalRent,
              bookingId,
              checkInTime,
              checkOutTime,
              emailUser,
              peopleCount,
              userName,
              cancelledAt:Timestamp.now(),
            }),
          },
          { merge: true }
        );

        transaction.set(
          historyUserRef,
          {
            current: arrayRemove({
              Address,
              HomestayName,
              Location,
              TotalRent,
              bookedAt,
              bookingId,
              checkInTime,
              checkOutTime,
              emailOwner,
              homeStayId,
              ownerPhone,
              peopleCount,
              
            }),
            cancelled: arrayUnion({
              Address,
              HomestayName,
              Location,
              TotalRent,
              bookingId,
              checkInTime,
              checkOutTime,
              emailOwner,
              homeStayId,
              ownerPhone,
              peopleCount,
             cancelledAt:Timestamp.now(),
            }),
          },
          { merge: true }
        );

        return console.log("cancelled");
      });

      return "Booking Cancelled succesfully";
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  }

  async function getHomeHistory() {
    const user = getCookies();
    const history = await getDoc(
      doc(db, "historyHomestay", user.details.email)
    );
    return history.data();
  }

  async function getUserHistory() {
    const user = getCookies();
    const history = await getDoc(doc(db, "historyUser", user.details.email));
    return history.data();
  }

  function useAuth() {
    const [authState, setAuthState] = useState({
      isSignedIn: false,
      user: null,
      pending: true,
    });

    useEffect(() => {
      const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthState({ isSignedIn: true, user, pending: false });
        }
      });
      return () => unregisterAuthObserver();
    }, []);
    return { auth, ...authState };
  }

  async function signIn() {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
        auth_type: "reauthenticate",
      });
      setPersistence(auth, inMemoryPersistence);
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("result: ", result);
      Cookies.set(
        "user",
        JSON.stringify({
          token: token,
          email: result.user.email,
          name: result.user.displayName,
          photo: result.user.photoURL,
          number: result.user.phoneNumber,
        }),
        { expires: 7 }
      );
      window.location = window.location.pathname;
    } catch (error) {
      console.log(error.code, error.message);
    }
  }

  async function sendMail(homestay_name, to_email,to_name, message, subject, greetings){
    var template_params = {
      homestay_name:homestay_name,
      to_email:to_email,
      message:message,
      to_name:to_name,
      subject:subject,
      greetings:greetings
    }
    emailjs.send('service_mx4lksw', "template_60qfdkn", template_params, 'JSUCvQi3lkcl1ScoG').then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
   }, function(error) {
      console.log('FAILED...', error);
   });
  }

  function checkUserCookies() {
    const user = Cookies.get("user");
    if (user) {
      return true;
    }
    return false;
  }
  function getUserCookies() {
    const user = Cookies.get("user");
    if (user) {
      const details = JSON.parse(user);
      return { details };
    }
    return false;
  }

  const value = {
    UpdateStateHomestay,
    addHomestay,
    setActiveStatus,
    addComment,
    addRating,
    bookHomestay,
    updateHomestay,
    cancelBooking,
    getHomeHistory,
    getUserHistory, 
    useAuth,
    signIn,
    sendMail,
    checkUserCookies,
    getUserCookies,

  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}
