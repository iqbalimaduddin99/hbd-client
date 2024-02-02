import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/organism/Login";    
import CreateUserForm from "../components/organism/Register"; 

function Home() {

  return (
    <div className="login-page" >
        <>
          <LoginForm />
        </>
    </div>
  );
}

export default Home;
