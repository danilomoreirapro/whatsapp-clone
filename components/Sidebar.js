import React, { useEffect } from "react";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import { Button, IconButton } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import * as EmailValidator from "email-validator";
import db, { signOut, auth } from "../firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { v4 } from "uuid";

function Sidebar() {
  const [user] = useAuthState(auth);
  const chatsRef = collection(db, "chats");

  const signUserOut = () => {
    signOut(auth)
      .then(() => console.log("User signed out successfully"))
      .catch((error) => console.log(error));
  };

  const getChatId = (emailA, emailB) => {
    const a = window.btoa(emailA);
    const b = window.btoa(emailB);
    const halfA = a.slice(a.length / 2, a.length);
    const halfB = b.slice(b.length / 2, b.length);

    if (emailA < emailB) {
      return halfA + halfB;
    }
    return halfB + halfA;
  };

  const createChat = () => {
    const input = prompt("Entre com o email do usuário que deseja conversar.");
    if (!input) return null;

    if (EmailValidator.validate(input) && input !== user.email) {
      setDoc(doc(chatsRef, getChatId(user.email, input)), {
        users: [user.email, input],
      });
    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton onClick={signUserOut}>
            <LogoutIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Pesquisar..." />
      </Search>
      <SidebarButton onClick={createChat} color="success">
        NOVO CHAT
      </SidebarButton>
    </Container>
  );
}

export default Sidebar;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    color: rgba(0, 0, 0, 0.75);
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  background-color: white;
  border-bottom: 1px solid whitesmoke;
  position: sticky;
  top: 0;
  height: 80px;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

const IconsContainer = styled.div``;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
