import ownerStore from "../db/stores/owner";
import React from "react";
import {useState} from "react";
import { useEffect } from "react/cjs/react.production.min";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      window.location.href = "/dashboard";
    }
  }, [])

  async function login(event){
  event.preventDefault();
  var result = await ownerStore.login(email, password);
  if (result === "Invalid password") {
    alert(result);
  }
  else if (result === "Invalid email") {
    alert(result);
  }
  else {
    localStorage.setItem("user", result._id);
  }
}
    return (
    <div>
      <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
          <button onClick={login}>login</button>
          <p className="message">Not registered? <a href="/register">Create an account</a></p>
        </form>
      </div>
    </div>
    </div>
    );
    }