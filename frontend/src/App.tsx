import { useEffect, useState } from 'react';
import AuthForm from "./components/AuthForm";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  const handleSetToken = (t: string) => {
    setToken(t);
    localStorage.setItem("token", t);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="container">
      <h1>Comments App</h1>
      {!token ? (
        <AuthForm setToken={handleSetToken} />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <CommentForm token={token} onNewComment={() => {
          }}/>
          <CommentList token={token} />
        </>
      )}
    </div>
  );
}
