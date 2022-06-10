import { useRouter } from "next/router";
import { useFirebase } from "../../context/firebaseContext";

const User = () => {
  const router = useRouter();
  const { user } = router.query;
  let body = null;
  const { checkCookies, getCookies } = useFirebase();
  if (!checkCookies()) {
    body = <div>Please login to view this page</div>;
  } else {
    const cookie = getCookies();
    const info = cookie.details;
    const tok = info.token.slice(5, 15);
    if (user === tok) {
      body = (
        <div>
          <img src={info.photo} alt="img" />
          {info.email} {info.name}
        </div>
      );
    }
  }
  return (
    <div>
      {body}
    </div>
  );
};

export default User;
