import { useEffect, useState } from "react";

export default function Admin() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/admin/analytics/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setAnalytics(data));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {analytics ? <p>Total Detections: {analytics.total_detections}</p> : <p>Loading...</p>}
    </div>
  );
}
