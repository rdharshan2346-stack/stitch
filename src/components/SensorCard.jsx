function Sparkline({ path, strokeColor, endCy }) {
  return (
    <div className="h-12 w-20 relative opacity-75">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 80 40">
        <path
          d={path}
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeWidth="2"
        />
        <circle cx="80" cy={endCy} fill={strokeColor} r="2" />
      </svg>
    </div>
  );
}

export default function SensorCard({ sensor }) {
  const { id, status, value, location, timeAgo, sparkPath, sparkEndCy, strokeColor } = sensor;

  const statusConfig = {
    active: {
      dotClass: "bg-primary animate-pulse",
      labelClass: "text-primary",
      label: "Active",
      valueClass: "text-slate-800",
      cardClass: "bg-white border-slate-100",
    },
    warning: {
      dotClass: "bg-yellow-400 animate-pulse",
      labelClass: "text-yellow-600",
      label: "Warning",
      valueClass: "text-yellow-600",
      cardClass: "bg-white border-slate-100",
    },
    inactive: {
      dotClass: "bg-slate-400",
      labelClass: "text-slate-500",
      label: "Inactive",
      valueClass: "text-slate-400",
      cardClass: "bg-slate-50 border-slate-200 opacity-80",
    },
    error: {
      dotClass: "bg-red-500 animate-pulse",
      labelClass: "text-red-600",
      label: "Error",
      valueClass: "text-red-600",
      cardClass: "bg-white border-slate-100",
    },
  };

  const config = statusConfig[status] || statusConfig.active;
  const displayValue = value !== null ? (status === "error" ? "Err" : `${value}%`) : "--%";

  const renderChart = () => {
    if (status === "inactive") {
      return (
        <div className="h-12 w-20 flex items-center justify-center text-slate-300 text-xs">No Data</div>
      );
    }
    if (status === "error") {
      return (
        <div className="h-12 w-20 flex items-center justify-center text-red-300 text-xs">Sensor Fail</div>
      );
    }
    return <Sparkline path={sparkPath} strokeColor={strokeColor} endCy={sparkEndCy} />;
  };

  const borderClass = status === "inactive" ? "border-slate-200" : "border-slate-50";
  const shadowClass = status === "inactive" ? "shadow-inner" : "shadow-card hover:shadow-md";

  return (
    <div
      className={`rounded-xl p-5 ${config.cardClass} ${shadowClass} transition-all duration-200 border cursor-pointer group ${config.cardClass.includes("bg-white") ? "" : ""}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${config.dotClass}`} />
          <span className={`text-xs font-semibold uppercase tracking-wider ${config.labelClass}`}>
            {config.label}
          </span>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            status === "inactive" ? "text-slate-400 bg-white" : "text-slate-400 bg-slate-50"
          }`}
        >
          {id}
        </span>
      </div>
      <div className="flex items-end justify-between mb-2">
        <div className="flex flex-col">
          <span className="text-sm text-slate-500 mb-0.5">Moisture</span>
          <span className={`text-4xl font-bold ${config.valueClass}`}>{displayValue}</span>
        </div>
        {renderChart()}
      </div>
      <div className={`flex items-center gap-1 mt-4 pt-4 border-t ${borderClass}`}>
        <span className="material-symbols-outlined text-slate-400 text-sm">location_on</span>
        <span className="text-xs font-medium text-slate-500">{location}</span>
        <span className="ml-auto text-xs text-slate-400">{timeAgo}</span>
      </div>
    </div>
  );
}
