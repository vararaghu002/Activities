import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
`;

export const UserList = styled.div`
  width: 80%;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #ffffff;
`;

export const UserCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

export const UserId = styled.p`
  font-size: 1rem;
  color: #333;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;

  button {
    padding: 5px 10px;
    font-size: 0.9rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export const AddUserButton = styled(Button)`
  background-color: #007bff !important;
  color: white !important;
  border: none;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3 !important;
    color: white !important;
  }
`;