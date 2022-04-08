import Module from "./UserModule.vue";
import UsersPage from './views/UsersPage.vue';
import UserCreate from './views/UserCreate.vue';
import UserEdit from './views/UserEdit.vue';
import { RouteRecordRaw } from 'vue-router';

const moduleRoute : Array<RouteRecordRaw> = [{
  path: "/users",
  component: Module,
  children: [
    {
      path: "",
      component: UsersPage
    },
    {path: '/users/create', component: UserCreate},
    {path: '/users/:id/edit', component: UserEdit},
  ]
}]


export default moduleRoute