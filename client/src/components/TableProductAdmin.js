import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllProducts,
  getUsers,
  removeProduct,
} from "../redux/action";
import { Link } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";
import { Table, Tooltip } from "react-bootstrap";
import Block from "./Block";
import { AiTwotoneDelete } from "react-icons/ai";

const TableProductAdmin = () => {
  let { products } = useSelector((state) => state.product);
  console.log(products);
  let { users } = useSelector((state) => state.user);
  //   let {user}=useSelector((state) => state.user);

  //   console.log(user.blocking)
  //   const [blocking, setBlocking] = useState(user.blocking);

  //   const handleSubmit = () => {

  //    if (blocking=='no') {
  //     setBlocking('yes')}
  // };

  // const handleblock=()=>{
  //   const editdUser = { _id: users._id, blocking};
  //   dispatch(editeUser(editdUser))

  // }

  //dispatch getallproducts
  const dispatch = useDispatch();

  function calculeRemise(prix, remise) {
    const prixNumber = parseFloat(prix);
    const remiseNumber = parseFloat(remise);
    let resulta = 0;
    if (prixNumber && remiseNumber && remiseNumber > 0) {
      resulta = prix * (1 - remise / 100);
      return resulta;
    }
  }

  //useeffect
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getUsers());
  }, []);

  // tableau icon

  return (
    <div>
      <br />
      <h1>list products</h1>
      <Table
        aria-label="Example static collection table"
        css={{
          position: "relative",
          zIndex: "0",
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="single"
      >
        <Table.Header>
          <Table.Column css={{ fontSize: "20px", textAlign: "center" }}>
            Image
          </Table.Column>
          <Table.Column
            css={{ fontSize: "20px", textAlign: "center", width: "40%" }}
          >
            Title
          </Table.Column>
          <Table.Column css={{ fontSize: "20px", textAlign: "center" }}>
            Category
          </Table.Column>
          <Table.Column css={{ fontSize: "20px", textAlign: "center" }}>
            Price
          </Table.Column>
          <Table.Column css={{ fontSize: "20px", textAlign: "center" }}>
            Promotion
          </Table.Column>
          <Table.Column css={{ fontSize: "20px", textAlign: "center" }}>
            Price after promotion
          </Table.Column>

          <Table.Column css={{ fontSize: "20px", textAlign: "center" }}>
            ACTION
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {products &&
            products.map((el, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <img style={{ height: "8rem" }} src={el.image} alt=""></img>
                </Table.Cell>

                <Table.Cell css={{ fontSize: "22px", fontWeight: "400" }}>
                  {el.title}
                </Table.Cell>
                <Table.Cell css={{ fontSize: "20px", fontWeight: "400" }}>
                  {el.category}
                </Table.Cell>
                <Table.Cell
                  css={{ fontSize: "20px", fontWeight: "600" }}
                >{`${el.price} $`}</Table.Cell>
                <Table.Cell
                  css={{ fontSize: "20px", fontWeight: "600" }}
                >{`${el.promo} %`}</Table.Cell>
                <Table.Cell
                  css={{ fontSize: "20px", fontWeight: "600" }}
                >{`${calculeRemise(el.price, el.promo).toFixed(
                  2
                )} $`}</Table.Cell>

                <Table.Cell css={{ display: "flex", marginTop: "40px" }}>
                  <Tooltip content="Details product ">
                    <Link to={`/detailProduct/${el._id}`}>
                      <button></button>
                    </Link>
                  </Tooltip>

                  <UpdateProduct updateProd={el} />
                  <Tooltip
                    content="Delete product "
                    color="error"
                    onClick={() => {
                      dispatch(removeProduct(el._id));
                      dispatch(getAllProducts());
                    }}
                  >
                    <button>
                      <AiTwotoneDelete />
                    </button>
                  </Tooltip>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <hr />
      <h1>List Users</h1>

      <Table
        aria-label="Example static collection table"
        css={{
          position: "relative",
          zIndex: "0",
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="single"
      >
        <Table.Header>
          <Table.Column css={{ fontSize: "20px", textAlign: "center" }}>
            FullName
          </Table.Column>
          <Table.Column
            css={{ fontSize: "20px", textAlign: "center", width: "40%" }}
          >
            Email
          </Table.Column>
          <Table.Column css={{ fontSize: "20px", textAlign: "center" }}>
            Adresse
          </Table.Column>
          <Table.Column css={{ fontSize: "20px", textAlign: "center" }}>
            Telephone
          </Table.Column>
          <Table.Column css={{ fontSize: "20px", textAlign: "center" }}>
            UserRole
          </Table.Column>
          <Table.Column css={{ fontSize: "20px", textAlign: "center" }}>
            Block
          </Table.Column>

          <Table.Column css={{ fontSize: "20px", textAlign: "center" }}>
            ACTION
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {users &&
            users.map((el, i) => (
              <Table.Row key={i}>
                <Table.Cell css={{ fontSize: "22px", fontWeight: "400" }}>
                  {el.fullName}
                </Table.Cell>
                <Table.Cell css={{ fontSize: "20px", fontWeight: "400" }}>
                  {el.email}
                </Table.Cell>
                <Table.Cell css={{ fontSize: "20px", fontWeight: "400" }}>
                  {el.adresse}
                </Table.Cell>
                <Table.Cell css={{ fontSize: "20px", fontWeight: "400" }}>
                  {el.telephone}
                </Table.Cell>
                <Table.Cell css={{ fontSize: "20px", fontWeight: "600" }}>
                  {el.userRole}
                </Table.Cell>
                <Table.Cell css={{ fontSize: "20px", fontWeight: "600" }}>
                  {el.blocking}
                </Table.Cell>

                <Table.Cell
                  css={{
                    display: "flex",
                    marginTop: "10px",
                    marginLeft: "50px",
                  }}
                >
                  <Tooltip
                    content="Delete product "
                    color="error"
                    onClick={() => {
                      dispatch(deleteUser(el._id));
                      dispatch(getUsers());
                    }}
                  >
                    <button>
                      <AiTwotoneDelete />{" "}
                    </button>
                  </Tooltip>
                  <Tooltip>
                    <Block updatetUser={el} />
                    {/* <Button variant="primary" onClick={handleSubmit} >BLOCK</Button> */}
                  </Tooltip>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableProductAdmin;
