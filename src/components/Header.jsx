import { useState, useRef, useEffect } from "react";

const SECTOR_OPTIONS = [
  { value: "all", label: "All Sectors" },
  { value: "A", label: "Sector A" },
  { value: "B", label: "Sector B" },
  { value: "C", label: "Sector C" },
];

export default function Header({ searchQuery, onSearchChange, sectorFilter, onSectorChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentSectorLabel = SECTOR_OPTIONS.find((o) => o.value === sectorFilter)?.label ?? "Filter by Sector";

  return (
    <header className="h-20 bg-surface-light border-b border-slate-200 px-8 flex items-center justify-between flex-shrink-0 z-10">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-slate-800">Sensor Grid</h1>
        <p className="text-sm text-slate-500">128 Sensors Active • Real-time Monitoring</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
            placeholder="Search sensor ID..."
          />
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">filter_list</span>
            {currentSectorLabel}
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 z-20">
              <div className="py-1">
                {SECTOR_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onSectorChange(opt.value);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${
                      sectorFilter === opt.value ? "text-primary font-medium bg-primary/5" : "text-slate-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </header>
  );
}
