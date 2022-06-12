<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import '../styles/globals.css'
=======
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import NavBar from '../components/navbar';
import Footer from '../components/footer'; 
>>>>>>> 11fd2a827ec715ef21123ce2e0606e6ee64f575c
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import styles from '../styles/about.module.css'
import { FirebaseProvider } from '../context/firebaseContext';

<<<<<<< HEAD
const config = {
  initialColorMode: 'light',
  // useSystemColorMode: false,
}
=======
>>>>>>> 11fd2a827ec715ef21123ce2e0606e6ee64f575c

const theme = extendTheme({
  config,
  components: {
    Steps,
  },
});

function MyApp({ Component, pageProps }) {
<<<<<<< HEAD
  const [showing, setShowing] = useState(false);

      useEffect(() => {
        setShowing(true);
      }, []);
    
      if (!showing) {
        return null;
      }
    
  if(typeof window === 'undefined'){
    return <></>
  } else {
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
=======

  return (
    <FirebaseProvider>
  <ChakraProvider theme={theme}>
  <NavBar/>
  <div className={styles.container}>
   <Component {...pageProps} />
   </div>
   <Footer/>
   </ChakraProvider>
   </FirebaseProvider>
   )
>>>>>>> 11fd2a827ec715ef21123ce2e0606e6ee64f575c
}

export default MyApp;
