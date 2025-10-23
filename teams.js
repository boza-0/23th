import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

// Cargar datos una sola vez
const data = JSON.parse(fs.readFileSync("./teams.json", "utf8"));
const teams = data.teams;

// Ruta raíz
app.get("/", (req, res) => {
  res.send("⚽ API de equipos de fútbol en funcionamiento");
});

// Obtener todos los equipos
app.get("/teams", (req, res) => {
  res.json(teams);
});

// Obtener un equipo por ID
app.get("/teams/:id", (req, res) => {
  const teamId = parseInt(req.params.id);
  const team = teams.find(t => t.id === teamId);

  if (!team) return res.status(404).json({ error: "Equipo no encontrado" });
  res.json(team);
});

// Obtener todos los jugadores de un equipo
app.get("/teams/:id/players", (req, res) => {
  const teamId = parseInt(req.params.id);
  const team = teams.find(t => t.id === teamId);

  if (!team) return res.status(404).json({ error: "Equipo no encontrado" });
  res.json(team.players);
});

// Obtener un jugador específico de un equipo
app.get("/teams/:id/players/:playerId", (req, res) => {
  const teamId = parseInt(req.params.id);
  const playerId = parseInt(req.params.playerId);

  const team = teams.find(t => t.id === teamId);
  if (!team) return res.status(404).json({ error: "Equipo no encontrado" });

  const player = team.players.find(p => p.id === playerId);
  if (!player) return res.status(404).json({ error: "Jugador no encontrado" });

  res.json(player);
});

// Buscar jugadores por posición en un equipo
app.get("/teams/:id/players/position/:pos", (req, res) => {
  const teamId = parseInt(req.params.id);
  const pos = req.params.pos.toLowerCase();

  const team = teams.find(t => t.id === teamId);
  if (!team) return res.status(404).json({ error: "Equipo no encontrado" });

  const filtered = team.players.filter(p => p.position.toLowerCase() === pos);
  if (filtered.length === 0) {
    return res.status(404).json({ error: "No hay jugadores en esa posición" });
  }

  res.json(filtered);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`✅ Servidor en ejecución: http://localhost:${PORT}`);
});
