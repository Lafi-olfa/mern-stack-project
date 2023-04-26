import {
  DELETE_PRODUCT,
  DETAILPRODUCT,
  DETAILPRODUCT_FAIL,
  DETAILPRODUCT_SUCCESS,
  EDIT_PRODUCT,
  ADD_PRODUCT,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_SALON_PRODUCT,
} from "./actionTypes";

const init = {
  errors: null,
  loading: false,
  products: null,
  oneProduct: null,
};

export const productReducer = (state = init, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCT:
    case DETAILPRODUCT:
    case GET_ALL_PRODUCTS:
      return { ...state, loading: true };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, payload],
        loading: false,
        // errors: null,
      };
    case DETAILPRODUCT_SUCCESS:
      return {
        ...state,
        oneProduct: payload,
        loading: false,
      };
    case ADD_PRODUCT_FAIL:
    case DETAILPRODUCT_FAIL:
    case GET_ALL_PRODUCTS_FAIL:
      return { ...state, errors: payload, loading: false };
    //
    case GET_ALL_PRODUCTS_SUCCESS:
    case GET_SALON_PRODUCT:
      return { ...state, products: payload, loading: false, errors: null };
    //
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((el) =>
          el._id === payload._id ? payload : el
        ),
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((el) => el._id !== payload),
      };
    default:
      return state;
  }
};
