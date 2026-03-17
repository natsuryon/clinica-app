require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const consultaRoutes = require("./routes/consultaRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados (usando db.js)
connectDB();

// Rotas
app.use("/auth", authRoutes);
app.use("/consultas", consultaRoutes);

// Rota base (evita erro "Cannot GET /")
app.get("/", (req, res) => {
  res.send("API da clínica funcionando.");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
