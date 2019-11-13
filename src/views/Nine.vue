<template>
    <section>
        <ul class="nine">
            <li v-for="(item,i) in list" :class="{btn:item===5,active:rollSort[currentActive]==i,disabled:(item===5&&clicked)}"
             :key="i" @click="item===5&&start()">
                {{item}}
            </li>
        </ul>
        <ul class="links">
            <li>keep alive 测试</li>
            <li @click='$router.push("/dyn")'>dyn</li>
        </ul>
    </section>
</template>
<script>
const list=(new Array(9)).fill(true).map((item,i)=>i+1);
export default {
    name:'nine',
    data(){
        return {
            currentActive:-1,//当前在rollSort中的index
            rollSort:[0,1,2,5,8,7,6,3],//滚动顺序
            list:list,
            speed:100,//初始速度
            step:30,//至少50次
            count:-1,
            timeId:null,
            target:-1,//中奖位置
            clicked:false,
        }
    },
    mounted(){
        console.log('nine mounted....')
       // this.roll()
    },
    methods:{
        start(){
            if(this.clicked){
                return
            }
            this.clicked=true
            this.count=-1
            this.currentActive=-1
            this.speed=100
            this.target=-1
            this.roll()
            this.target=parseInt(Math.random()*this.rollSort.length)
            console.log(this.target,this.list[this.rollSort[this.target]])
        },
        roll(){
         this.timeId= setTimeout(() => {
                this.count++      
                if(this.count>this.step&&this.currentActive===this.target){//转动次数大于基本步数并且当前已经到中奖位置
                    clearInterval(this.timeId)
                    this.clicked=false
                }
                else{
                    if(this.currentActive>=this.rollSort.length-1){
                        this.currentActive=0
                    }
                    else{
                        this.currentActive=this.count%this.rollSort.length
                    }
                    if(this.count>=this.step/2){
                        this.speed+=10
                    }
                    this.roll()
                }          
            },this.speed);
        }
    }

}
</script>
<style lang='scss' scoped>
.nine{
    width:100%;
    height: 100%;
    width:6rem;
    height: 6rem;
    xdisplay: flex;
    xflex-wrap: wrap;
    li{
        display: inline-block;
        width:2rem;
        height:2rem;
        box-sizing: border-box;
        list-style:none;
        border:1px solid;
        text-align: center;
        line-height: 2rem;
        &.btn{
            background-color:rgba(0,0,0,0.1);
            &:hover{
                background-color:rgba(0,0,0,0.2);
            }
            &.disabled{
                background-color:rgba(0,0,0,0.8)
            }
        }
        &.active{
           background-color: pink;
        }
    }
}
</style>

