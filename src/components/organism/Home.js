import React, { useContext } from "react";
import { Button, Space, Modal, message, Popconfirm } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { deletUser } from "../../service/user";
import { UserContext } from "../../context/useContext";

const AccountPage = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  const handleUpdate = () => {
    navigate("/update");
  };

  const handleLogout = () => {
    dispatch({
      type: "logout",
      payload: {},
    });
    navigate("/");
    message.success("Logout successful");
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: "Delete Account",
      content:
        "It will delete permanently. Are you sure you want to delete your account?",
      async onOk() {
        try {
          const response = await deletUser(state.user.id);
          message.success("User deleted successfully!");
          dispatch({
            type: "logout",
            payload: {},
          });
          navigate("/");
        } catch (error) {
          message.error("Error delete user.");
          console.error(error);
        }
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 1,
        }}
      >
        <Space>
          <Popconfirm
            title="Are you sure want to logout?"
            onConfirm={handleLogout}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<LogoutOutlined />}>
              Logout
            </Button>
          </Popconfirm>
        </Space>
      </div>
      <Space>
        <Button type="primary" onClick={handleUpdate}>
          Update Account
        </Button>
        <Button type="primary" danger onClick={handleDelete}>
          Delete Account
        </Button>
      </Space>
    </div>
  );
};

export default AccountPage;
