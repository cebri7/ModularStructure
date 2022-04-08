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
            <input @change="select(permission['id'],$event)" :value="permission['id']" class="form-check-input" type="checkbox">
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
import { useRouter } from 'vue-router'

  export default defineComponent({
    name:'RoleCreate',
    setup() {
      const {push} = useRouter()
      const formData = reactive({
        name: '',
        permissions: [] as number[]
      })

      const permissionList = ref([])
      const select = (id: number, event: Event ) =>{
        if((event.target as HTMLInputElement).checked){
          formData.permissions = [...formData.permissions, id]
          return;
        }

        formData.permissions = formData.permissions.filter((p: number) => p !== id)
      }

      onMounted( async ()=>{
        const {data} = await axios.get('permissions')

        permissionList.value = data
      })

      const submit = async () =>{
        try{
          await axios.post('roles', formData);
        }catch(e){
          console.log(e)
        }
        

        await push('/roles')
      }

      return {
        formData,
        select,
        submit,
        permissionList
      }
    }
  })
</script>
