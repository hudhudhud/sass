<template>
    <section class="solve-se">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide class="swiperchild" v-for="(item,i) in pages" :key="i" >
                <div :class="'se-bg se-bg'+i"  >
                    <div class="content"  v-if="i===0">
                        <div class="dt gold">
                            2012-12-12
                        </div>
                        <div class="txt">
                            <p>还记得这一天吗？我们第一次相遇</p>
                            <p><span class="gold">王小明</span>是你求助的第一个产品经理</p>
                            <p>一转眼都<span class="gold">10</span>天了，我们依然在守候</p>
                        </div>
                    </div>
                    <div class="content"  v-if="i===1">
                        <div class="top">
                            <p class="p-contain-img">求助<span class="gold">100</span>次</p>
                            <p>解决了<span class="gold">1</span>个问题</p>
                        </div>
                        <div class="txt">
                            <p>今年，我们相处的时光里</p>
                            <p>你一共求助<span class="gold">{{dataObj.SE_CallSum}}</span>次，<span class="gold">2</span>个问题得到解决</p>
                            <p>相信有求解的日子，每一天都充满力量</p>
                        </div>
                    </div>
                    <div class="content"  v-if="i===2">
                        <div class="top">
                            <p>每周求助<span class="gold">3</span>次</p>
                        </div>
                        <div class="txt">
                            <p>这一年里</p>
                            <p>你平均每周求助<span class="gold">4</span>次</p>
                            <p>有效解决你的问题</p>
                            <p>是我们最真挚的希望</p>
                        </div>
                    </div>
                    <div class="content"  v-if="i===3">
                        <div class="right">
                            <p>求助最多</p>
                            <p>产品线</p>
                        </div>
                        <div class="left">
                            <p>这一年里</p>
                            <p>你最常求助</p>
                            <p><span class="gold">5</span></p>
                            <p>共<span class="gold">6</span>次</p>
                            <p>总部产品线的托底</p>
                            <p>是你奋战最坚强的后盾</p>
                        </div>
                    </div>
                    <div class="content"  v-if="i===4">
                        <div class="top">
                            <p>求助最多</p>
                            <p>产品经理<span class="gold">7</span></p>
                        </div>
                        <div class="txt">
                            <p>这一年里</p>
                            <p>最常求助<span class="gold">王小明</span>共<span class="gold">9</span>次</p>
                            <p>问题得到解答后，也勿忘评价"非常满意"哦</p>
                        </div>
                    </div>
                    <i class="fa fa-angle-double-up arrow" aria-hidden="true" v-show='i!=pages.length-1'></i>
                </div>
            </swiper-slide>
        </swiper>
        <div @click='playMusic' class="music ani"><i class="fa fa-music" aria-hidden="true" ></i></div>
        <audio :src="musicSrc" autoplay loop preload="auto" id='myMedia'>
            你的浏览器不支持audio标签
        </audio>
    </section>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    components: {
        swiper,
        swiperSlide,
    },
    data(){
        return {
            swiperOption: {
                direction: "vertical",
                loop: false,
                slidesPerView: 1,//每页显示几个slider
                speed:500,
                preloadImages: true,//当所有的内嵌图像（img标签）加载完成后Swiper会重新初始化
                updateOnImagesReady : true,//当所有的内嵌图像（img标签）加载完成后Swiper会重新初始化
                // 自定义切换效果
                followFinger : false, //手指离开后才切换
                on:{
                    transitionStart(){  
                        var swiperSlide = document.querySelectorAll(".swiper-slide");      
                        swiperSlide[this.previousIndex].style.zIndex = -9999;      
                        if(this.activeIndex>this.previousIndex){
                            swiperSlide[this.previousIndex].style.transform = "translateY("+ this.height +"px) scale(0.8)";
                            swiperSlide[this.previousIndex].style.webkitFilter = "brightness(0.5)";
                        }else{
                            swiperSlide[this.previousIndex].style.transform = "translateY("+ -this.height +"px) scale(0.8)";
                            swiperSlide[this.previousIndex].style.webkitFilter = "brightness(0.5)"
                        }
                    },
                    transitionEnd(){
                        var swiperSlide = document.querySelectorAll(".swiper-slide");     
                        swiperSlide[this.previousIndex].style.transform = "translateY(0px) scale(1)";
                        swiperSlide[this.previousIndex].style.zIndex = 0;
                        swiperSlide[this.previousIndex].style.webkitFilter = "brightness(1)"
                    }
                }
            },
            pages:(new Array(5)).fill(true),
            dataObj:{},
            musicSrc:'http://60.12.237.235/TESTAPI/FilesData/Temp/YearReport.mp3'
        }
    },
    mounted(){
        if(process.env.VUE_APP_BUILD === "dev"){
            this.musicSrc=this.musicSrc.replace('http://60.12.237.235','http://172.25.15.77')
        }
        let mediaElement = document.getElementById("myMedia");
        setTimeout(()=>{
            if(mediaElement.paused){
                mediaElement.play();
            }
            document.querySelector(".music").classList.add('run')
        },1000)
    },
    methods:{
        playMusic(e){
            let mediaElement = document.getElementById("myMedia");
            if(mediaElement.paused){
                mediaElement.play();
                document.querySelector(".music").classList.remove('pause')
                document.querySelector(".music").classList.add('run')
            }
            else{
                mediaElement.pause();
                document.querySelector(".music").classList.add('pause')
                document.querySelector(".music").classList.remove('run')
            }
        }
    }
}
</script>
<style scoped lang='scss'>
.solve-se{
    width:100%;
    height:100%;
    #myMedia{
        display:none;
    }
    .music{
        position:fixed;
        top:20px;
        left:10px;
        width:30px;
        height:30px;
        border-radius:50%;
        background-color:rgba(0,0,0,0.5);
        z-index:9999;
        text-align:center;
        .fa-music{
            font-size:14px;
            line-height: 30px;
            color:#fff;
        }
        &.ani{
            animation: music 4s infinite linear;
            &.pause{
                animation-play-state: paused;    
            }
            &.run{
                animation-play-state: running;
            }
        }
    }
    .swiper-container{
        width:100%;
        height:100%;
        position:relative;
        text-align: center;
        .swiper-slide{
            transition: 500ms;
        }
        .arrow{
            position: absolute;
            z-index: 999;
            font-size:30px;
            color:#fff;
            bottom: 5px;
            animation: arrow 1.5s infinite ease-in-out;    
        }
        .se-bg{
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size:100% 100%;
            position:relative;
            .gold{
                color:#D69857;
                font-weight: 600;
            }
            &.se-bg0{
                background-image: url(../assets/images/bg1.png);
                .gold{
                    font-size:17px;
                }
                .dt{
                    position:absolute;
                    left:0;
                    right:0;
                    top: 155px;
                    margin: auto;
                    transform: rotate(-7deg) translateX(10px);
                }
                .txt{
                    position:absolute;
                    margin:auto;
                    left:0;
                    right:0;
                    width:90%;
                    bottom:50px;
                    color:#fff;
                    font-size :15px;
                    text-align: left;
                    line-height: 2;
                }
            }
            &.se-bg1{
                background-image: url(../assets/images/bg2.png);
                text-align: left;
                .top{
                    position:absolute;
                    margin:auto;
                    width:80%;
                    top:50px;
                    left:0;
                    right:0;
                    font-size:36px;
                    color:#5C619E;
                    line-height: 1.5;
                    .p-contain-img{
                        p{
                            display:inline-block;
                        }
                        img{
                            transform: rotate(-25deg);
                            width: 18.667vw;
                            vertical-align: 15px;
                        }
                    }
                    .gold{
                        font-size:36px;
                    }
                }
                .txt{
                    position:absolute;
                    margin:auto;
                    width:80%;
                    top:200px;
                    left:0;
                    right:0;
                    color:#5C619E;
                    font-size:17px;
                    line-height: 2;
                }
            }
            &.se-bg2{
                background-image:url(../assets/images/bg3.png);
                .top{
                    position:absolute;
                    top:50px;
                    right:20px;
                    font-size:36px;
                    color:#fff;
                    line-height:1.5;
                    .gold{
                        font-size:36px;
                    }
                }
                .txt{
                    position:absolute;
                    top:170px;
                    right:40px;
                    color:#fff;
                    font-size:18px;
                    line-height:2;
                    text-align:left;
                }
            }
            &.se-bg3{
                background-image:url(../assets/images/bg4.png);
                .right{
                    position:absolute;
                    top:50px;
                    right:20px;
                    font-size:36px;
                    color:#fff;
                    line-height:1.5;
                    writing-mode: vertical-rl; 
                    letter-spacing: 20px;
                }
                .left{
                    position:absolute;
                    top:80px;
                    left:40px;
                    color:#fff;
                    font-size:18px;
                    line-height:2;
                    text-align:left;
                    .gold{
                        color:#FEB407;
                    }
                }
            }
            &.se-bg4{
                background-image:url(../assets/images/bg5.png);
                .top{
                    position:absolute;
                    margin:auto;
                    width:80%;
                    top:50px;
                    left:0;
                    right:0;
                    font-size:36px;
                    text-align:left;
                    color:#8C47DA;
                    line-height:1.5;
                    .gold{
                        font-size:36px;
                        margin-left:15px;
                    }
                }
                .txt{
                    position:absolute;
                    margin:auto;
                    text-align:left;
                    width:90%;
                    top:200px;
                    left:0;
                    right:0;
                    color:#8C47DA;
                    font-size:17px;
                    line-height:2.5
                }
            }
        }
    }
}
@keyframes arrow {
    0%, 30% {
        opacity: 0;
        transform: translate(0,10px);
    }
    60% {
        opacity: 1;
        transform: translate(0,0);
    }
    100% {
        opacity: 0;
        transform: translate(0,-8px);
    } 
}
@keyframes music {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>