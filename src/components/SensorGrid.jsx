import { useMemo } from "react";
import SensorCard from "./SensorCard";
import { sensors, TOTAL_SENSORS } from "../data/sensors";

export default function SensorGrid({ searchQuery, sectorFilter }) {
  const filteredSensors = useMemo(() => {
    let list = sensors;
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((s) => s.id.toLowerCase().includes(q));
    }
    if (sectorFilter !== "all") {
      list = list.filter((s) => s.location.startsWith(`Sector ${sectorFilter}`));
    }
    return list;
  }, [searchQuery, sectorFilter]);

  const count = filteredSensors.length;
  const start = count > 0 ? 1 : 0;
  const end = count;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredSensors.map((sensor) => (
          <SensorCard key={sensor.id} sensor={sensor} />
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between text-sm text-slate-500">
        <span>
          Showing {start}-{end} of {count} sensors
          {count < TOTAL_SENSORS && ` (filtered from ${TOTAL_SENSORS})`}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-1 border border-slate-200 rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            Previous
          </button>
          <button
            type="button"
            className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
