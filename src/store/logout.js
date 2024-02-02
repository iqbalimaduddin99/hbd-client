import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/useContext";

const Logout = () => {
  const history = useHistory();
  const [, dispatch] = useContext(UserContext);
  useEffect(() => {
    dispatch({ type: "logout", payload: {} });
    history.push("/");
  });
  return <h1>Logout</h1>;
};

export default Logout;
