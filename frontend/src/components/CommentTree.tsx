import { useState } from "react";
import { getReplies, type Comment } from "../api/api";
import ReplyForm from "./ReplyForm";

interface Props {
  comment: Comment;
  token: string | null;
}

export default function CommentTree({ comment, token }: Props) {
  const [replies, setReplies] = useState<Comment[]>([]);
  const [visible, setVisible] = useState(false);

  const loadReplies = async () => {
    if (!visible) {
      const res = await getReplies(comment.comment_id);
      setReplies(res.data);
    }
    setVisible(!visible);
  };

  const handleNewReply = (reply: Comment) => {
    setReplies((prev) => [...prev, reply]);
    if (!visible) setVisible(true);
  };

  return (
    <div style={{ marginLeft: "20px", marginTop: "10px" }}>
      <div className="comment">
        <p dangerouslySetInnerHTML={{ __html: comment.text }} />
        <small>
          by {comment.user?.username ?? "unknown"} ({comment.user?.email ?? "—"}) at{" "}
          {new Date(comment.createdAt).toLocaleString()}
        </small>

        <div style={{ marginTop: "5px" }}>
          <button onClick={loadReplies}>
            {visible ? "Hide replies" : "Show replies"}
          </button>
        </div>

        {token && <ReplyForm token={token} parentId={comment.comment_id} onNewReply={handleNewReply} />}
      </div>

      {visible &&
        replies.map((r) => (
          <CommentTree key={r.comment_id} comment={r} token={token} />
        ))}
    </div>
  );
}
