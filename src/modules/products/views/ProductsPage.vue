<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link to="/products/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="product in products" :key="product.id">
              <td>{{product.id}}</td>
              <td><img :src="product.image" width="58" loading="lazy"/></td>
              <td>{{product.title}}</td>
              <td>{{product.description}}</td>
              <td>{{product.price}}</td>
              <td>
                <div class="btn-group mr-2">
                <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(product.id)"> Delete </a>
                <router-link :to="`/products/${product.id}/edit`" class="btn btn-sm btn-outline-secondary" > Edit </router-link>
                </div>
              </td>
          </tr>
      </tbody>
    </table>
  </div>


  <PaginatorComponentVue :last-page="lastPage" @page-changed="load($event)"/>
</template>


<script lang="ts">
import {onMounted, ref, watch, defineComponent} from 'vue'
import axios from 'axios'
import {Products} from '@/models/products'
import PaginatorComponentVue from '@/common/components/PaginatorComponent.vue'

export default defineComponent({
    name: 'ProductsPage',
    components: {PaginatorComponentVue},
    setup() {
        const products = ref<Products[]>([])
        const lastPage = ref(0)

        const load = async (page = 1)=>{
            const {data} = await axios.get(`products?page=${page}`)

            products.value = data.data
            lastPage.value = data.meta.last_page
        }
        onMounted(load)

        const del = async (id: number) => {
            if(confirm('Are you sure?')){
                try{
                    await axios.delete(`products/${id}`)
                    products.value = products.value.filter((p: Products) => p.id !== id)
                }catch (e){
                    console.log(e)
                }
            }
        }

        return {
            products,
            del,
            lastPage,
            load
        }
        
    }

})
</script>
