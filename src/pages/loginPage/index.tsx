import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login</h2>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button>Login</button>
        <button>Close</button> {/* Botón para cerrar el modal */}
      </div>
    </div>
  );
};

export default Login;
