import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function PieChart() {
  const data = {
    labels: ["IT", "Finance", "Education", "Healthcare", "Startups"],
    datasets: [
      {
        label: "Alumni by Industry",
        data: [45, 20, 15, 10, 10],
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 20, // explode effect on hover
        hoverBorderColor: "#000",
        hoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 14, weight: "bold" },
          padding: 15,
        },
      },
      title: {
        display: true,
        text: "Alumni by Industry",
        font: { size: 20, weight: "bold" },
        padding: { top: 20, bottom: 20 },
      },
      tooltip: {
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 6,
        padding: 10,
      },
    },
    animation: false, // 🚀 disables initial load animation
  };

  return (
    <div
      style={{
        width: "500px",
        marginRight: "100px auto",
        padding: "20px",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Pie data={data} options={options} />
    </div>
  );
}
