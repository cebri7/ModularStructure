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
import { Api } from "@/services/Api"

export default defineComponent({
  name: 'WrapperPage',
  components: { MainNav,MainMenu},
  setup() {
    const store = useStore()
    const router = useRouter()
    onMounted(async ()=>{
        Api.getUser().then(response =>{
          const {data} = response
          store.dispatch('User/setUser', data)
        }).catch( error =>{
          console.log(error)
        })

    })
  }
})
</script>
