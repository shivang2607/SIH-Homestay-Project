import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { FirebaseProvider } from "../context/firebaseContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <FirebaseProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
      </FirebaseProvider>
    </>
  );
}

export default MyApp;
