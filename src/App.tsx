import { useEffect, useState } from "react";
import simulateDetections from "./scripts/simulateDetections";
import { DetectionMessage } from "./types/detections";
import GridExample from "./analytics/Table";

function App() {
  const [detections, setDetections] = useState<DetectionMessage[]>([]);

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
      <GridExample
        detections={detections[detections.length - 1]?.detections || []}
      />
    </>
  );
}

export default App;
