import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import ListProduct from "./components/ListProduct";
import Checkout from "./components/Chackout";
import AddProduct from "./components/AddProduct";
import DetailProduct from "./components/DetailProduct";
import FooterApp from "./components/FooterApp";
import { useState } from "react";
import ListSalonProd from "./components/ListSalonProd";
import UpdateProduct from "./components/UpdateProduct";
import TableProductAdmin from "./components/TableProductAdmin";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  const [searching, setSearching] = useState("");
  //edit search
  const handleSearch = (y) => setSearching(y);
  ///

  return (
    <div className="App">
      <BrowserRouter>
        <Dashboard searching={searching} handleSearch={handleSearch} />

        <Routes>
          {/* <Route path={"/home"} element={<Home/>} /> */}
          {user && user.userRole === "admin" ? <AddProduct /> : null}
          <Route path={"/register"} element={<Register />} />
          <Route
            path="/"
            element={
              <div>
                <ListProduct
                  products={products.filter((el) =>
                    el.title
                      .toLocaleLowerCase()
                      .includes(searching.toLocaleLowerCase())
                  )}
                />
              </div>
            }
          />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/salon"} element={<ListSalonProd />} />
          {/* <ListProduct path={"/listproduct"} element={<ListProduct />} /> */}
          <Route path="/cart/:id?" element={<Cart />} />
          <Route path="/detailProduct/:_id" element={<DetailProduct />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route pat="/updateproduct" element={<UpdateProduct />} />
          <Route pat="/tableproductadmin" element={<TableProductAdmin />} />
        </Routes>

        <FooterApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
