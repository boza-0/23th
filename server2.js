// Importar módulos
import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

// Ruta básica
app.get("/", (req, res) => {
  res.send("Servidor Express funcionando 🚀");
});

// Nueva ruta para devolver el JSON
app.get("/users", (req, res) => {
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error leyendo el archivo" });
    }
    res.json(JSON.parse(data));
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor en ejecución: http://localhost:${PORT}`);
});
