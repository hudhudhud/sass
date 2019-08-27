<template>
    <section>
        <input type="text" v-model='txt' placeholder="我的输入框">
    </section>
</template>
<script>
export default {
    props:['value'],
    data(){
        return {
            txt:this.value
        }
    },
    watch:{
        txt(val){
            this.$emit('input',val)
        },
        value:{
            handler(val){
                this.txt=val
            },
            immediate:true,
        }
    }
}
</script>
<style scoped lang='scss'>
input{
    width:3rem;
    height:.5rem;
    outline: none;
    border-radius: .1rem;
    padding-left:.1rem;
    border:.01rem solid gray;
}
</style>