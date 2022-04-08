import Module from "./OrderModule.vue";
import OrdersPage from './views/OrdersPage.vue'
import { RouteRecordRaw } from 'vue-router'

const moduleRoute : Array<RouteRecordRaw> = [{
  path: "/orders",
  component: Module,
  children: [
    {
      path: "",
      component: OrdersPage
    }
  ]
}]


export default moduleRoute