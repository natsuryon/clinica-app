const mongoose = require("mongoose");
const dns = require("dns");

// Força o Node a usar servidores DNS públicos (evita erros de querySrv em algumas redes/hosts)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Erro ao conectar:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
