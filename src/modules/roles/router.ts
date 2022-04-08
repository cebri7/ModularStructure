import Module from "./RoleModule.vue";
import RolesPage from './views/RolesPage.vue';
import RolesCreate from './views/RoleCreate.vue';
import RoleEdit from './views/RoleEdit.vue';
import { RouteRecordRaw } from 'vue-router';

const moduleRoute : Array<RouteRecordRaw> = [{
  path: "/roles",
  component: Module,
  children: [
    {
      path: "",
      component: RolesPage
    },
    {path: '/roles/create', component: RolesCreate},
    {path: '/roles/:id/edit', component: RoleEdit}
  ]
}]


export default moduleRoute