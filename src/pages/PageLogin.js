import React from "react";
import { useState } from "react";
import { login } from "../utilities/userAuth";
import { useNavigate } from "react-router-dom";

export default function PageLogin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submitLogin = async (event) => {
    event.preventDefault();
    console.log("login", username, password);
    const result = await login(username, password);
    console.log(result);
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={submitLogin}>
        <input
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          placeholder="username"
        ></input>
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="text"
          placeholder="password"
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
