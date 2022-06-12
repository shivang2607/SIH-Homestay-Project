import { useRouter } from "next/router";
import { useFirebase } from "../../context/firebaseContext";
import { Stack, Container, Button } from "react-bootstrap";

const User = () => {
  const router = useRouter();
  const { user } = router.query;
  let body = null;
  const { checkCookies, getCookies } = useFirebase();
  if (!checkCookies()) {
    router.push("/");
  } else {
    const cookie = getCookies();
    const info = cookie.details;
    const tok = info.token.slice(5, 25);
    if (user === tok) {
      body = (
        <Container>
          <img src={info.photo} alt="img" />
        <Stack spacing={4}>
          <div>
          {info.email} 
          </div>
          <div>
          {info.name}
          </div>
          <button>Edit Info</button>
        </Stack>        
        </Container>
        
      );
    } else {
      window.location.href = "/";
    }
  }
  return (
    <div>
      {body}
    </div>
  );
};

export default User;
