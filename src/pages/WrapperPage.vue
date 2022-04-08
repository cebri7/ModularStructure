<template>
  <MainNav />

  <div class="container-fluid">
    <div class="row">
      <MainMenu />

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import MainNav from "@/components/MainNav.vue"
import MainMenu from "@/components/MainMenu.vue"
import axios from 'axios'
import {onMounted,defineComponent} from 'vue'
import {useRouter} from 'vue-router'
import { useStore } from "vuex"

export default defineComponent({
  name: 'WrapperPage',
  components: { MainNav,MainMenu},
  setup() {
    const store = useStore()
    const router = useRouter()
    onMounted(async ()=>{
      try{
        const {data} = await axios.get('user')

        store.dispatch('User/setUser', data)
      }catch (e){
        await router.push('/login')
      }

    })
  }
})
</script>
