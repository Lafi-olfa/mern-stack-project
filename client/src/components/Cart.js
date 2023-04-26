import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import { Link } from "react-router-dom";
const Cart = () => {
  const { user } = useSelector((state) => state.user);

  const { cartItems } = useSelector((state) => state.cart);
  window.scrollTo(0, 0);
  console.log(cartItems);
  useEffect(() => {}, []);
  return (
    <div className="cartscreen">
      <div className="cartscreen__left">
        <p> Shopping card</p>
        {cartItems.length === 0 ? (
          <div>
            your cart is empty <Link to="/"> Go back</Link>
          </div>
        ) : (
          cartItems.map((item) => <CartItems item={item} />)
        )}
      </div>
    </div>
  );
};

export default Cart;
