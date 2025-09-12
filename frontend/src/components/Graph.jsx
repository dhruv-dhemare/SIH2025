import { useState } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

export default function PlacementHistory() {
  const [range, setRange] = useState(5); // default 5 years

  // Generate years dynamically
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: range }, (_, i) => currentYear - i).reverse();

  // Hardcoded random values
  const ceData = years.map(() => Math.floor(Math.random() * 100));
  const entcData = years.map(() => Math.floor(Math.random() * 80));
  const itData = years.map(() => Math.floor(Math.random() * 90));

  // Average
  const avgData = years.map(
    (_, idx) => (ceData[idx] + entcData[idx] + itData[idx]) / 3
  );

  const data = {
    labels: years,
    datasets: [
      {
        label: "CE",
        data: ceData,
        borderColor: "#36A2EB",
        backgroundColor: "#36A2EB",
        tension: 0.3,
      },
      {
        label: "ENTC",
        data: entcData,
        borderColor: "#FF6384",
        backgroundColor: "#FF6384",
        tension: 0.3,
      },
      {
        label: "IT",
        data: itData,
        borderColor: "#FFCE56",
        backgroundColor: "#FFCE56",
        tension: 0.3,
      },
      {
        label: "Average",
        data: avgData,
        borderColor: "#4BC0C0",
        backgroundColor: "#4BC0C0",
        borderDash: [5, 5],
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Placement History",
        font: { size: 18 },
      },
    },
    scales: {
      x: { title: { display: true, text: "Year" } },
      y: {
        title: { display: true, text: "No. of Students Placed" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      style={{
        width: "700px",   // fixed width
        height: "400px",  // fixed height
        maxWidth: "100%", // responsive fallback
        margin: "0 auto", // center align
        // padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="range" style={{ marginRight: "10px", fontWeight: "600" }}>
          Select Range:
        </label>
        <select
          id="range"
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          <option value={2}>Last 2 years</option>
          <option value={3}>Last 3 years</option>
          <option value={5}>Last 5 years</option>
          <option value={10}>Last 10 years</option>
          <option value={15}>Last 15 years</option>
          <option value={20}>Last 20 years</option>
          <option value={50}>Last 50 years</option>
        </select>
      </div>
      <div style={{ width: "100%", height: "500px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
