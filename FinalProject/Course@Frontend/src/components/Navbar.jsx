import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {NavbarContainer, Logo, Menu, MenuItem, LoginButton, NavLinkStyled, SearchBar} from './styles/Nav'

function Navbar() {
  const [inp, setInp] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  const changeInp = (event) => {
    setInp(event.target.value);
  };

  const searchItem = () => {
    const query = inp;
    navigate(`/search/${query}`);
  };

  return (
    <NavbarContainer>
      <Logo to="/">LearningWave</Logo>
      <Menu>
        <MenuItem>
          <SearchBar>
            <input
              type="text"
              value={inp}
              placeholder="Search Courses"
              onChange={changeInp}
            />
            <button onClick={searchItem}>Search</button>
          </SearchBar>
        </MenuItem>
          {role === "ADMIN" && (
            <>
              <MenuItem>
                <NavLinkStyled style={{marginLeft:'150px'}} to="/manage">Manage Students</NavLinkStyled>
              </MenuItem>
              <MenuItem>
                <NavLinkStyled to="/add">Add Course</NavLinkStyled>
              </MenuItem>
            </>
          )}
          {role === "USER" && (
            <MenuItem>
              <NavLinkStyled style={{marginLeft:'300px'}} to="/mycourse">My Courses</NavLinkStyled>
            </MenuItem>
          )}
          {!role ? (
            <MenuItem>
              <LoginButton to="/login">Login</LoginButton>
            </MenuItem>
          ) : (
            <MenuItem>
              <NavLinkStyled to={`/profile/${userId}`}>
                {role === "admin" ? "Admin Dashboard" : "Profile"}
              </NavLinkStyled>
            </MenuItem>
          )}
      </Menu>
    </NavbarContainer>
  );
}

export default Navbar;
