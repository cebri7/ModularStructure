<template>
  <form @submit.prevent="submit">
    <div class="mb-3 mt-3 row">
      <label>Name</label>
      <input v-model="formData.name" class="form-control" name="name">
    </div>

    <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Permissions</label>
        <div class="col-sm-10">
          <div class="form-check form-check-inline col-3" v-for="permission in permissionList" :key="permission['id']">
            <input @change="select(permission['id'],$event)" :value="permission['id']" :checked="checked(permission['id'])" class="form-check-input" type="checkbox">
            <label class="form-check-label">{{permission['name']}}</label>
          </div>
        </div>
    </div>

    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
  import {reactive, onMounted, ref, defineComponent} from 'vue'
  import axios from 'axios'
  import { useRouter, useRoute } from 'vue-router'
  import {Permission} from '@/models/permissions'

  export default defineComponent({
    name:'RoleEdit',
    setup() {
      const {push} = useRouter()
      const {params} = useRoute()

      const formData = reactive({
        name: '',
        permissions: [] as number[]
      })

      onMounted( async ()=>{
        const {data} = await axios.get('permissions')

        permissionList.value = data

        const response = await axios.get(`roles/${params.id}`)
        
        formData.name = response.data.name 
        formData.permissions = response.data.permissions.map((p:Permission) => p.id)
      })

      const permissionList = ref([])

      const select = (id: number, event: Event ) =>{
        if((event.target as HTMLInputElement).checked){
          formData.permissions = [...formData.permissions, id]
          return;
        }

        formData.permissions = formData.permissions.filter((p: number) => p !== id)
      }

      const checked = (id: number) =>{
        return formData.permissions.some(p => p === id)
      }

      const submit = async () =>{
        try{
          await axios.put(`roles/${params.id}`, formData);
        }catch(e){
          console.log(e)
        }
        

        await push('/roles')
      }

      return {
        formData,
        select,
        submit,
        permissionList,
        checked
      }
    }
  })
</script>
