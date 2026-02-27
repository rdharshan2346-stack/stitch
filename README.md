# AgriSense Sensor Grid

React app converted from the original `code.html` AgriTech Sensor Grid UI.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # preview production build
```

## Project structure

- `src/App.jsx` – Main layout (sidebar + main content)
- `src/components/Sidebar.jsx` – Left navigation and user block
- `src/components/Header.jsx` – Page title, search, filter, add button
- `src/components/SensorGrid.jsx` – Grid of sensor cards and pagination
- `src/components/SensorCard.jsx` – Single sensor card (status, moisture, sparkline, location)
- `src/data/sensors.js` – Sample sensor data (10 cards, 128 total count)
- Tailwind theme in `tailwind.config.js` matches the original (primary green, forest-green, etc.)
