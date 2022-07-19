import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import * as EmailValidator from "email-validator";
import { collection, setDoc, doc } from "firebase/firestore";
import db, { auth } from "../firebase";
import { useState } from "react";

function AddNewChat({ open, handleClose }) {
  const [user] = useAuthState(auth);
  const chatsRef = collection(db, "chats");
  const [email, setEmail] = useState();
  const [error, setError] = useState(null);

  const getChatId = (emailA, emailB) => {
    const a = window.btoa(emailA);
    const b = window.btoa(emailB);

    if (emailA < emailB) {
      return a + b;
    }
    return b + a;
  };

  const createChat = (input) => {
    if (!input) {
      setError('Preencha o campo "Email"!');
      return null;
    }

    if (input === user.email) {
      setError("O email não pode ser igual ao seu!");
      return null;
    }

    if (!EmailValidator.validate(input)) {
      setError("Por favor, preencha um email válido!");
      return null;
    }

    setDoc(doc(chatsRef, getChatId(user.email, input)), {
      users: [user.email, input],
    });
    handleClose();
  };

  return (
    <Modal open={open}>
      <Container
        onSubmit={(e) => {
          e.preventDefault();
          createChat(email);
        }}
      >
        <Header>
          <HeaderTitle>Conversar com...</HeaderTitle>
          <CloseModal
            onClick={() => {
              setError(null);
              handleClose();
            }}
          >
            <CloseIcon />
          </CloseModal>
        </Header>
        <ModalBody>
          <Body>
            <BodyText>
              Entre com o email da pessoa que deseja conversar:
            </BodyText>
            <EmailInput
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <ErrorMsg>{error}</ErrorMsg>
          </Body>
          <Footer>
            <Button
              onClick={() => {
                setError(null);
                handleClose();
              }}
              size="small"
              color="success"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => createChat(email)}
              size="small"
              color="success"
              variant="contained"
            >
              Salvar
            </Button>
          </Footer>
        </ModalBody>
      </Container>
    </Modal>
  );
}

export default AddNewChat;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #2e7d32;
  color: white;
  align-items: center;
  padding: 0 5px;
`;
const HeaderTitle = styled.span`
  text-transform: uppercase;
`;
const Container = styled.form`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  height: 200px;
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const CloseModal = styled.div`
  cursor: pointer;
`;
const ModalBody = styled.div`
  padding: 20px;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
`;
const BodyText = styled.div`
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 5px;
`;
const EmailInput = styled.input`
  border: none;
  outline: none;
  height: 40px;
  border-radius: 5px;
  padding: 0 10px;
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  & > * {
    flex-basis: 35%;
  }
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: x-small;
`;
