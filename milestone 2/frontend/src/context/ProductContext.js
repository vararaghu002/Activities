
import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { productReducer, ACTIONS } from './ProductReducer';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const initialState = {
    products: [],
    filteredProducts: [],
  };

  const [state, dispatch] = useReducer(productReducer, initialState);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/posts');
        dispatch({ type: ACTIONS.SET_PRODUCTS, payload: response.data.posts || [] });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  
  const addProduct = (product) => {
    dispatch({ type: ACTIONS.ADD_PRODUCT, payload: product });
  };


  const filterProducts = (filtered) => {
    dispatch({ type: ACTIONS.FILTER_PRODUCTS, payload: filtered });
  };

  return (
    <ProductContext.Provider value={{ state, addProduct, filterProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
