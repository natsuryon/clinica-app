const Consulta = require("../models/Consulta");
const verificarClima = require("../services/climaService");

exports.agendar = async (req, res) => {
  try {
    const { paciente, data, horario, endereco, cidade } = req.body;

    // Validações
    if (!paciente || !data || !horario || !endereco) {
      return res.status(400).json({ msg: "Todos os campos são obrigatórios." });
    }

    // Verificar se horário está disponível
    const existente = await Consulta.findOne({
      data: data,
      horario: horario,
    });

    if (existente) {
      return res.status(400).json({
        msg: "Horário indisponível, escolha outro horário.",
      });
    }

    // Buscar previsão de clima
    let alertaClima = "Não foi possível obter previsão do tempo.";
    try {
      if (cidade) {
        const clima = await verificarClima(cidade);
        alertaClima = `${clima.alerta} Temperatura: ${clima.temp}°C, ${clima.descricao_pt}`;
      }
    } catch (err) {
      console.error("Erro ao buscar clima:", err.message);
      alertaClima = "Erro ao obter previsão do tempo.";
    }

    const consulta = new Consulta({
      paciente,
      data,
      horario,
      endereco,
      alertaClima,
    });

    await consulta.save();

    res.json({ msg: "Consulta agendada com sucesso.", consulta });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Erro ao agendar consulta.", error: err.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const consultas = await Consulta.find();
    res.json(consultas);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Erro ao listar consultas.", error: err.message });
  }
};
