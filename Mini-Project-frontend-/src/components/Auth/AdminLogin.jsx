import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Flex, Form, Input, Typography, Button, message } from "antd";
import axios from "axios";
import './Auth.css'


import signInImage from "../../assets/signin.png";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "https://localhost:7058/signIn",
        values
      );
      console.log(response.data);
      message.success("Login successful!");
        navigate('/DashLayout/Dash');
    } catch (error) {
      console.error(error);
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="wrapper">
    <Card className="form-container">
      <Flex gap="large" align="center">
        {/* Image  */}
        <Flex>
          <img src={signInImage} className="auth-img" />
        </Flex>
        {/* form  */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className="title">
            Admin Login
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            Unlock your world.
          </Typography.Text>
          <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please enter valid email",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>
            
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="btn"
              >
                Sign In
              </Button>
            </Form.Item>
            
            <Form.Item>
              <Link to="/">
                <Button size="large" className="btn">
                  Employee Login
                </Button>
              </Link>
            </Form.Item>
            <Form.Item>
            <Link to="/forgot-password">
                  Forgot Password?
                </Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
    </div>
  );
};

export default Login;
