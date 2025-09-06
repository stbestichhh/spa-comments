import { useState } from "react";
import { createComment } from "../api/api";
import Captcha from "./Captcha";
import { AxiosError } from 'axios';

interface Props {
  token: string;
  onNewComment: (comment: unknown) => void;
}

export default function CommentForm({ token, onNewComment }: Props) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [captcha, setCaptcha] = useState({ value: "", sessionId: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("text", text);
      if (file) formData.append("file", file);
      formData.append("captcha", captcha.value);
      formData.append("sessionId", captcha.sessionId);

      const res = await createComment(token, formData);
      onNewComment(res.data);
      setText("");
      setFile(null);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message || "Error");
      }
    }
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Captcha onCaptcha={setCaptcha} />
      <button type="submit">Submit</button>
    </form>
  );
}
