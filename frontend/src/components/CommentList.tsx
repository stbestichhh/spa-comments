import { useEffect, useState } from "react";
import { getComments, type Comment } from "../api/api";
import { io } from "socket.io-client";
import CommentTree from "./CommentTree";

interface Props {
  token: string | null;
}

export default function CommentList({ token }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"username" | "email" | "createdAt">("createdAt");
  const [order, setOrder] = useState<"ASC" | "DESC">("DESC");

  useEffect(() => {
    loadComments(1, sortBy, order);

    const socket = io("http://localhost:3000");
    socket.on("commentCreated", (c: Comment) => {
      if (!c.parentId) {
        setComments((prev) => [c, ...prev]);
      }
    });

    return () => void socket.disconnect();
  }, []);

  const loadComments = async (p = page, s = sortBy, o = order) => {
    const res = await getComments({ page: p, limit: 25, sortBy: s, order: o });
    if (p === 1) {
      setComments(res.data);
    } else {
      setComments((prev) => [...prev, ...res.data]);
    }
    setPage(p);
  };

  return (
    <div>
      <h2>Comments</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
          <option value="createdAt">Date</option>
          <option value="username">Username</option>
          <option value="email">Email</option>
        </select>
        <select value={order} onChange={(e) => setOrder(e.target.value as any)}>
          <option value="DESC">Desc</option>
          <option value="ASC">Asc</option>
        </select>
        <button onClick={() => loadComments(1, sortBy, order)}>Apply</button>
      </div>

      {comments.map((c) => (
        <CommentTree key={c.comment_id} comment={c} token={token} />
      ))}

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => loadComments(page + 1, sortBy, order)}>
          Load more
        </button>
      </div>
    </div>
  );
}
