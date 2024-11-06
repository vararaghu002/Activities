
export const ACTIONS = {
    SET_PRODUCTS: 'set-products',
    ADD_PRODUCT: 'add-product',
    FILTER_PRODUCTS: 'filter-products',
  };
  
  export const productReducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.SET_PRODUCTS:
        return {
          ...state,
          products: action.payload,
          filteredProducts: action.payload,
        };
      case ACTIONS.ADD_PRODUCT:
        return {
          ...state,
          products: [...state.products, action.payload],
          filteredProducts: [...state.products, action.payload],
        };
      case ACTIONS.FILTER_PRODUCTS:
        return {
          ...state,
          filteredProducts: action.payload,
        };
      default:
        return state;
    }
  };
  