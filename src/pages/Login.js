import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { AuthContext } from "../context/auth.context";

const Login = () => {
  const { authenticateUser } = useContext(AuthContext);

  const [error, setError] = useState(null);

  const [checkUser, setCheckUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCheckUser((recent) => ({ ...recent, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/login", checkUser)
      .then((results) => {
        setError(null);
        navigate(`/`);
        localStorage.setItem("authToken", results.data.token);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      })
      .finally(() => {
        authenticateUser();
      });
  };

  return (
    <div id="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label id="email">Email </label>
        <input
          type="email"
          name="email"
          value={checkUser.email}
          onChange={handleChange}
        ></input>
        <div id="passlabel">
          <label className="passwordLabel">Password </label>
          <input
            className="passwordInput"
            type="password"
            name="password"
            value={checkUser.password}
            onChange={handleChange}
          ></input>
        </div>
        {error && <p>Error: {error}</p>}
        <div>
          <button className="loginBtn" type="submit">
            <img
              id="loginImg"
              src="https://cdn-icons-png.flaticon.com/512/854/854184.png"
            ></img>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
