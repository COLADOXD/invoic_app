import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AddInvoiceView from '../views/AddInvoiceView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/invoic',
    name: 'invoic',
    component: AddInvoiceView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
