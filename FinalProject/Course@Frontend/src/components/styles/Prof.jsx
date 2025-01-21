import { Button } from 'antd';
import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

export const Avatar = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background-color: #1677ff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 3rem;
  color: #fff;
`;

export const UserInfo = styled.div`
  text-align: center;

  h4 {
    margin: 1rem 0 0.5rem 0;
    font-size: 1.5rem;
    color: #333;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1rem;

    b {
      font-weight: 600;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1.5rem;

  button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #0056b3;
    }
  }

  span {
    display: flex;
    align-items: center;
  }
`;

export const LogoutButton = styled(Button)`
  background-color: #ff4040;
  color: #fff;
  border: none;

  &:hover {
    background-color: #d32f2f;
  }
`;