<template>
    <section class="solve-se">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide class="swiperchild" v-for="(item,i) in pages" :key="i" >
                <div :class="'se-bg se-bg'+i"  >
                    <div class="content"  v-if="i===0">
                        1
                    </div>
                    <div class="content"  v-if="i===1">
                       2
                    </div>
                    <div class="content"  v-if="i===2">
                        3
                    </div>
                    <div class="content"  v-if="i===3">
                        4
                    </div>
                    <div class="content"  v-if="i===4">
                       5
                    </div>
                    <i class="fa fa-angle-double-up arrow" aria-hidden="true" v-show='i!=pages.length-1'></i>
                </div>
            </swiper-slide>
        </swiper>
        <div @click='playMusic' class="music ani"><i class="fa fa-music" aria-hidden="true" ></i></div>
        <audio src="http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg" autoplay loop preload="auto" id='myMedia'>
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
        }
    },
    mounted(){
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
            }
            &.se-bg1{
                background-image: url(../assets/images/bg2.png);
            }
            &.se-bg2{
                background-image:url(../assets/images/bg3.png);
            }
            &.se-bg3{
                background-image:url(../assets/images/bg4.png);
            }
            &.se-bg4{
                background-image:url(../assets/images/bg5.png);
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