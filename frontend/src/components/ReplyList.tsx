import { useState } from "react";
import { getReplies, type Comment } from "../api/api";

interface Props {
  parentId: string;
}

export default function ReplyList({ parentId }: Props) {
  const [replies, setReplies] = useState<Comment[]>([]);
  const [visible, setVisible] = useState(false);

  const loadReplies = async () => {
    if (!visible) {
      const res = await getReplies(parentId);
      setReplies(res.data);
    }
    setVisible(!visible);
  };

  if (!replies.length && !visible) {
    return (
      <button onClick={loadReplies} style={{ marginLeft: "20px" }}>
        Show replies
      </button>
    );
  }

  return (
    <div style={{ marginLeft: "20px" }}>
      <button onClick={loadReplies}>
        {visible ? "Hide replies" : "Show replies"}
      </button>
      {visible &&
        replies.map((r) => (
          <div key={r.comment_id} className="comment" style={{ marginLeft: "20px" }}>
            <p dangerouslySetInnerHTML={{ __html: r.text }} />
            <small>
              by {r.user?.username ?? "unknown"} ({r.user?.email ?? "—"}) at{" "}
              {new Date(r.createdAt).toLocaleString()}
            </small>
          </div>
        ))}

    </div>
  );
}
