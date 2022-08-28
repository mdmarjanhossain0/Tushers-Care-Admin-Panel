import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AdminView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
