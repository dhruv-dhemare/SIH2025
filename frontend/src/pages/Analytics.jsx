import PieChart from "../components/PieChart";
import Graph from "../components/Graph";

export default function Analytics() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Analytics</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
          flexWrap: "wrap", // makes them stack on smaller screens
        }}
      >
        <div style={{ flex: 1, maxWidth: "50%" }}>
          <PieChart />
        </div>
        <div style={{ flex: 1, maxWidth: "50%" }}>
          <Graph />
        </div>
      </div>
    </div>
  );
}
