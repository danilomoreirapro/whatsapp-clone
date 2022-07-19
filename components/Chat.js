import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import styled from "styled-components";
import { Avatar } from "@mui/material";

function Chat({ id, users }) {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user.email);
  return (
    <Container>
      <UserAvatar />
      <RecipientEmail>{recipientEmail}</RecipientEmail>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  word-break: break-word;
  cursor: pointer;

  &:hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)``;

const RecipientEmail = styled.span`
  margin-left: 10px;
`;
