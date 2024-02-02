import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import { UserContext } from "../../context/useContext";

const BirthDay = () => {
  const [state, dispatch] = useContext(UserContext);

  const [isModalVisible, setModalVisible] = useState(
    state.isLogin && state.birthDay === "sent"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isModalVisible) {
      Modal.info({
        title: "Happy Birthday",
        content: (
          <p>Happy Birth Day! </p>
        ),
        onOk: () => {
          navigate("/");
          setModalVisible(false);
          dispatch({ type: "set_birthday", payload: "close-sent" });
        },
      });
    }
  }, [isModalVisible, navigate, dispatch]);
};


export default BirthDay;
