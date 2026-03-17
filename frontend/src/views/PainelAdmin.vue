<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const consultas = ref([])
const loading = ref(true)
const erro = ref('')

async function carregar() {
  try {
    loading.value = true
    const token = localStorage.getItem('token')

    const resposta = await api.get('/consultas/listar', {
      headers: {
        Authorization: token,
      },
    })

    consultas.value = resposta.data
  } catch (err) {
    erro.value = 'Erro ao carregar consultas: ' + (err.response?.data?.msg || err.message)
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(carregar)
</script>

<template>
  <h2>Painel Administrativo</h2>

  <div v-if="loading">
    <p>Carregando...</p>
  </div>

  <div v-if="erro" style="color: red; background-color: #f8d7da; padding: 10px; border-radius: 5px">
    {{ erro }}
  </div>

  <div v-if="!loading && !erro && consultas.length === 0">
    <p>Nenhuma consulta agendada.</p>
  </div>

  <table
    v-if="!loading && consultas.length > 0"
    border="1"
    style="width: 100%; border-collapse: collapse"
  >
    <thead>
      <tr>
        <th>Paciente</th>
        <th>Data</th>
        <th>Horário</th>
        <th>Endereço</th>
        <th>Alerta Clima</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="c in consultas" :key="c._id">
        <td>{{ c.paciente }}</td>
        <td>{{ new Date(c.data).toLocaleDateString('pt-BR') }}</td>
        <td>{{ c.horario }}</td>
        <td>{{ c.endereco }}</td>
        <td style="background-color: #fff3cd">{{ c.alertaClima }}</td>
      </tr>
    </tbody>
  </table>
</template>
