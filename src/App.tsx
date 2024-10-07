import { useEffect, useState } from "react"
import simulateDetections from "./scripts/simulateDetections"
import { DetectionMessage } from "./types/detections"
import DetectionTable from "./analytics/DetectionTable"
import RssiHistogram from "./analytics/RssiHistogram"

function App() {
  // Detections "Database"
  const [detectionMessages, setDetectionMessages] = useState<DetectionMessage[]>([])

  // Our true script, calls our simulation function every 3 seconds and updates database state
  useEffect(() => {
    const interval = setInterval(() => {
      const detectionMessage = simulateDetections(
        detectionMessages[detectionMessages.length - 1]?.detections || []
      )

      // append new message to "database" state
      setDetectionMessages((messageArray) => [...messageArray, detectionMessage])
    }, 3000)

    return () => clearInterval(interval)
  }, [detectionMessages])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <DetectionTable
        detections={detectionMessages[detectionMessages.length - 1]?.detections || []}
      />
      <RssiHistogram messages={detectionMessages} />
    </div>
  )
}

export default App
