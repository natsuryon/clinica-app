<script setup>
import { ref } from 'vue'
import api from '../services/api'
import axios from 'axios'

const paciente = ref('')
const data = ref('')
const horario = ref('')
const cep = ref('')
const cidade = ref('')
const endereco = ref('')
const alertaClima = ref('')
const loading = ref(false)

async function buscarCEP() {
  try {
    loading.value = true
    const resposta = await axios.get(`https://viacep.com.br/ws/${cep.value}/json/`)

    if (resposta.data.erro) {
      alert('CEP inválido')
      return
    }

    endereco.value = resposta.data.logradouro + ' - ' + resposta.data.localidade
    cidade.value = resposta.data.localidade
  } catch (err) {
    alert('Erro ao buscar CEP')
    console.error(err)
  } finally {
    loading.value = false
  }
}

async function agendar() {
  try {
    if (!paciente.value || !data.value || !horario.value || !endereco.value) {
      alert('Por favor, preencha todos os campos')
      return
    }

    loading.value = true
    const token = localStorage.getItem('token')

    const resposta = await api.post(
      '/consultas/agendar',
      {
        paciente: paciente.value,
        data: data.value,
        horario: horario.value,
        endereco: endereco.value,
        cidade: cidade.value,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )

    alertaClima.value = resposta.data.consulta.alertaClima
    alert('Consulta agendada com sucesso!')

    // Limpar formulário
    paciente.value = ''
    data.value = ''
    horario.value = ''
    cep.value = ''
    cidade.value = ''
    endereco.value = ''
    alertaClima.value = ''
  } catch (err) {
    alert('Erro ao agendar: ' + (err.response?.data?.msg || err.message))
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <h2>Agendar Consulta</h2>

  <div>
    <label>Paciente:</label>
    <input v-model="paciente" placeholder="Nome paciente" />
  </div>

  <div>
    <label>Data:</label>
    <input v-model="data" type="date" />
  </div>

  <div>
    <label>Horário:</label>
    <input v-model="horario" type="time" />
  </div>

  <div>
    <label>CEP:</label>
    <input v-model="cep" placeholder="CEP" />
    <button @click="buscarCEP" :disabled="loading">
      {{ loading ? 'Buscando...' : 'Buscar CEP' }}
    </button>
  </div>

  <div v-if="endereco">
    <label>Endereço:</label>
    <p>{{ endereco }}</p>
  </div>

  <button @click="agendar" :disabled="loading">{{ loading ? 'Agendando...' : 'Agendar' }}</button>

  <div
    v-if="alertaClima"
    style="background-color: #fff3cd; padding: 10px; margin-top: 20px; border-radius: 5px"
  >
    <strong>Alerta do Tempo:</strong>
    <p>{{ alertaClima }}</p>
  </div>
</template>
