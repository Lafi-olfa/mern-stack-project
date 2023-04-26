import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import thunk from "redux-thunk";
import rootReducer from "./rootReducers";
const devtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const persistConfig = {
  key: "root",
  storage: storage,
};
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
  },
};
const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, compose(applyMiddleware(thunk), devtools));

const persistor = persistStore(store);

export { persistor, store };
