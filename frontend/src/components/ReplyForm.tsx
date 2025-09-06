import { useState } from "react";
import { createComment } from "../api/api";
import Captcha from "./Captcha";
import { type Comment } from '../api/api';
import { AxiosError } from 'axios';

interface Props {
  token: string;
  parentId: string;
  onNewReply: (reply: Comment) => void;
}

export default function ReplyForm({ token, parentId, onNewReply }: Props) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [captcha, setCaptcha] = useState({ value: "", sessionId: "" });
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("text", text);
      if (file) formData.append("file", file);
      formData.append("captcha", captcha.value);
      formData.append("sessionId", captcha.sessionId);
      formData.append("parentId", parentId.toString());

      const res = await createComment(token, formData);
      onNewReply(res.data);
      setText("");
      setFile(null);
      setShow(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message || "Error");
      }
    }
  };

  if (!show) {
    return (
      <button onClick={() => setShow(true)} style={{ marginTop: "5px" }}>
        Reply
      </button>
    );
  }

  return (
    <form className="box" onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <textarea
        placeholder="Write a reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Captcha onCaptcha={setCaptcha} />
      <button type="submit">Submit Reply</button>
      <button type="button" onClick={() => setShow(false)}>
        Cancel
      </button>
    </form>
  );
}
