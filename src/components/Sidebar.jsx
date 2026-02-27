export default function Sidebar({ activeNav, onNavSelect }) {
  const navItems = [
    { icon: "grid_view", label: "Dashboard" },
    { icon: "sensors", label: "Sensor Grid" },
    { icon: "ssid_chart", label: "Analytics" },
    { icon: "water_drop", label: "Irrigation Control" },
    { icon: "map", label: "Field Maps" },
  ];
  const settingsItems = [
    { icon: "group", label: "Team" },
    { icon: "settings", label: "System Config" },
  ];

  return (
    <aside className="w-[280px] bg-forest-green text-white flex flex-col flex-shrink-0 h-full">
      <div className="h-20 flex items-center px-8 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">eco</span>
          <span className="text-xl font-bold tracking-tight">AgriSense</span>
        </div>
      </div>
      <nav className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto scrollbar-hide">
        <div className="text-xs font-semibold text-sage-green uppercase tracking-wider px-4 mb-2">Main Menu</div>
        {navItems.map((item) => {
          const isActive = activeNav === item.label;
          const isSensorGrid = item.label === "Sensor Grid";
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavSelect(item.label)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors w-full text-left ${
                isActive ? "text-white bg-white/10" : "text-sage-green hover:text-white hover:bg-white/5"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={isSensorGrid && isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
        <div className="mt-8 text-xs font-semibold text-sage-green uppercase tracking-wider px-4 mb-2">Settings</div>
        {settingsItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-sage-green hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            JD
          </div>
          <div className="overflow-hidden min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-sage-green truncate">Field Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
