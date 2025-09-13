import PieChart from "../components/PieChart";
import Graph from "../components/Graph";
import AlumniMap from "../components/AlumniMap";
import "./Analytics.css";

export default function Analytics() {
  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Analytics</h1>
      <hr className="divider-alumni" />

      <div className="analytics-charts">
        <div className="analytics-chart">
          <PieChart  />
        </div>
        <div className="analytics-chart">
          <Graph />
        </div>
      </div>
      <center>
        
        <h1 className="analytics-title">Alumni Map</h1>
        <hr className="divider-alumni" />
          <div className="leaflet-container">
              <AlumniMap />
            </div>
        </center>
    </div>
  );
}
