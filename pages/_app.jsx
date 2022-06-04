import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { FirebaseProvider } from "../context/firebaseContext";
import { ChakraProvider } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Steps,
  },
});


function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <ChakraProvider theme={theme} >
      <NavBar />
      <Component {...pageProps} />
      <Footer />
      </ChakraProvider>
      </FirebaseProvider>
  );
}

export default MyApp;
