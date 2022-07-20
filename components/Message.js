import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import moment from "moment";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;
  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.div`
  margin: 10px;
  padding: 15px;
  width: fit-content;
  min-width: 60px;
  border-radius: 8px;
  padding-bottom: 26px;
  text-align: right;
  position: relative;
`;

const Sender = styled(MessageElement)`
  background-color: #dcf8c6;
  margin-left: auto;
`;

const Reciever = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;

const Timestamp = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 10px;
  font-size: 9px;
  color: gray;
  text-align: right;
`;
