const axios = require("axios");

async function verificarClima(cidade) {
  try {
    const resposta = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.OPENWEATHER_API_KEY}&lang=pt_br&units=metric`,
    );

    return {
      cidade: resposta.data.name,
      temp: resposta.data.main.temp,
      descricao: resposta.data.weather[0].main,
      descricao_pt: resposta.data.weather[0].description,
      chuva: resposta.data.rain?.["1h"] || 0,
      alerta: resposta.data.weather[0].main.toLowerCase().includes("rain")
        ? "Previsão de chuva!"
        : "Sem previsão de chuva.",
    };
  } catch (err) {
    throw new Error(`Erro ao buscar clima: ${err.message}`);
  }
}

module.exports = verificarClima;
