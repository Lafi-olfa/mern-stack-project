import {
  ADD_PRODUCT,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  CARD_ADD_ITEM,
  CARD_ADD_ITEM_FAIL,
  CARD_ADD_ITEM_SUCCESS,
  CARD_REMOVE_ITEM,
  DECREMENT,
  DELETE_PRODUCT,
  DELETE_USER,
  DETAILPRODUCT,
  DETAILPRODUCT_FAIL,
  DETAILPRODUCT_SUCCESS,
  EDIT_PRODUCT,
  EDIT_USER,
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_MEN_PRODUCT,
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  GET_SALON_PRODUCT,
  GET_USERS,
  GET_WOMEN_PRODUCT,
  INCREMENT,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
} from "./actionTypes";
import axios from "axios";
//function contient type et payload
// action user  register
export const registerUser = (newUser) => async (dispatch) => {
  dispatch({ type: REGISTER_USER });
  try {
    const res = await axios.post("/user/register", newUser);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data,
    });
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: LOGIN_USER });
  try {
    const res = await axios.post("/user/login", user);
    localStorage.setItem("token", res.data.token);
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data,
    });
  }
};
export const getUserProfile = () => async (dispatch) => {
  dispatch({
    type: GET_PROFILE,
  });
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    const res = await axios.get("/user/auth", config);
    // console.log(res.data)
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: error.response.data,
    });
  }
};
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT,
  });
};
export const getUsers = () => async (dispatch) => {
  try {
    const data = await axios.get("/user/getAllUser");
    dispatch({
      type: GET_USERS,
      payload: data,
    });
  } catch (error) {
    alert("get users error");
  }
};
export const deleteUser = (_id) => async (dispatch) => {
  try {
    const data = axios.delete(`/user/deleteuser/${_id}`);
    dispatch({
      type: DELETE_USER,
      payload: data,
    });
  } catch (error) {
    alert("delete error");
  }
};
export const editUser = (_id) => async (dispatch) => {
  try {
    const data = await axios.put(`/user/updateUser/${_id}`);
    dispatch({
      type: EDIT_USER,
      payload: data,
    });
  } catch (error) {
    alert("failed to edit");
  }
};
//action for product
// 1:add
export const addProduct = (newProduct) => async (dispatch) => {
  dispatch({
    type: ADD_PRODUCT,
  });
  try {
    const data = await axios.post("/product/addProduct", newProduct);
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload: error.response.data,
    });
  }
};
//2:getall products
export const getAllProducts = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_PRODUCTS,
  });
  try {
    const { data } = await axios.get("/product/getAllProducts");
    dispatch({
      type: GET_ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCTS_FAIL,
      payload: error.response.data,
    });
  }
};
//get one product

//get one product forr details
export const getOneProduct = (_id) => async (dispatch) => {
  dispatch({
    type: DETAILPRODUCT,
  });
  try {
    const data = await axios.get(`/product/getOneProduct/${_id}`);
    dispatch({
      type: DETAILPRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAILPRODUCT_FAIL,
      payload: error.response.data,
    });
  }
};

//edit product
export const editProduct = (product) => async (dispatch) => {
  try {
    const res = await axios.put(`/product/editProduct/${product._id}`, product);
    dispatch({
      type: EDIT_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    alert("update product error");
  }
};

//delete product
export const removeProduct = (_id) => async (dispatch) => {
  try {
    const data = axios.delete(`/product/deleteProduct/${_id}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: data,
    });
  } catch (error) {
    alert("delete product error");
  }
};
//3:get divers products

export const getProdSalon = () => async (dispatch) => {
  try {
    const res = await axios.get("/product/getSalonProducts");
    dispatch({
      type: GET_SALON_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    alert("get women products error");
  }
};

//get men products
export const getMenProd = () => async (dispatch) => {
  try {
    const res = await axios.get("/product/getMenProducts");
    dispatch({
      type: GET_MEN_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    alert("get Men products error");
  }
};

//get women products
export const getWomenProd = () => async (dispatch) => {
  try {
    const res = await axios.get("/product/getWomenProducts");
    dispatch({
      type: GET_WOMEN_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    alert("get women products error");
  }
};

// add to cart
// export const addToCart = (_id, qty) => async (getState, dispatch) => {
//   // dispatch({ type: CARD_ADD_ITEM });
//   try {
//     const data = await axios.get(`/product/getOneProduct/${_id}`);
//     dispatch({
//       type: CARD_ADD_ITEM,
//       payload: {
//         product: data._id,
//         title: data.title,
//         description: data.description,
//         price: data.price,
//         category: data.category,
//         image: data.image,
//         qty,
//       },
//     });
//   } catch (error) {
//     dispatch({
//       type: CARD_ADD_ITEM_FAIL,
//       payload: error.data,
//     });
//   }
//   localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
// };
export const addToCart = (_id, qty) => async (dispatch) => {
  dispatch({ type: CARD_ADD_ITEM });
  try {
    const { res } = await axios.get(`/product/getOneProduct/${_id}`);
    dispatch({
      type: CARD_ADD_ITEM_SUCCESS,
      payload: {
        product: res.data._id,
        title: res.data.title,
        promo: res.data.promo,
        image: res.data.image,
        price: res.data.price,
        countInStock: res.data.countInStock,
        qty
      },
    });

  } catch (error) {
    dispatch({
      type: CARD_ADD_ITEM_FAIL,
      payload: error.data,
    });
  }
};

// delete item from cart
export const removeFromCart = (_id) => (dispatch, getState) => {
  dispatch({
    type: CARD_REMOVE_ITEM,
    payload: _id,
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

// incrementer
export const incrementQty = (cartItem) => (dispatch) => {
  dispatch({
    type: INCREMENT,
    payload: cartItem,
  });
};

// decrementer
export const decrementQty = (cartItem) => (dispatch) => {
  dispatch({
    type: DECREMENT,
    payload: cartItem,
  });
};
