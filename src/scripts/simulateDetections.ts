import { Detection, DetectionMessage } from "../types/detections";
import generateId from "./utils/generateId";
import generateRssi from "./utils/generateRssi";

const simulateDetections = (prevDetections: Detection[]): DetectionMessage => {
  const newDetections: Detection[] = [];
  const detectionTime = Math.floor(Date.now() / 1000);

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

  // Return new POST message
  return {
    msg_type: "detections",
    system: "detection_service",
    msg_id: generateId(),
    detections: newDetections,
    timestamp: detectionTime,
  };
};

export default simulateDetections;
