import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  margin-top:50px;
`;

export const TableHeader = styled.th`
  text-align: center;
  padding: 10px;
`;

export const TableRow = styled.tr`
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 10px;
`;

export const CancelButton = styled.button`
  cursor: pointer;
  color: gray;
  background-color: transparent;
  border: none;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;
