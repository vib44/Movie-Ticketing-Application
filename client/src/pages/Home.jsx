import React, { useEffect } from "react";
import { getCurrentUser } from "../backend/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import NavBar from "../components/Navbar.jsx";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const user = await getCurrentUser();
      dispatch(setUserData(user));
    } catch (error) {
      console.log("user data error", error);
    }
  };

  const handleLogout = () => {
    // clear token or call backend logout
    localStorage.removeItem("token");
    dispatch(setUserData(null));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <NavBar user={userData} onLogout={handleLogout} />
      <NavBar />

      <div style={{ padding: 20 }}>
        <h2>Welcome Home!</h2>
      </div>
    </>
  );
};

export default Home;