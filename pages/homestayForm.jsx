import FullForm from "../components/formHomestay/fullForm";
import { useFirebase } from "../context/firebaseContext";

const HomeStayForm = () => {
  let body = null;
  const { checkCookies } = useFirebase();
  if(checkCookies()){
    body = <FullForm />;
  }else{
    body = <></>
  }
  return (
    // <FullForm />
    <>{body}</>
  );
};

export default HomeStayForm;

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
