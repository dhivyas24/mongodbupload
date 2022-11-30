import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn({ registered, setRegistered }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post("https://prrucs-5000.csb.app/signin", {
        email: data.get("email"),
        password: data.get("password"),
      });
      console.log(response);
      navigate("/welcome"); 
    } catch (error) {
      console.log(error.response.data);
      
    }
  };

  const routeToSignUp = () => {
    navigate("/signup"); 
  };

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <label htmlFor="remember">
          <input type="checkbox" id="remember" name="remember" /> Remember me
        </label>
        <button type="submit">Sign In</button>
        <p>
          Don't have an account?{" "}
          <a href="#" onClick={routeToSignUp}>
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
