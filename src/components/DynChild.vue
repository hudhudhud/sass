<script>
import MyInput from './MyInput.vue'
import MyCheckbox from './MyCheckbox.vue'
export default {
    name:'DynChild',
    props: { level: { type: Number, required: true } },
    components:{
        MyInput,
        MyCheckbox,
    },
    //要用render函数，把<template>给去掉
    render:function(h) {
        const tag = ['MyInput', 'MyCheckbox'][this.level]
        return h(tag, this.$slots.default)
    },
}
</script>