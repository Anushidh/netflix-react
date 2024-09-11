import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { login, signup } from "../../firebase";
import { toast } from 'react-toastify'

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (event) => {
    event.preventDefault();

    const trimmedEmail = email ? email.trim() : '';
    const trimmedPassword = password ? password.trim() : '';
    const trimmedName = name ? name.trim() : '';

    if (!trimmedEmail || !trimmedPassword) {
      toast.error("Email and Password cannot be empty");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (trimmedPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (signState === "Sign In") {
      await login(trimmedEmail, trimmedPassword);
    } else {
      if (!trimmedName) {
        toast.error("Name cannot be empty");
        return;
      }
      const namePattern = /^[A-Za-z\s]+$/;
      if (!namePattern.test(trimmedName)) {
        toast.error("Name can only contain letters.");
        return;
      }
      await signup(trimmedName, trimmedEmail, trimmedPassword);
    }
  };

  return (
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ? (
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Your name"
            />
          ) : (
            <></>
          )}
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
          />
          <button onClick={user_auth} type="submit">
            {signState}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor=""> Remember Me </label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have account?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
