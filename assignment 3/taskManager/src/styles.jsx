import styled, { css } from "styled-components";

export const TaskList = styled.div`
  width: 100%;
  margin: 20px 0px;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  ${(props) =>
    props.completed &&
    css`
      background-color: #e0ffe0; /* Optional background change for completed tasks */
      color: #999;
    `}

  input[type="checkbox"] {
    margin-right: 10px;
    cursor: pointer;
  }

  span {
    ${(props) =>
      props.completed &&
      css`
        color: #999;
      `}
  }
`;

export const Button = styled.button`
  padding: 5px 10px;
  margin: 5px 5px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  font-size: 14px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #00008B;
  }
`;

export const TaskInput = styled.input`
  padding:10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin-left:0px;
  margin-bottom: 10px;
  font-size: 1rem;
`;


export const DatePickerInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
  font-size: 1rem;
`;

