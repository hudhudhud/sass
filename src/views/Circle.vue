<template>
    <section>
        <canvas id='draw' width='300' height='300'></canvas>
    </section>
</template>
<script>
export default {
    data(){
        return {
            ctx:null,
        }
    },
    mounted(){
        let canvas = document.getElementById('draw')
        this.ctx = canvas.getContext("2d");
        this.roll()
    },
    methods:{
        roll(){
            let ctx=this.ctx
            ctx.clearRect(0, 0, 300, 300); //清空所有的内容

            ctx.fillStyle='rgba(0,0,0,0.1)'
            ctx.strokeStyle='rgba(200,200,200,0.9)'
            ctx.strokeRect(0, 0, 300, 300);  
            ctx.save()

            //圆心移动到150
            ctx.translate(150, 150);
            
            //sun
            ctx.beginPath();
            ctx.arc(0,0,30,0,Math.PI*2)
            ctx.fill()
            ctx.save()
            //ctx.stroke()

            // ctx.moveTo(0,0);
            // ctx.lineTo(150,150);
            // ctx.stroke();

            //轨道
            ctx.beginPath()
            ctx.arc(0,0,120,0,Math.PI*2)
            ctx.stroke()
            ctx.save()

            ctx.moveTo(150,150);
            ctx.lineTo(120,120);
            ctx.stroke();

            //转球
            ctx.beginPath()
            ctx.translate(120,0);
             let time = new Date()
            ctx.rotate(2 * Math.PI / 60 * time.getSeconds() + 2 * Math.PI / 60000 * time.getMilliseconds())
            ctx.arc(0,0,10,0,Math.PI*2)
            ctx.fill() 
            //ctx.restore();

            //requestAnimationFrame(this.roll)
          
        }
    }
}
</script>
<style scoped>

</style>