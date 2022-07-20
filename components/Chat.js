import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import db, { auth } from "../firebase";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

function Chat({ id, users }) {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user.email);
  const usersRef = collection(db, "users");
  const recipientQuery = query(usersRef, where("email", "==", recipientEmail));
  const [recipientSnapshot] = useCollection(recipientQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const router = useRouter();

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>
      )}
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
