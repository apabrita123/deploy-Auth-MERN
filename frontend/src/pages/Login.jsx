import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const apiUrl = import.meta.env.VITE_APP_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  function changeIpHandler(e) {
    const { name, value } = e.target;
    setLoginInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return toast.error("All fields are required!");
    }
    try {
      const response = await fetch(`https://deploy-auth-mern-api-three.vercel.app/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, error, jwtToken, name } = result;
      if (success) {
        toast.success(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error.details[0].message;
        return toast.error(details);
      } else if (!success) {
        return toast.error(message);
      }
    } catch (error) {
      return toast.error(error);
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>

          <input
            type="email"
            onChange={changeIpHandler}
            name="email"
            placeholder="Enter your email..."
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={changeIpHandler}
            name="password"
            placeholder="Enter your password..."
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Does't have an account ?<Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
