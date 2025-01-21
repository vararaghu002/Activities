import styled from "styled-components";

export const CourseDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 40px auto;
  max-width: 400px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Image = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

export const Paragraph = styled.p`
  margin:3px;
  font-size:18px
`;