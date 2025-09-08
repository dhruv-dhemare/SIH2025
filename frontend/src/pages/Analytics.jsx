import PieChart from "../components/PieChart";
import Graph from "../components/Graph";
import "./Analytics.css"; // ✅ create this CSS file

export default function Analytics() {
  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Analytics</h1>

      <div className="analytics-charts">
        <div className="analytics-chart">
          <PieChart style={{ width: "500px", height: "300px", border: "1px solid #ccc" }} />

        </div>
        <div className="analytics-chart">
          <Graph style={{ width: "500px", height: "500px", border: "1px solid #ccc"}} />

        </div>
      </div>
    </div>
  );
}
