import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditProfile from './EditProfile';
import DeleteProfile from './DeleteProfile';
import { ProfileContainer,Avatar,UserInfo,ActionButtons ,LogoutButton} from './styles/Prof';
import axios from 'axios';

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try{
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:8080/users/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status==200) {
        const data = res.data;
        setUser(data);
      } 
    }
    catch(error){
      if (error.response.status === 401) {
        localStorage.clear();
        return navigate('/login');
      }
    }
  };
    fetchUser();
  }, [id,navigate]);

  return (
    <ProfileContainer>
      <Avatar>
        {user.fname?.charAt(0)}
        {user.lname?.charAt(0)}
      </Avatar>
      <UserInfo>
        <h4>
          {user.fname} {user.lname}
        </h4>
        <p>
          <b>Username:</b> {user.username}
        </p>
        <p>
          <b>Email:</b> {user.email}
        </p>
        <p>
          <b>Phone:</b> {user.phone}
        </p>
        <p>
          <b>About Me:</b> {user.aboutme}
        </p>
      </UserInfo>
      <ActionButtons>
        <span>
          <EditProfile details={user} />
        </span>
        <span>
          <DeleteProfile details={user} />
        </span>
        {localStorage.getItem('userId') == user.id && (
          <LogoutButton
            onClick={() => {
              localStorage.clear();
              return navigate('/');
            }}
          >
            Log Out
          </LogoutButton>
        )}
      </ActionButtons>
    </ProfileContainer>
  );
}
