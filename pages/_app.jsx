import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import NavBar from '../components/navbar';
import Footer from '../components/footer';


function MyApp({ Component, pageProps }) {

  return <>
  <NavBar/>
  
   <Component {...pageProps} />
   <Footer/>
   </>
}

export default MyApp
