import React from "react";
import { Link } from "react-router-dom";
import { currentUser, signOut } from "../utilities/userAuth";
import { useState, useEffect } from "react";

export default function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const user = currentUser();
      setUser(user);
    }
    checkUser();
  }, []);
  return (
    <header>
      <h1>
        <Link to="/">Awesome Image App</Link>
      </h1>
      {user == null ? (
        <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/">Hello {user.username}</Link>
            </li>
            <li>
              <a onClick={signOut}>Logout</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
