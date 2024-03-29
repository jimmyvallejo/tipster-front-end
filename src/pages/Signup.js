import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { AuthContext } from "../context/auth.context";

const Signup = () => {
  const { authenticateUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser((recent) => ({ ...recent, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/signup", newUser)
      .then((results) => {
        setError(null);
        localStorage.setItem("authToken", results.data.token);
        navigate(`/`);
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
    <div className="signup">
      <h1>Signup</h1>
      <form className="signupform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleChange}
          required
        ></input>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleChange}
          required
        ></input>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required
        ></input>

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          required
        ></input>

        <button className="signupBtn" type="submit">
          <img
            id="loginImg"
            src="https://cdn-icons-png.flaticon.com/512/854/854184.png"
          ></img>
        </button>
        {error && <p>Error: {error}</p>}
      </form>
    </div>
  );
};

export default Signup;
