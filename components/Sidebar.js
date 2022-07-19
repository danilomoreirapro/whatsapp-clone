import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import { Button, IconButton } from "@mui/material";
import db, { signOut, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "./Chat";
import { collection, query, where, getDocs } from "firebase/firestore";
import AddNewChat from "./AddNewChat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [chatsSnapshot, setChatsSnapshot] = useState([]);
  const chatsRef = collection(db, "chats");
  const userChatsQuery = query(
    chatsRef,
    where("users", "array-contains", user.email)
  );

  const signUserOut = () => {
    signOut(auth)
      .then(() => console.log("User signed out successfully"))
      .catch((error) => console.log(error));
  };

  const updateChats = async () => {
    setChatsSnapshot(await getDocs(userChatsQuery));
  };

  useEffect(() => {
    updateChats();
  }, [open]);

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} />
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
      <SidebarButton onClick={() => setOpen(true)} color="success">
        NOVO CHAT
      </SidebarButton>
      <AddNewChat open={open} handleClose={() => setOpen(false)} />
      {chatsSnapshot?.docs?.map((chat) => {
        return <Chat key={chat.id} id={chat.id} users={chat.data().users} />;
      })}
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
