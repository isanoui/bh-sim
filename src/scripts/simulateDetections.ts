import { detectionStorage } from "../detectionStorage";
import { Detection } from "../types/detections";
import generateId from "./utils/generateId";
import generateRssi from "./utils/generateRssi";

const simulateDetections = (prevDetections: Detection[]) => {
  const newDetections: Detection[] = [];
  const detectionTime = Date.now();

  // Each previous detection has an 80% chance of making it into the new detections array
  // All values remain the same other than rssi
  prevDetections.forEach((detection) => {
    if (Math.random() < 0.8) {
      newDetections.push({
        ...detection,
        rssi: generateRssi(detection.rssi),
      });
    }
  });

  // Add new droneId detection
  newDetections.push({
    drone_id: generateId(),
    start_time: detectionTime,
    band: Math.random() < 0.5 ? "2.4GHz" : "5.8GHz",
    classification: Math.random() < 0.5 ? "OcuSync" : "Lightbridge",
    rssi: generateRssi(),
  });

  // Add new entry to storage array
  detectionStorage.push({
    msg_type: "detections",
    system: "detection_service",
    msg_id: generateId(),
    detections: newDetections,
    timestamp: detectionTime,
  });
};

export default simulateDetections;
