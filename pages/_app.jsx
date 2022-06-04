import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import styles from '../styles/about.module.css'

const theme = extendTheme({
  components: {
    Steps,
  },
});

function MyApp({ Component, pageProps }) {

  return (
  <ChakraProvider theme={theme}>
  <NavBar/>
  <div className={styles.container}>
   <Component {...pageProps} />
   </div>
   <Footer/>
   </ChakraProvider>
   )
}

export default MyApp
