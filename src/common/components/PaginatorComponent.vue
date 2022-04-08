<template>
    <nav>
        <ul class="pagination">
        <li class="page-item">
            <a class="page-link" href="javascript:void(0)" @click="prev">Previous</a>
        </li>
        <li class="page-item">
            <a class="page-link" href="javascript:void(0)" @click="next">Next</a>
        </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { ref, watch, SetupContext, defineComponent } from 'vue'

export default defineComponent({
    name:'PaginatorComponent',
    emits:['page-changed'],
    props: {lastPage: {type: Number, default: 0}},
    setup(props, context:SetupContext) {

        const page = ref(1)
        //console.log(props.lastPage as number)
        watch(page, ()=>{
            context.emit('page-changed', page.value)
        })

        const next = () =>{
            if(page.value < props.lastPage){
                page.value++
            }
        }
        const prev = () =>{
            if(page.value > 1){
                page.value--
            }
        }

        return{
            next,
            prev
        }
    },
})
</script>
