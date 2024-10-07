import { useEffect, useState } from "react";
import simulateDetections from "./scripts/simulateDetections";
import { DetectionMessage } from "./types/detections";
import DetectionTable from "./analytics/DetectionTable";

function App() {
  // Detections "Database"
  const [detections, setDetections] = useState<DetectionMessage[]>([]);

  // Our true script, calls our simulation function every 3 seconds and updates database state
  useEffect(() => {
    const interval = setInterval(() => {
      const msg = simulateDetections(
        detections[detections.length - 1]?.detections || []
      );
      setDetections((prevArray) => [...prevArray, msg]);
    }, 3000);

    return () => clearInterval(interval);
  }, [detections]);

  return (
    <>
      <DetectionTable
        detections={detections[detections.length - 1]?.detections || []}
      />
    </>
  );
}

export default App;
