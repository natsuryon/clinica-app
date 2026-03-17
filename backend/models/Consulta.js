const mongoose = require("mongoose");

const ConsultaSchema = new mongoose.Schema({
  paciente: String,

  data: String,

  horario: String,

  endereco: String,

  alertaClima: String,
});

module.exports = mongoose.model("Consulta", ConsultaSchema);
