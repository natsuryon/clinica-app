const axios = require("axios");

async function buscarCEP(cep) {
  const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

  return resposta.data;
}

module.exports = buscarCEP;
