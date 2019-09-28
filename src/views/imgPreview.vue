<template>
    <div>
        <img src="../assets/images/a.png" alt="">
        <img src="../assets/images/b.png" alt="">
        <img src="../assets/images/c.png" alt="">
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    mounted(){
        this.imgView($('div'))
        console.log(11111,$("div").find("img"))
    },
    data(){
        return {
        }
    },
    methods:{
        //https://juejin.im/post/5c52b2b26fb9a049fb44168e
        imgView(ele){
            let self=this
            var click=0
            var lastTime=-Infinity
            var viewBoxStyle=`z-index:999;
                            background-color:black;
                            position:fixed;
                            top:0;
                            display: flex;
                            width: 100%;
                            height:100%;
                            justify-content: center;
                            align-items: center;`
            var imgStyle=`width:100%;height:auto;`
            var touchMoved=false
            var originHaveSet=false
            let translateX = 0;
            let translateY = 0;
            let scaleOrigin = {
                x: 0,
                y: 0
            };

            // 计算相对缩放前的偏移量，rect 为当前变换后元素的四周的位置
            const relativeCoordinate = (x, y, rect) => {
                let cx = (x - rect.left) / scaleRatio;
                let cy = (y - rect.top) / scaleRatio;
                return {
                    x: cx,
                    y: cy
                };
            };
            const getStyle = (target, style) => {
                let styles = window.getComputedStyle(target, null);
                return styles.getPropertyValue(style);
            };
            const getTranslate = (target) => {
                let matrix = getStyle(target, 'transform');
                let nums = matrix.substring(7, matrix.length - 1).split(', ');
                let left = parseInt(nums[4]) || 0;
                let top = parseInt(nums[5]) || 0;
                return {
                    left: left,
                    top: top
                }
            };
            let preTouchPosition = {};
            const recordPreTouchPosition = (touch) => {
                preTouchPosition = {
                    x: touch.clientX,
                    y: touch.clientY
                };
            };

            $(ele).find("img").on("click",function(){
                lastTime=Date.now()
                var div=$(`<div style="${viewBoxStyle}">
                        <img src=${$(this).attr("src")} style="${imgStyle}"></img>
                        </div>`)
                $("body").append(div)
                var img=$(div).find("img")[0]
                var time=300
                var end=false
                var preX=0,preY=0
                var scaleRatio=1  //缩放倍率
                var preTouchesClientx1y1x2y2=[]
                var preDistanceX=0,preDistanceY=0
                var timeId
                const setStyle = (key, value) => {
                    img.style[key] = value;
                };
                $(div).on("touchstart",function(e) {  
                    if(e.touches.length>1){
                        let one = e.touches['0'];
                        let two = e.touches['1'];
                        preTouchesClientx1y1x2y2 = [one.clientX, one.clientY, two.clientX, two.clientY];
                        console.log('touchstart...')
                        originHaveSet = false;
                    }                  
                    click++
                    end=false
                    touchMoved=false
                    lastTime=Date.now()
                    preX=e.touches[0].clientX
                    preY=e.touches[0].clientY
                    recordPreTouchPosition(e.touches[0]);
                    if(Date.now()-lastTime<time&&click==2){//双击事件
                        console.log("scale")
                        scale()
                        return
                    }
                    
                    timeId=setTimeout(()=>{
                        if(end&&!touchMoved){
                            click=0
                            lastTime=-Infinity
                            scaleRatio=1
                            $(this).find("img").attr("style","")
                            $(this).remove()
                        }
                    },time)
                })
                
                function scale() {
                    click=0
                    lastTime=-Infinity
                    clearTimeout(timeId)
                    if($(img).attr("style")&&$(img).attr("style").indexOf("transform:scale(2)")>-1){
                        scaleRatio=1
                        $(img).attr("style",`${imgStyle};transition:0.2s linear all;`)
                    }
                    else {
                        scaleRatio=2
                        $(img).attr("style",`${imgStyle};transition:0.2s linear all;transform:scale(${scaleRatio});top:25%;transform-origin:50% 50%`)
                    }
                }
             
                $(img).on("touchmove",function(e) {
                    touchMoved=true
                    click=0
                    let touches = e.touches;
                    if (touches.length === 1) {
                        let oneTouch = touches['0'];
                        let translated = getTranslate(oneTouch.target);
                        translateX = oneTouch.clientX - preTouchPosition.x + translated.left;
                        translateY = oneTouch.clientY - preTouchPosition.y + translated.top;
                        
                        let matrix = `matrix(${scaleRatio}, 0, 0, ${scaleRatio}, ${translateX}, ${translateY})`;
                        setStyle('transform', matrix);
                        setStyle('transition','')
                        recordPreTouchPosition(oneTouch);
                    } else {
                        let one = touches['0'];
                        let two = touches['1'];
                        const distance = (x1, y1, x2, y2) => {
                            let a = x1 - x2;
                            let b = y1 - y2;
                            return Math.sqrt(a * a + b * b);
                        };
                        scaleRatio = distance(one.clientX, one.clientY, two.clientX, two.clientY) / distance(...preTouchesClientx1y1x2y2) * scaleRatio || 1;
                       if (!originHaveSet) {
                            originHaveSet = true;
                            // 移动视线中心
                            let origin = relativeCoordinate((one.clientX + two.clientX) / 2, (one.clientY + two.clientY) / 2, img.getBoundingClientRect());
                            // 修正视野变化带来的平移量
                            translateX = (scaleRatio - 1) * (origin.x - scaleOrigin.x) + translateX;
                            translateY = (scaleRatio - 1) * (origin.y - scaleOrigin.y) + translateY;
                            setStyle('transform-origin', `${origin.x}px ${origin.y}px`);
                            scaleOrigin = origin;
                        }
                        let matrix = `matrix(${scaleRatio}, 0, 0, ${scaleRatio}, ${translateX}, ${translateY})`;
                        setStyle('transform', matrix);
                        setStyle('transition','')
                        preTouchesClientx1y1x2y2 = [one.clientX, one.clientY, two.clientX, two.clientY];
                    }
                    e.preventDefault();
                })

                $(img).on("touchend",function(e) {
                    let touches = e.touches;
                    if (touches.length === 1) {
                        recordPreTouchPosition(touches['0']);
                    }
                })
                $(img).on("touchcancel",function(e) {
                    let touches = e.touches;
                    if (touches.length === 1) {
                        recordPreTouchPosition(touches['0']);
                    }
                 })
                $(div).on("touchend",function() {
                    end=true
                })
            })
        }
    }
}
</script>
<style scoped>
	img{
        max-width:100%;
    }
</style>