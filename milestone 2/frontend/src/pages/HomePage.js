import React, { useState, useContext, useMemo, useEffect } from 'react';
import { DatePicker, Input, Button, Modal } from 'antd';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'; 
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import ProductContext from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

dayjs.extend(isBetween); 

const { RangePicker } = DatePicker;

const Container = styled.div`
  padding: 30px;
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #1e88e5;
  margin-bottom: 20px;
`;

const ControlRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 30px;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { state, addProduct, filterProducts } = useContext(ProductContext);
  const [dateRange, setDateRange] = useState([dayjs().subtract(7, 'days'), dayjs()]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoize filtered products based on dateRange and searchTerm
  const filteredProducts = useMemo(() => {
    const [startDate, endDate] = dateRange;
    return state.products.filter((product) => {
      const productDate = dayjs(product.date);
      const matchesDateRange = productDate.isBetween(startDate, endDate, 'day', '[]');
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDateRange && matchesSearch;
    });
  }, [dateRange, searchTerm, state.products]);

  // Automatically apply filters whenever dateRange or searchTerm changes
  useEffect(() => {
    filterProducts(filteredProducts);
  }, [filteredProducts, filterProducts]);

  const handleFormSubmit = (values) => {
    addProduct(values);
    localStorage.setItem("newProduct", JSON.stringify(values));
    navigate("/confirm");
    closeModal();
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <Container>
      <Title>Product Management</Title>
      <ControlRow>
        <RangePicker 
          value={dateRange} 
          onChange={setDateRange} 
          disabledDate={(current) => current && current > dayjs().endOf('day')} // restrict dates up to today
        />
        <Input
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Add New Product</Button>
      </ControlRow>

      <ProductTable products={state.filteredProducts} />

      <Modal
        title="Add New Product"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <ProductForm onSubmit={handleFormSubmit} />
      </Modal>
    </Container>
  );
};

export default HomePage;
