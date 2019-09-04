<template>
<section class="bgk">
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
    
    <img src="../assets/images/a.png" alt="" id="myimg" @click='showImg'>
    
    
    <!-- 已注册组件的名字，或一个组件的选项对象 -->
    <component :is='component'></component>
</section>
</template>
<script>
// import formComponents from '@/components'

import Customer from '@/components/Customer.vue'
import html2canvas from 'html2canvas'
import MyInput from '@/components/MyInput.vue'
export default {
    components: {
        Customer
    },
    data(){
        return{
            component:MyInput,
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
            timer:null
          
        }
    },
    created(){
        this.wait()
    },
    mounted(){
        //模拟长按
        document.querySelector("#myimg").addEventListener('touchstart',()=>{
            this.timer = setTimeout(() => {
                            alert('i m down')
                        }, 800);

        })
        document.querySelector("#myimg").addEventListener('touchend',()=>{
            clearInterval(this.timer)
        })
    },
    methods:{
        wait(){
            setTimeout(() => {
                    this.form.select=1
            }, 2000);
        },
        submit(){
            console.log(this.comp)
            console.log(333333,event,arguments)
        },
        showImg(){
            //把页面变成canvas
            html2canvas(document.body,{width:'400',height:'400',scale:4}).then(function(canvas) {
                let div = document.createElement('div')
                div.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;background-color:#000";
                div.appendChild(canvas)
                div.addEventListener('click',()=>{
                    document.body.removeChild(div)
                })
                document.body.appendChild(div);
                // document.body.appendChild(canvas);
            });
            
            // let a = document.createElement('a')
            // a.href=event.target.getAttribute('src')
            // console.log(1111,a)
            // document.body.appendChild(a);
            // a.click()
        },
    }
}
</script>
<style lang='scss' >
 #app{
    // background:#010101 url(../assets/images/bg.jpg) no-repeat;    
    // background-size: 100% auto;
    // min-height: 100vh;
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

