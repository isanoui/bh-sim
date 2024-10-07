export type Detection = {
  drone_id: string
  start_time: number
  band: "2.4GHz" | "5.8GHz"
  classification: "OcuSync" | "Lightbridge"
  rssi: number
}

export type DetectionMessage = {
  msg_type: "detections"
  system: "detection_service"
  msg_id: string
  detections: Detection[]
  timestamp: number
}
