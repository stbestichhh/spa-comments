import { useEffect, useState } from "react";
import { getCaptcha } from "../api/api";

interface Props {
  onCaptcha: (data: { value: string; sessionId: string }) => void;
}

export default function Captcha({ onCaptcha }: Props) {
  const [svg, setSvg] = useState("");
  const [sessionId, setSessionId] = useState("");

  const fetchCaptcha = async () => {
    const res = await getCaptcha();
    setSvg(res.data.svg);
    setSessionId(res.data.sessionId);
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: svg }}
        style={{ border: "1px solid #ccc", display: "inline-block", padding: "4px" }}
      />
      <button type="button" onClick={fetchCaptcha}>
        Refresh
      </button>
      <input
        placeholder="Enter captcha"
        onChange={(e) => onCaptcha({ value: e.target.value, sessionId })}
        required
      />
    </div>
  );
}
