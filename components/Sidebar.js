import React from "react";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import { Button, IconButton } from "@mui/material";

function Sidebar() {
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
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Pesquisar..." />
      </Search>
      <SidebarButton color="success">NOVO CHAT</SidebarButton>
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
