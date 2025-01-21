import styled from "styled-components";
import { Button, Form } from "antd";

export const AddCourseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

export const StyledForm = styled(Form)`
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledButton = styled(Button)`
  width: 100%;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;

  &:hover {
    background-color: #0056b3;
    color: white;
  }
`;

export const AddLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
`;

