import styled from "styled-components";
import Head from "next/head";
import { Button } from "@mui/material";
import { auth, signInWithPopup, provider } from "../firebase";

function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        const user = data.user;
        console.log("user", user);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo src="https://cdn2.downdetector.com/static/uploads/logo/whatsapp-messenger.png" />
        <Button onClick={signIn} variant="outlined" color="success">
          Entrar com Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  background-color: whitesmoke;
  height: 100vh;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 50px;
  border-radius: 5px;
  box-shadow: 0px 1px 14px -4px rgba(0, 0, 0, 0.5);
`;

const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 50px;
`;
