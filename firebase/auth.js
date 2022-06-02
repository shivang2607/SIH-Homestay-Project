import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "./initFirebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getUserFromCookie, setUserCookie } from "../cookies/useCookie";
import { mapUserData } from "../user/user";
import { auth } from "./initFirebase";

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
  auth_type: "reauthenticate",
});

export const SignIn = () => {
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
      // try {
      //   const userData = mapUserData(user)
      //   console.log(userData);
      //   setUserCookie(userData);
      // } catch (error) {
      //   console.log(error)
      // }
      const userData = mapUserData(user);
      setUserCookie(userData);
      // window.location = "register";
    }
  });
};
