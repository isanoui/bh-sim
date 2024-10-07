import { useCallback, useEffect, useState } from "react"
import simulateDetections from "./scripts/simulateDetections"
import { Detection, DetectionMessage } from "./types/detections"
import DetectionTable from "./analytics/DetectionTable"
import RssiHistogram from "./analytics/RssiHistogram"

function App() {
  // Detections Database
  const [detectionMessages, setDetectionMessages] = useState<DetectionMessage[]>([])
  const [topBands, setTopBands] = useState<Record<string, number>>({})
  const [topClassifications, setTopClassifications] = useState<Record<string, number>>({})

  // Get highest counts for band and classification
  const setTopBandAndClassificationVals = useCallback((messages: DetectionMessage[]) => {
    // Extract detections from messages and remove duplicate drone id entries
    const uniqueDroneDetections = messages
      .flatMap((message) => message.detections)
      .reduce<Detection[]>((acc, current) => {
        if (!acc.find((item) => item.drone_id === current.drone_id)) {
          acc.push(current)
        }
        return acc
      }, [])

    // Get counts of all unique band types
    const bandCount = uniqueDroneDetections.reduce((acc, detection) => {
      acc[detection.band] = (acc[detection.band] || 0) + 1
      return acc
    }, {} as { [key: string]: number })

    // Get counts of all unique classification types
    const classificationCount = uniqueDroneDetections.reduce((acc, detection) => {
      acc[detection.classification] = (acc[detection.classification] || 0) + 1
      return acc
    }, {} as { [key: string]: number })

    // Get key that has highest value
    const maxBandKey = Object.keys(bandCount).reduce((a, b) =>
      bandCount[a] > bandCount[b] ? a : b
    )
    const maxClassificationKey = Object.keys(classificationCount).reduce((a, b) =>
      classificationCount[a] > classificationCount[b] ? a : b
    )

    setTopBands({ [maxBandKey]: bandCount[maxBandKey] })
    setTopClassifications({ [maxClassificationKey]: classificationCount[maxClassificationKey] })
  }, [])

  // Our actual script, calls our simulation function every 3 seconds and updates database state
  useEffect(() => {
    const interval = setInterval(() => {
      const detectionMessage = simulateDetections(
        detectionMessages[detectionMessages.length - 1]?.detections || []
      )

      // append new message to database state and update top band/class values
      setDetectionMessages((messageArray) => {
        const newMessageArray = [...messageArray, detectionMessage]
        setTopBandAndClassificationVals(newMessageArray)
        return newMessageArray
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [detectionMessages, setTopBandAndClassificationVals])

  // Render all our components
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <DetectionTable
        detections={detectionMessages[detectionMessages.length - 1]?.detections || []}
      />
      <RssiHistogram messages={detectionMessages} />
      <p>
        Top Band: {Object.keys(topBands)[0]} -- Band Count: {Object.values(topBands)[0]}
      </p>
      <p>
        Top Classification: {Object.keys(topClassifications)[0]} -- Classification Count:{" "}
        {Object.values(topClassifications)[0]}
      </p>
      <p>Message Count: {detectionMessages.length}</p>
    </div>
  )
}

export default App
