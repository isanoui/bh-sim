import { AgCharts } from "ag-charts-react"
import { AgChartOptions } from "ag-charts-community"
import { FC, useEffect, useMemo, useState } from "react"
import { DetectionMessage } from "../../types/detections"

interface HistogramProps {
  messages: DetectionMessage[]
}

const RssiHistogram: FC<HistogramProps> = ({ messages }) => {
  const [rssiHistory, setRssiHistory] = useState<{ rssi: number }[]>([])

  // Get rssis from last 5 minutes
  useEffect(() => {
    const fiveMinutesAgo = (Math.floor(Date.now() / 1000) - 5 * 60) * 1000

    const rssiLastFiveMinutes = messages
      .filter((message) => message.timestamp >= fiveMinutesAgo)
      .flatMap((message) => message.detections)
      .map((item) => ({ rssi: item.rssi }))

    setRssiHistory(rssiLastFiveMinutes)
  }, [messages])

  // Configure histogram
  // useMemo to cache data, saving processing cost
  const chartOptions: AgChartOptions = useMemo(
    () => ({
      title: {
        text: "RSSI Histogram (Last 5 Minutes)",
      },
      data: rssiHistory,
      series: [
        {
          type: "histogram",
          xKey: "rssi",
          xName: "RSSI",
          binCount: 45,
        },
      ],
      axes: [
        {
          type: "number",
          position: "bottom",
          title: { text: "RSSI" },
        },
        {
          type: "number",
          position: "left",
          title: { text: "Frequency" },
        },
      ],
    }),
    [rssiHistory]
  )

  return <AgCharts options={chartOptions} />
}

export default RssiHistogram
