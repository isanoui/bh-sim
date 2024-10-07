import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { FC, useEffect, useMemo, useState } from "react";
import { Detection } from "../types/detections";

interface TableProps {
  detections: Detection[];
}

const DetectionTable: FC<TableProps> = ({ detections }) => {
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

  // Update currentTime state every second with new current unix time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Column Definitions
  // subtract current unix time from detection start time to get detection duration
  const colDefs: ColDef[] = useMemo(
    () => [
      { field: "drone_id" },
      { field: "start_time" },
      { field: "band" },
      { field: "classification" },
      {
        field: "duration",
        headerName: "Duration (in seconds)",
        valueGetter: (params) =>
          Math.ceil(currentTime - params.data.start_time),
      },
    ],
    [currentTime]
  );

  return (
    <div
      className={"ag-theme-quartz-dark"}
      style={{ width: "100vh", height: "50vh" }}
    >
      <AgGridReact
        rowData={detections}
        columnDefs={colDefs}
        defaultColDef={{ flex: 1 }}
        animateRows={true}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default DetectionTable;
