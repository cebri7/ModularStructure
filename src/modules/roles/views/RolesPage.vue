<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link to="/roles/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td>{{role.id}}</td>
          <td>{{role.name}}</td>
          <td>
            <div class="btn-group mr-2">
              <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(role.id)"> Delete </a>
              <router-link :to="`/roles/${role.id}/edit`" class="btn btn-sm btn-outline-secondary" > Edit </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import {ref, onMounted, defineComponent} from 'vue'
  import axios from 'axios'
  import {Role} from '@/models/roles'

  export default defineComponent({
    name:'RolesPage',
    setup() {
      const roles = ref([])

      const del = async (id: number) =>{
        if(confirm('Are you sure?')){
          try{
            await axios.delete(`roles/${id}`)
             roles.value = roles.value.filter((r: Role) => r.id !== id)
          }catch (e){
            console.log(e)
          }
        }
      }
      onMounted( async ()=> {
        const {data} =  await axios.get('roles')

        roles.value = data
      })

      return {
        roles,
        del
      }
    }
  })
</script>
