# AgriSense Backend (FastAPI + MySQL)

## Local development (no Docker)

1. Create a MySQL database and set env vars (or use defaults):
   - `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE` (default: agrisense/agrisense/localhost/3306/agrisense)

2. Install and run:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

3. API docs: https://stitch-xvrj.onrender.com/docs  
   CORS is enabled for the React frontend at http://localhost:5173.

## Docker (production-style)

From project root:
```bash
docker compose up -d
```
- API: https://stitch-xvrj.onrender.com  
- MySQL: localhost:3306 (user `agrisense` / password `agrisense`, database `agrisense`)

## API overview

- **Sensors**: `GET /api/sensors`, `GET /api/sensors/{id}`, `POST /api/sensors`
- **Alerts**: `GET /api/alerts`, `GET /api/alerts/{id}`, `POST /api/alerts`
- **Health**: `GET /health`

Query params for list endpoints: `skip`, `limit`, and for sensors `status`, `location_zone`; for alerts `resolved`, `severity`.
