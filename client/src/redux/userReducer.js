import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  GET_USERS,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  DELETE_USER,
  EDIT_USER,
} from "./actionTypes";

const init = {
  users: null,
  allUsers: null,
  errors: null,
  loading: false,
  token: localStorage.getItem("token"),
  isAuth: false,
};

export const userReducer = (state = init, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
    case LOGIN_USER:
    case GET_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS:
      return { ...state, allUsers: payload, errors: null,loading:false };
    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter((el) => el._id !== payload),
      };
    case EDIT_USER:
      return {
        ...state,
        allUsers: state.allUsers.map((el) =>
          el._id === payload._id ? payload : el
        ),
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user,
        token: payload.token,
        isAuth: true,
        errors: null,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        token: payload.token,
        isAuth: true,
        errors: null,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        isAuth: true,
        errors: null,
      };
    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
    case GET_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case LOGOUT:
      return { state };
      //

    default:
      return state;
  }
};
