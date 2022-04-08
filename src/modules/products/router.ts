import Module from "./ProductModule.vue";
import ProductCreate from "./views/ProductCreate.vue";
import ProductEdit from "./views/ProductEdit.vue";
import ProductsPage from "./views/ProductsPage.vue";
import { RouteRecordRaw } from 'vue-router'

const moduleRoute : Array<RouteRecordRaw> = [{
  path: "/products",
  component: Module,
  children: [
    {
      path: "",
      component: ProductsPage
    },
    {
      path: "create",
      component: ProductCreate
    },

    {
      path: ":id/edit",
      component: ProductEdit
    }
  ]
}]

export default moduleRoute