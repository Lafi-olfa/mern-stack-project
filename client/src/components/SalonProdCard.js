import * as React from "react";

import { Button, Card } from "react-bootstrap";
import { addToCart } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SalonProdCard = ({ woman }) => {
  const { user } = useSelector((state) => state.user);

  const { products } = useSelector((state) => state.product);

  // console.log(woman)

  const dispatch = useDispatch();

  const goSignUp = () => alert("   ⚠️Create account!    ");

  function calculeRemise(prix, remise) {
    const prixNumber = parseFloat(prix);
    const remiseNumber = parseFloat(remise);
    let resulta = 0;
    if (prixNumber && remiseNumber && remiseNumber > 0) {
      resulta = prix * (1 - remise / 100);
      return resulta;
    }
  }

  const [result, setResult] = useState();

  useEffect(() => {
    let result;
    result = parseFloat(calculeRemise(woman.price, woman.promo));
    setResult(result.toFixed(2));
  }, [result]);

  return (
    <div className="productCard">
      <Card sx={{ width: "22rem", height: "47rem" }}>
        <Card>
          <h1>{woman.category.toUpperCase()}</h1>
          title:{woman.title}
        </Card>

        {Number(result) > 0 ? (
          <div className="promo">
            <h4 className="promo1">Promo</h4>
            <h4 className="promo2">{`${woman.promo}% `}</h4>
          </div>
        ) : null}
        <Card
          component="img"
          height="380 vh"
          width="100%"
          image={woman.image}
          alt="wait for data"
        />
        {Number(result) > 0 ? (
          <div>
            <Card className="Promotion">
              <div>
                <p
                  className="priceCardPromo"
                  style={{
                    textDecoration: "line-through",
                    marginTop: "8px",
                    color: "black",
                  }}
                >{`$ ${woman.price}`}</p>
              </div>
              <div>
                <p className="priceCardPromo">{`(${woman.promo}% off) `} </p>
              </div>
            </Card>
            <Card>
              <div>
                <p className="priceCard">{`$ ${result}`} </p>
              </div>
            </Card>
          </div>
        ) : (
          <Card>
            <div className="priceCard">{`$ ${woman.price}`}</div>
          </Card>
        )}
        <Card disableSpacing>
          {user && user.userRole === "admin" ? (
            <div className="btns_admin">
              <Button variant="danger" onClick={goSignUp}>
                <i
                  style={{ color: "white", fontSize: "20px" }}
                  className="fas fa-shopping-cart buttoncartsignup"
                ></i>
              </Button>
              <Link to={`/detailProduct/${products._id}`}>
                {" "}
                <Button variant="dark" style={{ marginLeft: "400px" }}>
                  <i
                    style={{ color: "white", fontSize: "20px" }}
                    class="fa-solid fa-magnifying-glass"
                  ></i>
                </Button>{" "}
              </Link>
            </div>
          ) : (
            <div className="btns_user">
              <Button
                variant="dark"
                onClick={() => dispatch(addToCart(woman._id, 1))}
              >
                <i
                  style={{ color: "white", fontSize: "20px" }}
                  className="fas fa-shopping-cart"
                ></i>
              </Button>
              <Link to={`/detailProduct/${woman._id}`}>
                {" "}
                <Button variant="dark">
                  <i
                    style={{ color: "white", fontSize: "20px" }}
                    class="fa-solid fa-magnifying-glass"
                  ></i>
                </Button>{" "}
              </Link>
            </div>
          )}
        </Card>
      </Card>
    </div>
  );
};
export default SalonProdCard;
