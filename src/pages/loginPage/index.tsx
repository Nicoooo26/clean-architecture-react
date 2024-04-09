import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
        <Link to="/home">
          <button>Close</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
