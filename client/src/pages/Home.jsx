import React, { useEffect } from "react";
import { getCurrentUser } from "../backend/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import NavBar from "../components/Navbar.jsx";

const Home = () => {
  
  return (
    <>
      <NavBar/>
      <div style={{ padding: 20 }}>
        <h2>Welcome Home!</h2>
      </div>
    </>
  );
};

export default Home;