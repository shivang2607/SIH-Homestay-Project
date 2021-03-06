import React, { useState, useEffect } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css" 
import "../styles/globals.css";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { FirebaseProvider } from "../context/firebaseContext";
// import { ChakraProvider } from "@chakra-ui/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { Container } from "react-bootstrap";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const theme = extendTheme({
  components: {
    Steps,
  },
});

function MyApp({ Component, pageProps }) {
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <FirebaseProvider>
        <Head>
          <title>Grahashram</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/static/logo_transparent.png" />
        </Head>
        <NavBar />
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          <Footer />
        </ChakraProvider>
      </FirebaseProvider>
    );
  }
}

export default MyApp;
