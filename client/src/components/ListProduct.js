import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/action";
import { Carousel, Col, Container, Row } from "react-bootstrap";

import { Link } from "react-router-dom";
import TableProductAdmin from "./TableProductAdmin";
import ProductCard from "./ProductCard";

const ListProduct = ({ products, handleSearch, searching }) => {
  const { user } = useSelector((state) => state.user);
  // console.log("user product list");
  // console.log(user);

  // const  {products}  = useSelector((state) => state.product);

  // console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  function importAll(r) {
    let images = {};
    r.keys().map((item) => {
      return (images[item.replace("./", "")] = r(item));
    });
    return images;
  }

  const images = importAll(
    require.context("../../public/images", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <div>
      {user && user.userRole === "admin" ? (
        <TableProductAdmin products={products} />
      ) : (
        <div>
          <div className="carousels">
            {/* <Carousel variant="dark" fade>
              <Carousel.Item style={{ color: "black" }}>
                <img
                  className="d-block w-100"
                  style={{ height: "80vh", opacity: "0.9" }}
                  src={images["mencl.jpg"]}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3
                    style={{
                      fontSize: "28px",
                      color: "black",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    Men's clothing{" "}
                  </h3>
                  <p style={{ fontSize: "22px", color: "black" }}>
                    {" "}
                    Shop for our collection of men's clothing including suits,
                    dress shirts, sportcoats, big & tall & custom clothing
                    online
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  style={{ height: "80vh", opacity: "0.8" }}
                  src={images["woo.png"]}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3
                    style={{
                      fontSize: "28px",
                      color: "black",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    women's clothing{" "}
                  </h3>
                  <p style={{ fontSize: "22px", color: "black" }}>
                    Shop for our collection of women's clothing including suits,
                    dress shirts, sportcoats, big & tall & custom clothing
                    online
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel> */}
          </div>

          <Container>
            <Row>
              <Col sm={1}></Col>
              <Col lg={true} sm={10}>
                <div className="listProduct">
                  <h2 className="ourproducts">
                    <i class="fa-brands fa-product-hunt"></i> Our products
                  </h2>

                  {products &&
                    React.Children.toArray(
                      products.map((el) => <ProductCard product={el} />)
                    )}
                </div>
              </Col>
              <Col sm={1}></Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
