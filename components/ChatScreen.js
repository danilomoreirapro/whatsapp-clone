import { Avatar, IconButton } from "@mui/material";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../utils/getRecipientEmail";
import db, { auth } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRef, useState } from "react";
import Message from "./Message";

function ChatScreen({ chat, messages }) {
  const endOfMessageRef = useRef(null);
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const recipientEmail = getRecipientEmail(chat.users, user.email);
  const usersRef = collection(db, "users");
  const chatRef = doc(db, "chats", chat.id);
  const recipientQuery = query(usersRef, where("email", "==", recipientEmail));
  const [recipientSnapshot] = useCollection(recipientQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [messsagesSnapshot] = useCollection(
    query(collection(chatRef, "messages"), orderBy("timestamp", "asc"))
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const lastSeen = recipient?.lastSeen.toDate();
  const onlyDate = lastSeen?.toLocaleDateString("pt-BR");
  const onlyTime = `${lastSeen?.getHours()}:${lastSeen?.getMinutes()}`;

  const sendMessage = async (e) => {
    e.preventDefault();
    setDoc(
      doc(usersRef, user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    await addDoc(collection(chatRef, "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const showMessages = () => {
    if (messsagesSnapshot) {
      return messsagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => {
        <Message key={message.id} user={message.user} message={message} />;
      });
    }
  };

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
        )}
        <HeaderInfo>
          <HeaderTitle>{recipientEmail}</HeaderTitle>
          <LastSeen>
            {recipient ? `Visto por último em ${onlyDate} às ${onlyTime}` : ""}
          </LastSeen>
        </HeaderInfo>
        <HeaderIcons>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>
      <InputContainer onSubmit={sendMessage}>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <IconButton>
          <MicIcon />
        </IconButton>
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;
const Header = styled.div`
  display: flex;
  background-color: white;
  z-index: 100;
  position: sticky;
  top: 0;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
  height: 80px;
  padding: 11px;
`;
const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 15px;
`;
const HeaderTitle = styled.span`
  font-weight: 700;
`;
const LastSeen = styled.span`
  font-size: x-small;
`;
const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  background-color: #e5ded8;
  min-height: 90vh;
  padding: 30px;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  outline: none;
  border: none;
  background-color: whitesmoke;
  padding: 20px;
  border-radius: 10px;
`;

const EndOfMessage = styled.div``;
