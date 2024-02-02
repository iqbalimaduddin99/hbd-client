import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Switch,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import PrivateRoute from "./routes/PrivateRoute";
import { Modal } from "antd";
import { useContext, useEffect, useState } from "react";

import { UserContext, UserContextProvider } from "./context/useContext";
import Home from "./pages/Home";
import api from "./service/api";
import CreateUserPage from "./components/organism/Register";
import NotFound from "./pages/Not Found";

// Make the app don't reload
function App() {
  const [state, dispatch] = useContext(UserContext);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/user/authorization");

      if (!token || token == null) {
        dispatch({
          type: "logout",
          payload: {},
        });
        <Link to="/" />;
      } else {
        dispatch({
          type: "login_success",
          payload: { ...response.data, token },
        });
      }
    } catch (error) {
      console.log(error);
      if (error.status === "failed") {
        dispatch({
          type: "logout",
          payload: {},
        });
        <Link to="/" />;
      }
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  console.log("env", process.env);

  return (
      <Router>
        <Routes>
          {state.isLogin ? (
            <Route path="/*" element={<PrivateRoute />} />
          ) : (
            <>
              <Route exact path="/" element={<Home />} />
              <Route path="/create-user" element={<CreateUserPage />} />
              <Route path="/*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </Router>
  );
}

export default App;
