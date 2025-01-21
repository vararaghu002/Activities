import styled from "styled-components";
import { NavLink } from "react-router-dom";

 export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 30px;
  background-color: #f4f4f4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width:100%;
`;

export const Logo = styled(NavLink)`
font-size: 1.5rem;
font-weight: bold;
color: #333;
text-decoration: none;

&:hover {
  color: #007bff;
}
`;

export const Menu = styled.ul`
display: flex;
align-items: center;
list-style: none;
margin: 0;
padding: 0;
`;

export const MenuItem = styled.li`
margin: 0 10px;
`;

export const NavLinkStyled = styled(NavLink)`
text-decoration: none;
font-weight: 500;

&.active {
  color: #007bff;
}

&:hover {
  color: #007bff;
}
`;

export const LoginButton = styled(NavLink)`
background-color: #ff4040;
margin-left:400px;
color: #fff;
font-weight: 600;
text-align: center;
border-radius: 20px;
padding: 5px 15px;
text-decoration: none;

&:hover {
  background-color: #d93636;
}
`;

export const SearchBar = styled.div`
display: flex;
align-items: center;
margin-left:470px;

input {
  padding: 7px 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
}

button {
  padding: 5px 15px;
  border: none;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
}
`;