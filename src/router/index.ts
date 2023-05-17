import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutInvoiceView from '../views/AboutInvoiceView.vue'
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
    component: AboutInvoiceView
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
