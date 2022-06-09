import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import styles from '../styles/about.module.css'
import { FirebaseProvider } from '../context/firebaseContext';

const config = {
  initialColorMode: 'light',
  // useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  components: {
    Steps,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <ChakraProvider theme={theme}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </FirebaseProvider>
  );
}

export default MyApp;
