<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const nome = ref('')
const email = ref('')
const senha = ref('')

async function cadastrar() {
  await api.post('/auth/cadastro', {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
  })

  alert('Usuário criado')

  router.push('/')
}
</script>

<template>
  <h2>Cadastro</h2>

  <input v-model="nome" placeholder="Nome" />

  <input v-model="email" placeholder="Email" />

  <input v-model="senha" type="password" placeholder="Senha" />

  <button @click="cadastrar">Cadastrar</button>
</template>
