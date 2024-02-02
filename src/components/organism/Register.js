// CreateUserPage.js
import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { postUser } from "../../service/user";
import { Link } from "react-router-dom";

const CreateUserPage = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await postUser(values);
      message.success("User created successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Error creating user.");
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1>Create User</h1>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: "First Name is Required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Last Name is Required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: "Birthday is Required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Location is Required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is Required" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is Required" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create User
            </Button>
          </Form.Item>
          <p>
            <Link to="/">Back to Login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default CreateUserPage;
