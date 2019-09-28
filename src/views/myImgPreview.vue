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
        this.imgView()
        console.log(11111,$("div").find("img"))
    },
    data(){
        return {
        }
    },
    methods:{
        imgView(){
            let self=this
            var click=0
            var lastTime=-Infinity
            var viewBoxStyle=`z-index:900000;
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
            $("div").find("img").on("click",function(){
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
                $(div).on("touchstart",function(e) {  
                    if(e.touches.length>1){
                        let one = e.touches['0'];
                        let two = e.touches['1'];
                        preTouchesClientx1y1x2y2 = [one.clientX, one.clientY, two.clientX, two.clientY];
                        originHaveSet = false;
                    }                  
                    click++
                    end=false
                    touchMoved=false
                    lastTime=Date.now()
                    preX=e.touches[0].clientX
                    preY=e.touches[0].clientY
                   
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

                // 计算相对缩放前的偏移量，rect 为当前变换后元素的四周的位置
                const relativeCoordinate = (x, y, rect) => {
                    let cx = (x - rect.left) / scaleRatio;
                    let cy = (y - rect.top) / scaleRatio;
                    return {
                        x: cx,
                        y: cy
                    };
                };

                $(img).on("touchmove",function(e) {
                    touchMoved=true
                    click=0
                    var touches = e.touches;
                    if (touches.length > 1) {
                        // 即便同时落下 10 个手指，我们只取前 2 个就好
                        let one = touches['0'];
                        let two = touches['1'];
                        const distance = (x1, y1, x2, y2) => {
                            let a = x1 - x2;
                            let b = y1 - y2;
                            return Math.sqrt(a * a + b * b);
                        };
                        // 新的缩放倍率 = （当前指间距离 ÷ 之前指间距离）× 之前缩放倍率
                        // 没有在 touchstart 中记录最初的双指位置，计算会得到 NaN，对结果直接取 1
                        scaleRatio = distance(one.clientX, one.clientY, two.clientX, two.clientY) / distance(...preTouchesClientx1y1x2y2) * scaleRatio || 1;
                        //alert(scaleRatio)
                        if(!originHaveSet){
                            originHaveSet=true
                            // 移动视线中心
                            let origin = relativeCoordinate((one.clientX + two.clientX) / 2, (one.clientY + two.clientY) / 2, 
                            img.getBoundingClientRect());
                            // 修正视野变化带来的平移量，别忘了加上之前已有的位移值啊！
                            translateX = (scaleRatio - 1) * (origin.x - scaleOrigin.x) + translateX;
                            translateY = (scaleRatio - 1) * (origin.y - scaleOrigin.y) + translateY;
                            
                            img.style['transform-origin']=`${origin.x}px ${origin.y}px`
                            scaleOrigin = origin;
                        }
                        img.style['transform']=`scale(${scaleRatio}) translate3d(${distanceX/2}px,${distanceY/2}px, 0px)`
                        img.style['transition']=''
                       // 及时更新双指位置信息
                        preTouchesClientx1y1x2y2 = [one.clientX, one.clientY, two.clientX, two.clientY];
                         
                    }
                    else{
                        var x=e.touches[0].clientX
                        var y=e.touches[0].clientY
                        translateX=preDistanceX+x-preX
                        translateY=preDistanceY+y-preY
                        img.style['transition']=''
                        img.style['transform']=`scale(${scaleRatio}) translate3d(${translateX/2}px,${translateY/2}px, 0px)`
                        // $(this).attr("style",`transform:scale(${scaleRatio}) translate3d(${distanceX/2}px,${distanceY/2}px, 0px);top:25%;${imgStyle}`)
                        preDistanceX=translateX
                        preDistanceY=translateY
                        preX=x
                        preY=y
                    }                  
                    e.preventDefault()
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