import React from "react";
import { useEffect } from "react";
import { Layout, Input, Button, Avatar, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../backend/auth";
import { setUserData } from "../redux/userSlice";
import {Link} from "react-router-dom"
const { Header } = Layout;

const NavBar = ({ user, onLogout }) => {
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
<Header
      style={{
        background: "#fff",
        display: "flex",
        alignItems: "center", // center align vertically
        justifyContent: "space-between",
        paddingInline: 20,
        height: 70, // consistent height
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* App Logo */}
      <div style={{ fontSize: 22, fontWeight: 700, color: "#d81f26" }}>
        🎟 BookMyShow Lite
      </div>

      {/* Center Search Bar */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Input.Search
          placeholder="Search movies, events, sports..."
          style={{
            width: 450,
            height: 40, // FIXED HEIGHT
          }}
          allowClear
        />
      </div>

      {/* User + Logout */}
      <Space size="large" align="center">
        <Avatar icon={<UserOutlined />} />
        <Link to={'/admin'}>{userData?.name}</Link>
        
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={onLogout}
        >
          Logout
        </Button>
      </Space>
    </Header>
  );
};

export default NavBar;