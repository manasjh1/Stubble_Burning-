import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/detection-history/")
      .then((res) => res.json())
      .then((data) => setHistory(data.detections));
  }, []);

  return (
    <div>
      <h1>📜 Detection History</h1>
      {history.length === 0 ? <p>No detections yet</p> : (
        <ul>
          {history.map((detection, index) => (
            <li key={index}>{JSON.stringify(detection)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
