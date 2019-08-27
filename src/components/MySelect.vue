<template>
    <section>
        <p>我的下拉框</p>
        <el-select v-model='options.select1'>
            <el-option :value='item.val' :label='item.name' v-for="(item,i) in list" :key='i'></el-option>
        </el-select>
         <el-select v-model='options.select2'>
            <el-option :value='item.val' :label='item.name' v-for="(item,i) in list" :key='i'></el-option>
        </el-select>
    </section>
</template>
<script>
export default {
    //一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件
    props:['value'],
    data(){
        return {
            options:{},
            list:[{name:'one',val:1},{name:'two',val:2}],
        }
    },
    watch:{
        value:{
            handler(val){
                this.options=val
            },
            immediate:true,
            deep:true,
        },
        options:{
            handler(val){
                this.$emit('input',val)
            },
            deep:true,
        }
    }
}
</script>