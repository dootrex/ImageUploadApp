import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, confirmUser } from "../utilities/userAuth";

export default function PageRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [inConfirmation, setInConfirmation] = useState(false);

  const navigate = useNavigate();

  const submitSignupForm = async (event) => {
    event.preventDefault();
    console.log("sign the user up", username, email, password);
    const result = await signUp(username, password, email);
    setInConfirmation(true);
  };
  const submitConfirmEmail = async (event) => {
    event.preventDefault();

    const result = await confirmUser(username, confirmationCode);
    console.log(result); // SUCCESS
    if (result == "SUCCESS") {
      navigate("/login");
    }
    console.log("confirm email", confirmationCode);
  };

  return (
    <div>
      {!inConfirmation && (
        <form onSubmit={submitSignupForm} className="authform">
          <input
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            placeholder="username"
          ></input>
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="text"
            placeholder="email"
          ></input>
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="text"
            placeholder="password"
          ></input>
          <button type="submit">Sign Up</button>
        </form>
      )}

      {inConfirmation && (
        <form onSubmit={submitConfirmEmail}>
          <input
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            placeholder="username"
          ></input>
          <input
            onChange={(event) => setConfirmationCode(event.target.value)}
            type="text"
            placeholder="Confirmation Code"
          ></input>
          <button type="submit">Confirm</button>
        </form>
      )}
    </div>
  );
}
