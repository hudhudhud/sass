<template>
    <!-- is后面可以是已注册组件的名字，或一个组件的选项对象 -->
    <component :is='"My"+tagName' v-model='val'>
    </component>
</template>
<script>
import formComponents from '@/components'
export default {
    components:formComponents,
    props:[
        'tagName',
        'value'
    ],
    data(){
        return {
            val:this.value
        }
    },
    watch:{
        value(val){
            this.val=val
        },
        val(v){
            this.$emit('input',v)
        }
    }
}
</script>