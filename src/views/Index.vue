<template>
<section>
    <ul class="form-ul">
        <li>
            <input type="number" placeholder="请输入数字" v-model='number' pattern="[0-9]*">
        </li>
        <li>
            <select name="" id="" >
                <option v-for='(item,i) in list' :key='i' :value="item.val">{{item.name}}</option>
            </select>
        </li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    <el-select v-model='form.select'>
        <el-option :value='item.val' :label='item.name' v-for="(item,i) in list" :key='i'></el-option>
    </el-select>

    <p style='margin-top:1rem;'>我的表单</p>
    <!-- <MyInput v-model='comp.mytxt' />
    <MyCheckbox v-model='comp.mychecked' />
    <MySelect v-model='comp.option' /> -->

    <Customer tagName='Input' v-model='comp.mytxt'/>
    <Customer tagName='Checkbox' v-model='comp.mychecked'/>
    <Customer tagName='Select' v-model='comp.option'/>
    <button @click='submit'>点我</button>

 
</section>
</template>
<script>
// import formComponents from '@/components'

import Customer from '@/components/Customer.vue'
export default {
    components: {
        Customer
    },
    data(){
        return{
            number:0,
            list:[{name:'one',val:1},{name:'two',val:2}],
            form:{
                select:null
            },
            comp:{
                mytxt:'',
                mychecked:false,
                option:{
                    select1:1,
                    select2:2,
                }
            },
          
        }
    },
    created(){
        this.wait()
    },
    methods:{
        wait(){
            setTimeout(() => {
                    this.form.select=1
            }, 2000);
        },
        submit(){
            console.log(this.comp)

        },
    }
}
</script>
<style lang='scss' scoped>
 section{
    font-size:.32rem;
    
    select{
        display: inline-block;
        width:5rem;
        height:1rem;
    }
 }
 select {
    /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
    border: solid 1px #000;
    /*很关键：将默认的select选择框样式清除*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    /*将背景改为红色*/
    background:transparent;
    /*加padding防止文字覆盖*/
    padding-right: 14px;
    outline: none;
}
/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
select::-ms-expand { display: none; }
</style>

