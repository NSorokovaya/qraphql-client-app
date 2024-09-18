import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../queries/login";
import { useMutation } from "@apollo/client";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await login({ variables: { username, password } });
    console.log(data);
    localStorage.setItem("token", data.data.login.token);
    navigate("/users");
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username
        <input onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Pasword
        <input onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}
