import "bootstrap/dist/css/bootstrap.min.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css" 
import "../styles/globals.css";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { FirebaseProvider } from "../context/firebaseContext";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";


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
