<template>
  <div id="app">
      <keep-alive v-if='$route.meta.keepAlive' :include="include">
          <router-view />
      </keep-alive>
      <router-view  v-else/>
  </div>
</template>
<script>
export default {
  data(){
    return {
      include:[]
    }
  },
  watch: {
    //按需缓存页面,如a-b-c,c到b需要b是缓存的，a到b需要b重新加载,即返回用缓存，重新进入就重新加载
    //同一个router-view里面的内容才会缓存，否则如果切到其他router-view,则会销毁
    //https://juejin.im/post/5cdcbae9e51d454759351d84
    $route(to, from) {
      if(to.meta.keepAlive&&this.include.indexOf(to.name)<0){
        this.include.push(to.name)
      }

      if(to.meta.deepth<from.meta.deepth&&from.meta.keepAlive){
        this.include.splice(this.include.indexOf(from.name),1)
      }
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height: 100%;
}
#nav{
  font-size:0.32rem;
}
html,body{
  margin:0;
  padding:0;
  width:100%;
  /* height:100%; */
  /* box-sizing: border-box;  */
  font-size:.32rem;
  height:100%;
}
ul,li,p{
  margin:0;
  padding:0;
}
</style>
