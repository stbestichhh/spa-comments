import { useState } from "react";
import { login, register } from "../api/api";
import { AxiosError } from 'axios';

interface Props {
  setToken: (token: string) => void;
}

export default function AuthForm({ setToken }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "register") {
        await register(form);
        alert("Registered! Now login.");
        setMode("login");
      } else {
        const res = await login({ email: form.email, password: form.password });
        setToken(res.data.token);
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message || "Error");
      }
    }
  };

  return (
    <div className="box">
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
      <p>
        {mode === "login" ? "No account?" : "Already have one?"}{" "}
        <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}
