import React, { useState, useEffect } from 'react';
import { DatePicker, Input, Button, Modal } from 'antd';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
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

const StyledRangePicker = styled(RangePicker)`
  .ant-picker-input {
    color: #333;
    border-radius: 10px;
  }
`;

const StyledInput = styled(Input)`
  border-radius: 10px;
  border: 1px solid #d1dae3;
`;


const ProductTableWrapper = styled.div`
  margin-top: 20px;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([dayjs().subtract(7, 'days'), dayjs()]);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/posts');
        const products = response.data?.posts || [];
        const productsWithDates = products.map((product) => ({
          ...product,
          date: product.date || dayjs().format('YYYY-MM-DD'), // Use product date or today's date if not present
        }));
        setProducts(productsWithDates);
        setFilteredProducts(productsWithDates);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchClick = () => {
    const [startDate, endDate] = dateRange;
    const filtered = products.filter((product) => {
      const productDate = dayjs(product.date);
      const matchesDateRange = productDate.isBetween(startDate, endDate, 'day', '[]');
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDateRange && matchesSearch;
    });
    setFilteredProducts(filtered);
  };

  const handleDateChange = (dates) => setDateRange(dates);

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (values) => {
    localStorage.setItem("newProduct", JSON.stringify(values));
    navigate("/confirm");
    closeModal();
  };

  return (
    <Container>
      <Title>Product Management</Title>
      <ControlRow>
        <StyledRangePicker
          value={dateRange}
          onChange={handleDateChange}
          disabledDate={(date) => date && date > dayjs().endOf('day')}
        />
        <StyledInput
          placeholder="Search products"
          value={searchTerm}
          onChange={handleInputChange}
          style={{ width: 200 }}
        />
        <Button type='primary' onClick={handleSearchClick}>
          Search
        </Button>
        <Button type='primary' onClick={openModal}>
          Add New Product
        </Button>
      </ControlRow>

      <ProductTableWrapper>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <ProductTable products={filteredProducts} />
        )}
      </ProductTableWrapper>

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
