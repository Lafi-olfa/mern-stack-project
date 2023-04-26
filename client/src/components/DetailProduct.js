import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, getOneProduct } from "../redux/action";

const DetailProduct = ({ match, history }) => {
  const { oneProduct, loading } = useSelector((state) => state.product);
  console.log(oneProduct);
  // console.log(oneProduct);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { _id } = useParams();

  useEffect(() => {
    dispatch(getOneProduct(_id));
  }, [dispatch, _id]);
  const navigate = useNavigate();

  const AddToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart(oneProduct._id, qty));
    navigate(`/cart/${_id} ?qty=${qty}`);
  };
  return (
    <div className="detail">
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <img src={oneProduct.data.image} alt="erreur" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-dt1">
              <div className="poduct-info">
                <div className="product-name">{oneProduct.data.title}</div>
              </div>
              <p>{oneProduct.data.description} </p>
              <div className="product-count col-lg-7">
                <div className="flex-box d-flex justify-content-between align-items">
                  <h6>Price:</h6>
                  <span> {oneProduct.data.price} </span>
                </div>
                <div className="flex-box d-flex justify-content-between align-items">
                  <h6>Status</h6>

                  {oneProduct.data.countInStock > 0 ? (
                    <span> in stock </span>
                  ) : (
                    <span> unavailable</span>
                  )}
                </div>
              </div>
              {oneProduct.data.countInStock > 0 ? (
                <>
                  <div className="flex-box d-flex justify-content-between align-items">
                    <h6> quantity</h6>
                    {/* <select>
                      {[...Array(oneProduct.data.countInStock).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </select> */}
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(oneProduct.data.countInStock).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </select>
                    <button
                      onClick={AddToCartHandler}
                      className="round-black-btn"
                    >
                      {" "}
                      add to cart
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
