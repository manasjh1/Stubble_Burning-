import { useState } from "react";

export default function DetectFire() {
  const [file, setFile] = useState(null);
  const [detections, setDetections] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/detect-fire/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setDetections(data.detections);
  };

  return (
    <div>
      <h1>🔥 Fire Detection System</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Detect</button>

      {detections.length > 0 && (
        <div>
          <h2>Detections:</h2>
          <pre>{JSON.stringify(detections, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
