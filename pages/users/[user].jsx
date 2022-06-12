import { useRouter } from "next/router";
import { useFirebase } from "../../context/firebaseContext";
import { Stack, Container, Button } from "react-bootstrap";
import Dashboard from "../../components/accounts/dashboard";

const User = () => {
  const router = useRouter();
  const { user } = router.query;
  let body = null;
  const { checkUserCookies, getUserCookies } = useFirebase();
  if (!checkUserCookies()) {
    router.push("/");
  } else {
    const cookie = getUserCookies();
    const info = cookie.details;
    const tok = info.token.slice(5, 25);
    if (user === tok) {
      body = (
        <Dashboard />
      );
    } else {
      if(!checkUserCookies()){
        router.push("/");
      }
    }
  }
  return (
    <div>
      {body}
    </div>
  );
};

export default User;
