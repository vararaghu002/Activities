
import React, { useEffect, useState } from 'react';
import { Button, Descriptions } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

const Container = styled.div`
  padding: 40px;
  max-width: 700px;
  margin: auto;
  background-color: #f7f9fc;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #3f51b5;
  margin-bottom: 24px;
`;

const StyledDescriptions = styled(Descriptions)`
  &.ant-descriptions-bordered .ant-descriptions-item-label {
    background-color: #e3f2fd;
    color: #1565c0;
    font-weight: 500;
  }
  &.ant-descriptions-bordered .ant-descriptions-item-content {
    background-color: #ffffff;
    font-weight: 400;
    color: #424242;
  }
  margin-bottom: 30px;
`;

const ConfirmButton = styled(Button)`
  background-color: #1e88e5;
  border-color: #1e88e5;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 8px;

  &:hover {
    background-color: #1565c0;
    border-color: #1565c0;
  }
`;

const ConfirmPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const storedProduct = JSON.parse(localStorage.getItem('newProduct'));
    if (storedProduct) {
      // Add today's date if not already included
      if (!storedProduct.date) {
        storedProduct.date = dayjs().format('YYYY-MM-DD');
      }
      setProduct(storedProduct);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleConfirm = async () => {
    try {
      await axios.post('http://localhost:8080/posts', product);
      alert("Product submitted successfully!");
      navigate('/');
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <Container>
      <Title>Confirm Product Details</Title>
      <StyledDescriptions bordered>
        <Descriptions.Item label="Title">{product.title}</Descriptions.Item>
        <Descriptions.Item label="Price">${product.price}</Descriptions.Item>
        <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
        <Descriptions.Item label="Date">{product.date}</Descriptions.Item> {/* Added Date */}
      </StyledDescriptions>
      <ConfirmButton type="primary" onClick={handleConfirm}>
        Confirm & Submit
      </ConfirmButton>
    </Container>
  );
};

export default ConfirmPage;
