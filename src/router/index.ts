import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

//layouts
import WrapperPage from '@/layouts/WrapperPage.vue'

import DashboardPage from '@/pages/DashboardPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'

//routes from the module
import ProductRoutes from '@/modules/products/router'
import OrderRoutes from '@/modules/orders/router'
import RoleRoutes from '@/modules/roles/router'
import UserRoutes from '@/modules/users/router'

const routes: Array<RouteRecordRaw> = [
  {path: '/register', component: RegisterPage},
  {path: '/login', component: LoginPage},
  {
    path: '',
    component: WrapperPage,
    children: [
      {path: '', component: DashboardPage},
      {path: '/profile', component: ProfilePage},
      ...OrderRoutes,
      ...ProductRoutes,
      ...RoleRoutes,
      ...UserRoutes
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
