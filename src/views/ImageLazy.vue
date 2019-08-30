<template>
    <section class="root">
        <!-- <span v-if='visible'>显示</span>
        <span v-else>隐藏</span>
        <input type="text" name="" id=""> -->
        <div v-for='(item,i) in srcList' :key='i'>
            <img src="" alt="" :data-src='item'  >
        </div>
    </section>
</template>
<script>
export default {
    data(){
        return {
            visible:false,
            srcList:[
                require('../assets/images/a.png'),
                require('../assets/images/b.png'),
                require('../assets/images/c.png'),
                require('../assets/images/d.png'),
            ]
        }
    },
    mounted(){
        // let input = document.querySelector('input')
        // var io = new IntersectionObserver((entries) =>{
        //     entries.forEach((item) => {
        //         console.log('intersectionRect',item.intersectionRatio)
        //         if (item.isIntersecting) {
        //             this.visible=true
        //         }else{
        //             this.visible=false
        //         }
        //     })
        // })
        // io.observe(input)

        // const imgList = [...document.querySelectorAll('img')]
        // var io = new IntersectionObserver((entries) =>{
        // entries.forEach((item,i) => {
        //     // isIntersecting是一个Boolean值，判断目标元素当前是否可见
        //     if (item.isIntersecting) {
        //         item.target.src = item.target.dataset.src
        //         console.log(i,item.isIntersecting,item.target.src)
        //         // 图片加载后即停止监听该元素
        //         io.unobserve(item.target)
        //     }
        // })
        // })

        // // // observe遍历监听所有img节点
        // imgList.forEach(img => io.observe(img))
    }
}
</script>
<style scoped>
img{
    width:5rem;
}
span{
    display: block;
    margin-top:3rem
}
input{
    margin-top:5rem;
}
</style>