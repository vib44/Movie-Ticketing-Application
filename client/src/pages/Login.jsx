import React from 'react';
import { Button, Card, Typography,Checkbox, Form, Input, message } from 'antd';
import {login} from '../backend/auth'
import { Link, useNavigate } from "react-router-dom";
import { setUserData } from '../redux/userSlice'
import { useDispatch } from "react-redux";
import {VideoCameraOutlined} from "@ant-design/icons"
import "./Auth.css"

const {Title, Text}= Typography;

function Login()
{
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const onSubmit= async(values)=>
    {
         try {
            const userData = await login(values)
            console.log("Login success:", userData)
            if(userData.success)
             {
              message.success(userData.message)
              dispatch(setUserData(userData.user))
              
              //Navigate based on role
              if(userData.user.role==="admin")
                  navigate("/admin")
              else if(userData.user.role==="partner")
                  navigate("/partner")
              else
                navigate("/home")    
              }
             else
              {message.error(userData.message)
               
                }       
            }
            catch (error) 
            {
          
              console.log(error.message)
                message.error("Login failed")
            }
}

    
/*const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};*/
return<>
          <div className="auth-page">
            <div className="auth-container">
              <div className="auth-left">
                <div className="auth-brand">
                  <VideoCameraOutlined className="brand-icon"/>
                  <Title level={1} className="brand-title">
                    Showbook
                  </Title>
                  <Text className="brand-subtitle">
                    Your Gateway to Cinematic Magic
                  </Text>
                </div>
              </div> 
              <div className="right-section">
                <Card className="auth-card">
                  <Title level={2} className="auth-title">
                    Welcome Back
                  </Title>
                  <Text className ="auth-subtitle">
                    Sign in to continue your movie booking
                  </Text>
              <Form layout="vertical" onFinish={onSubmit} className="auth-form">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                {type: "email", message: "Please enter a valid email"}]}
              >
                <Input
                  size="large"
                  placeholder="Enter your email"
                  className="auth-input"/>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password
                 size="large"
                 className="auth-input"
                  placeholder="Enter your Password"
                />
              </Form.Item>

              <Form.Item >
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  size="large"
                  className="auth-button"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
            <div className="auth-footer">
              <Text>
                Don't have an account?{" "}
                <Link to="/register" className="auth-link">
                Sign up now!
                </Link>
              </Text>
                </div> 
                </Card>
              </div>
            </div>
          </div>

          
          
    
    </>
}

export default Login;