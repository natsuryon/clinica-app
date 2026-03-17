<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const senha = ref('')

async function login() {
  try {
    const resposta = await api.post('/auth/login', {
      email: email.value,
      senha: senha.value,
    })

    localStorage.setItem('token', resposta.data.token)

    router.push('/agendar')
  } catch (e) {
    alert('Login inválido.')
  }
}
</script>

<template>
  <h2>Login</h2>

  <input v-model="email" placeholder="Email" />

  <input v-model="senha" type="password" placeholder="Senha" />

  <button @click="login">Entrar</button>
</template>
