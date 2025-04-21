# IOA Web Application

> A Tweet search and insights tool with a React frontend and Flask/Elasticsearch backend.

---
## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Repository Structure](#repository-structure)
3. [Clone the Repositories](#clone-the-repositories)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Usage](#usage)
7. [How It Works](#how-it-works)
8. [Production Build & Deployment](#production-build--deployment)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Ensure the following are installed on your machine:

- **Node.js & npm** (v14+ recommended)
- **Python** (v3.8+)
- **Git** (optional, for cloning the repos)
- **Elasticsearch** instance (remote or local)

---

## Repository Structure

The project is split into two Git repositories:

- **Frontend**: React application (UI components, charts, filters)
- **Backend**: Flask API server (Elasticsearch queries, aggregations)

---

## Clone the Repositories

```bash
# Frontend:
git clone https://github.com/ASD-at-GMF/info_ops_archive.git frontend

# Backend:
git clone https://github.com/ASD-at-GMF/ioa_search.git backend
```

---

## Backend Setup

Navigate into the backend folder and follow these steps:

1. **Create & activate a virtual environment**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate    # macOS/Linux
   venv\Scriptsctivate       # Windows
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   - Create a `.env` file in `backend/`:
     ```env
     ES_HOST=<your-elasticsearch-host>
     ES_PORT=<port>
     ES_USER=<username>
     ES_PASSWORD=<password>
     ```

4. **Run the Flask server**
   ```bash
   export FLASK_APP=app.py
   flask run --host=0.0.0.0 --port=5000
   ```
   - API URL: `http://localhost:5000`
   - CORS is enabled for `http://localhost:3000` by default.

---

## Frontend Setup

In a new terminal, navigate to the frontend folder:

1. **Install Node.js dependencies**
   ```bash
   navigate to front end file
   npm install
   ```

2. **Configure API endpoint**
   - By default, API calls go to `http://localhost:5000`.
   - To use a proxy instead of hard-coded URLs, add to `frontend/package.json`:
     ```json
     "proxy": "http://localhost:5000"
     ```
   - Then fetch from `/search?...` in code.

3. **Start the development server**
   ```bash
   npm start        # Create React App
   # OR
   npm run dev      # Vite-based projects
   ```
   - App URL: `http://localhost:3000` (CRA) or `http://localhost:5173` (Vite)

---

## Usage

1. Open your browser at `http://localhost:3000`.
2. Enter a keyword or hashtag in the search bar and hit **Enter** or click **Search**.
3. View tweet results and interactive charts based on your query.
4. Use filters (language, date range, sort) and download results as CSV.

---

1. **Search Flow**:
   - React sends a GET request to `/search?query=...` on the Flask API.
   - Flask builds and executes an Elasticsearch query, returning JSON:
     ```json
     { "total": 123, "tweets": [ ... ] }
     ```
   - React parses the JSON and updates state, re-rendering results.

2. **Hashtag Insights**:
   - On load, React calls `/insights` to fetch top hashtags and aggregations.
   - Flask returns aggregation buckets, which React displays via `Autocomplete`.

3. **CORS**:
   - Flask uses `flask_cors.CORS` to allow requests from the React origin.

---

## Production Build & Deployment

1. **Build React for production**:
   ```bash
   npm run build
   ```
2. **Serve static files**:
   - Copy `frontend/build` into Flask’s `static/` folder, or
   - Serve via Nginx/Apache and point API traffic to `backend`.
3. **Set up production env**:
   - Secure environment variables
   - Configure HTTPS

---
