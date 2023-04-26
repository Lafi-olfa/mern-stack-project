import React from "react";
import { Link } from "react-router-dom";

const CartItems = ({ item }) => {
  return (
    <div className="cartitem">
      <div className="cartitem__image">
      </div>
      {/* <Link to={`/product/${}`} className="cartitem__name">
    <p> product 1</p>
      </Link> */}
      {/* <p className="cartitem__price"> 4444</p> */}

    </div>
  );
};

export default CartItems;
