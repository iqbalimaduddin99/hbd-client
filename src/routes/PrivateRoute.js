import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../components/organism/Home";
import Update from "../pages/Update";
import NotFound from "../pages/Not Found";
import React, { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import { UserContext } from "../context/useContext";
import { getBirthDay } from "../service/user";
// import Logout from "./Logout";

function PrivateRoute() {
  const [state, dispatch] = useContext(UserContext);

  function fetchData() {
    getBirthDay()
      .then((response) => {
        if (response && response.message) {
          console.log(response);
          if (response.message === "Successfully Sent BirthDay") {
            dispatch({ type: "set_birthday", payload: "sent" });
          } else if (response.message === "The birthday has sent") {
            dispatch({ type: "set_birthday", payload: "close-sent" });
          }
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  const scheduleApiCall = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const scheduledTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      9,
      0,
      0
    );

    let timeoutId;

    if (
      currentHour > 9 ||
      (currentHour === 9 && currentMinutes > 0) ||
      (currentHour === 9 && currentMinutes < 0)
    ) {
      fetchData();
    }

    const timeDiff = scheduledTime - now;

    if (timeDiff > 0) {
      timeoutId = setTimeout(() => {
        fetchData();
        scheduleApiCall();
      }, timeDiff);
    } else {
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);
      const nextDayTimeDiff = tomorrow - now;

      timeoutId = setTimeout(() => {
        fetchData();
        scheduleApiCall();
      }, nextDayTimeDiff);
    }

    return timeoutId;
  };

  useEffect(() => {
    let timeoutId;

    if (state.isLogin) {
      timeoutId = scheduleApiCall();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [state.isLogin]);

  return (
    <Routes>
      <Route exact path="/update" element={<Update />} />
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PrivateRoute;
