// UpdateUserPage.js
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { getUserById, putUser } from "../service/user";
import { UserContext } from "../context/useContext";

const UpdateUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [state] = useContext(UserContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(state.user.id);
        setUserData(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        message.error("Error fetching user data.");
        console.error(error);
      }
    };

    fetchUser();
  }, [id, form]);

  const handleBack = () => {
    navigate(-1);
  };

  const onFinish = async (values) => {
    try {
      await putUser(values, state.user.id);
      message.success("User updated successfully!");
      navigate("/");
    } catch (error) {
      message.error("Error updating user.");
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="button-back">
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={handleBack}
            style={{ marginBottom: 16 }}
          >
            Back
          </Button>
        </div>
        <h1>Update User</h1>
        <Form form={form} onFinish={onFinish}>
          {" "}
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update User
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUserPage;
