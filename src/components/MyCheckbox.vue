<template>
    <section>
        <label for="">我的checkbox</label>
        <input type="checkbox" v-model='status' >
    </section>
</template>
<script>
export default {
    //一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，
    //但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。model 选项可以用来避免这样的冲突：
    props:{
        checked:Boolean,
    },
    model:{
        prop:'checked',
        event:'change',
    },
    data(){
        return {
            status:this.checked
        }
    },
    watch:{
        status(val){
            this.$emit('change',val)
        },
        checked:{
            handler(val){
                this.status=val
            },
            immediate:true,
        }
    }
}
</script>
<style scoped lang='scss'>

</style>