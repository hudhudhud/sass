<template>
        <section>
            <button @click='level = 0'>input</button>
            <button @click='level = 1'>checkbox</button>
            <hr>
            <DynChild :level="level"></DynChild>
            <p @click='click'>{{ary[0]}}</p>
            <ul class="links">
                <li>keep alive 测试</li>
                <li @click='$router.push("/degree")'>degree</li>
            </ul>
        </section>
</template>
<script>
//动态组件
import DynChild from '@/components/DynChild.vue'
export default {
    name:"dyn",
    components:{
        DynChild
    },
    data() {
        return {
             level: 0 ,
             ary:[0,1,2]
        };
    },
    mounted(){
        console.log('dyn mounted...')
    },
    methods:{
        click(){
            //vue检测不到数组下标的直接赋值
            ++this.ary[0]
            this.$set(this.ary,0,this.ary[0])
        }
    }
}
</script>