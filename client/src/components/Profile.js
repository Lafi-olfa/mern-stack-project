import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Navigate } from "react-router-dom";
import { getUserProfile } from "../redux/action";
const Profile = () => {
  //
  const { isAuth, user } = useSelector((state) => state);
  // console.log("user profile");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  return (
    <div>
      {!isAuth ? (
        <Navigate to="/" />
      ) : (
        <div>
          <h1> Profile page</h1>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Profile</Card.Title>
              <Card.Text>{user.fullName}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Profile;
