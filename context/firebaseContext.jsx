import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase/initFirebase";
import Cookies from "js-cookie";
import { v4 } from "uuid";
import nodemailer from "nodemailer";
import { transporter, message } from "../email/emailconfig";
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
import { client } from "../email/emailconfig";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { async } from "@firebase/util";

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
    images
  ) {
    //images upload hori h yahase
    if (!images) return console.log("bhaai images to daaal");
    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(
        storage,
        `images/shivang@awesome.com/${images[i].name + v4()}`
      );
      await uploadBytes(imageRef, images[i]).then(() => {
        console.log("uploaded");
      });
    }

    await addDoc(collection(db, "Homes"), {
      // homestayName: "maatoshri",
      // desc: "",
      homestayName,
      desc,
      comments: [],
      ratings: [],
      host: {
        // name: "shivang",
        // email: "shivang@awesome.com",
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
    // userPhone = "9079377724";
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

  async function cancelBooking(
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
    const historyHomestayRef = doc(db, "historyHomestay", emailOwner);
    const historyUserRef = doc(db, "historyUser", emailUser);
    homeStayId = "wdFQ8rBHcAYaPzelHNb3";
    userName = "Shivang";
    userPhone = "9079377724";
    HomestayName = "maatoshri";
    try {
      const bookHome = await runTransaction(db, async (transaction) => {
        transaction.set(
          historyHomestayRef,
          {
            current: arrayRemove({
              userName,
              userPhone,
              checkInTime: Timestamp.now(),
              checkOutTime: Timestamp.now().toMillis(),
              peopleCount,
              TotalRent,
            }),
            cancelled: arrayUnion({
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
            current: arrayRemove({
              homeStayId,
              HomestayName,
              checkInTime: Timestamp.now(),
              checkOutTime: Timestamp.now().toMillis(),
              Location,
              Address,
              peopleCount,
              TotalRent,
            }),
            cancelled: arrayUnion({
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

        return console.log("cancelled");
      });

      return "Booking Cancelled succesfully";
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  }

  async function getHomeHistory() {
    onAuthStateChanged(auth, async (user) => {
      const history = await getDoc(doc(db, "historyHomestay", user.email));
      return history.data();
    })
  }

  async function getUserHistory() {
    onAuthStateChanged(auth, async (user) => {
      const history = await getDoc(doc(db, "historyUser", user.email));
      return history.data();
    })
  }

  async function sendEmail(emailUser, emailOwner) {
    const message = {
      to: `${tourist.name} <${emailUser}>`,
      from: `${homestay.name} <${emailOwner}>`,
      subject: `${homestay.name} has confirmed your booking`,
    };
    client.send(message, (err, info) => {
      console.log(err || info);
    });
  }

  async function getUserFromCookie() {
    const cookie = Cookies.get("auth");
    if (!cookie) {
      return;
    }
    return JSON.parse(cookie);
  }

  async function setUserCookie(user) {
    Cookies.set("auth", JSON.stringify(user), { expires: 10 });
  }

  const removeUserCookie = () => Cookies.remove("auth");

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
    return { ...authState };
  }

  async function useReadTourist() {
    const [tourist, setTourist] = useState({
      name: "",
      phoneNum: "",
      email: "",
    });
    useEffect(() => {
      const reader = onAuthStateChanged(auth, (user) => {
        if (user) {
          try {
            firebase
              .firestore()
              .collection("Tourist")
              .doc(user.email)
              .get()
              .then((doc) => {
                setTourist({
                  name: doc.data().name,
                  phoneNum: doc.data().phoneNum,
                  email: user.email,
                });
              });
          } catch (error) {
            console.log(error);
          }
        }
      });
      return () => reader();
    }, []);
    return { ...tourist };
  }

  async function useReadHomeStay() {
    const [homeStay, setHomeStay] = useState({
      name: "",
      phoneNum: "",
      address: "",
      price: "",
      description: "",
      image: "",
      email: "",
    });
    useEffect(() => {
      const reader = onAuthStateChanged(auth, (user) => {
        if (user) {
          try {
            firebase
              .firestore()
              .collection("HomeStay")
              .doc(user.email)
              .get()
              .then((doc) => {
                setHomeStay({
                  name: doc.data().name,
                  phoneNum: doc.data().phoneNum,
                  address: doc.data().address,
                  price: doc.data().price,
                  description: doc.data().description,
                  image: doc.data().image,
                  email: user.email,
                });
              });
          } catch (error) {
            console.log(error);
          }
        }
      });
      return () => reader();
    }, []);
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
    auth_type: "reauthenticate",
  });

  async function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // console.log(token, user);
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        const email = err.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(err);
      });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userData = mapUserData(user);
        setUserCookie(userData);
      }
    });
  }
  async function sendMail() {
    transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }

  async function signOut() {
    signOut(auth)
      .then(() => {
        removeUserCookie();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const value = {
    UpdateStateHomestay,
    addHomestay,
    addComment,
    addRating,
    bookHomestay,
    cancelBooking,
    getHomeHistory,
    getUserHistory,
    sendEmail,
    getUserFromCookie,
    setUserCookie,
    removeUserCookie,
    useAuth,
    useReadTourist,
    useReadHomeStay,
    signIn,
    signOut,
    sendMail,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}
