import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import Agendamento from '../views/Agendamento.vue'
import PainelAdmin from '../views/PainelAdmin.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/cadastro', component: Cadastro },
  { path: '/agendar', component: Agendamento },
  { path: '/admin', component: PainelAdmin },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
