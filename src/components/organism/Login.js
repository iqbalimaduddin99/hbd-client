import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../service/user";
import { Form, Input, Button, message } from "antd";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    let data = {
      email: values?.email,
      password: values?.password,
    };
    try { 
      const response = await postLogin(data);
      const tokens = response.data.token; // Assuming your server returns a token
      await localStorage.setItem("token", tokens); // Save the token in local storage
      message.success("Login Berhasil!");
      navigate("/");
      window.location.reload()
    } catch (error) {
      message.error("Username Atau Password Salah");
    }
  };

  return (
      <div className="login-form-container">
        <h1>Login</h1>
        <Form form={form} onFinish={onFinish} >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Email is Required' },
              { type: 'email', message: 'Invalid email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password is Required' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" >
              Login
            </Button>
          </Form.Item>

          <p>
            Don't have an account? <Link to="/create-user">Create here!</Link>
          </p>
        </Form>
      </div>
  );
};

export default LoginPage;
