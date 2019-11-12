<template>
    <section v-if='tabs&&tabs.length' class="my-tabs">
        <div class="tabs-content"  ref='myTabs' :style='"padding:3px "+tabsPadding+"px;"' :class='{devide:!isScroll}'>
            <div class='my-tab' v-for="(tab,index) of tabs" :ref='"tab_"+index' :class='{active:tabs[currentTab]===tab,last:index===tabs.length-1}' 
            :key="index" @click='clickHandler(index)' :style="!isScroll?`width:${tabsWidth[index]}%;`:`margin-right:${margin}px;`" > 
                <span class='tab-title'>{{tab}}</span>
            </div>
            <div class="my-tabs-slider" :style='sliderStyle'></div>
        </div>
    </section>
    
</template>
<script>
export default {
    props:{
        list:{
            type:Array,
            default:()=>{
                return []
            }
        },
        value:'',
        tabMargin:{ //tab之间距离
            type:Number,
            default:20 
        },
        tabsPadding:{
            type:Number,
            default:20
        }
    },
    data(){
        return {
            tabs:this.list,
            currentTab:this.value,
            preTab:this.value,//记录上一次tab，用来判断滚动方向
            styleObject:{
                width:'',
                translateX:0
            },
            isScroll:true,//是否有滚动区
            tabsWidth:[],//tab宽度，没有滚动区时才用
            scrollInterval:null,
            scrollWidth:0,//滚动区宽度
            margin:this.tabMargin,
            padding:this.tabsPadding
        }
    },
    watch:{
        currentTab:{
            handler(v){
                this.$emit('input',v)
                this.$nextTick(()=>{
                    let currentEle=this.$refs["tab_"+v][0]
                    this.styleObject.width=currentEle.offsetWidth
                    this.styleObject.translateX=this.padding
                    if(v>0){
                        (new Array(v)).fill(true).forEach((item,index)=>{
                            this.styleObject.translateX+=this.$refs["tab_"+index][0].offsetWidth+this.margin
                        }) 
                    }
                    else{
                        this.styleObject.translateX=this.padding
                    }

                    if(this.isScroll){
                        //正方向
                        if(this.currentTab>this.preTab&&this.styleObject.translateX >= (this.$refs.myTabs.offsetWidth/2)){
                            if(this.$refs.myTabs.scrollLeft>=this.scrollWidth)return
                            this.scrollToX(currentEle.offsetParent,this.styleObject.width)
                        }
                        //负方向
                        else{
                            if(this.$refs.myTabs.scrollLeft===0)return
                            this.scrollToX(currentEle.offsetParent,-this.styleObject.width)
                        }
                    }
                })
            },
            immediate:true
        },
        value:{
            handler(v){
                this.val=v
            },
            immediate:true,
        },
        list:{
            handler(v){
                this.tabs=v
            },
            immediate:true,
        },
    },
    computed:{
        sliderStyle(){
            return `width:${this.styleObject.width}px;transform:translateX(${this.styleObject.translateX}px)`
        }
    },
    mounted(){
        //计算宽度确定是否有滚动区，没有则样式为平分宽度
        let contentLength=0
        this.tabs.forEach((item,index)=>{
           contentLength+=this.$refs["tab_"+index][0].offsetWidth
        })
        this.isScroll=this.$refs.myTabs.offsetWidth <=(contentLength+this.margin*this.tabs.length)
        if(!this.isScroll){
            this.margin=0
            this.tabsWidth=this.tabs.map((item,index)=>{
                return this.$refs["tab_"+index][0].offsetWidth/contentLength*100
            })
        }
        //可滚动区域宽度
        this.scrollWidth=this.$refs.myTabs.scrollWidth-this.$refs.myTabs.offsetWidth
    },
    methods:{
        clickHandler(index){
            this.preTab=this.currentTab
            this.currentTab=index
            this.$emit('click',index)
        },
        scrollToX(ele,x) {
            if (this.scrollInterval) clearInterval(this.scrollInterval)
            var time = 15, i = 0, sum = 0
            var scrollStep = parseInt(x / time)
            this.scrollInterval = setInterval(()=>{
                i++
                if (i < time) {
                    sum += scrollStep
                    ele.scrollBy(scrollStep, 0)
                }
                else {
                    ele.scrollBy(x-sum, 0)
                    clearInterval(this.scrollInterval)
                }
            }, time)
        },
    },
    destroyed(){
        if (this.scrollInterval){
            clearInterval(this.scrollInterval)
        }
    }
}
</script>
<style lang='scss'>
.my-tabs{
    height:36px;  
    font-size:15px;  
}
</style>
<style scoped lang='scss'>
  .tabs-content{
    //隐藏滚动条,ios端无效
    &::-webkit-scrollbar{
        width:0px;
        height:0px;
        background-color:transparent;
    }
    position:relative;
    height:100%;   
    overflow-x:scroll;
    display:flex;
    flex-wrap:nowrap;
    -webkit-overflow-scrolling: touch;  
    // padding:3px 0px;
    width:100%;
    box-sizing:border-box;
    flex:0 0 auto;
    align-content: center;
    //fix flex布局右侧边距失效 
    &:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden; //占位但不可见
    }
    .my-tab{
        height:100%;
        box-sizing:border-box;
        line-height:30px;
        // margin-right:20px;
        .tab-title{
            font-size:inherit;
        }
        &.last{
            margin-right:0 !important;
        }
        // &:last-child{
        //   margin:0;
        //   margin-left:10px;
        // }
        // &:first-child{
        //    margin:0;
        //    margin-right:10px;
        // }
        flex-shrink:0;
        color:#6d7a80;
        //border-bottom:2px solid transparent;
        //transition:border-bottom .2s linear;
        &.active{
          color: #4a4a4a;
         // border-bottom:2px solid #1f8ceb;
        }
    }  
    //tab较少时则平分布局
    &.devide{
        flex:none;
        overflow-x: hidden;
        padding:0;
        .my-tab{
            flex:none;
            margin:0
            text-align center
        }
    }
    .my-tabs-slider{
        position: absolute;
        bottom: 5px;
        left: 0;
        height: 2px;
        background-color: #409eff;
        z-index: 1;
        transition: transform .3s cubic-bezier(.645,.045,.355,1);
        list-style: none;   
    }

  }
</style>