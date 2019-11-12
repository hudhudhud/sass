<template>
  <div class="about ff container">
    <h1>This is an about page</h1>
    <div class="fit">test auto fit</div>
    <div @click='increment'>{{count}}</div>
    <swiper :options="swiperOption">
      <swiper-slide><img src="../assets/images/a.png"></swiper-slide>
      <swiper-slide><img src="../assets/images/b.png"></swiper-slide>
      <swiper-slide><img src="../assets/images/c.png"></swiper-slide>
      <swiper-slide><img src="../assets/images/d.png"></swiper-slide>
    </swiper>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="tab1">
        tab1
      </mt-tab-item>
      <mt-tab-item id="tab2">
        tab2
      </mt-tab-item>
      <mt-tab-item id="tab3">
        tab3
      </mt-tab-item>
      <mt-tab-item id="tab4">
        tab4
      </mt-tab-item>
       <mt-tab-item id="tab4">
        tab5555555555555
      </mt-tab-item>
       <mt-tab-item id="tab5">
        tab6
      </mt-tab-item>
       <mt-tab-item id="tab6">
        tab6
      </mt-tab-item>
       <mt-tab-item id="tab7">
        tab6
      </mt-tab-item>
       <mt-tab-item id="tab8">
        tab62222222222222222
      </mt-tab-item>
    </mt-tabbar>
    <MyTabs :list='tabs' v-model="currentTab"></MyTabs>
  </div>
</template>
<script>
import { mapState , mapGetters , mapMutations } from 'vuex'
import MyTabs from '../components/MyTabs'
export default {
  components:{
    MyTabs,
  },
  data(){
    return {
      num:0,
      swiperOption: {//swiper3
       roundLengths : true, 
        initialSlide :0,
        speed:600,
        slidesPerView:"auto", //设置slider容器能够同时显示的slides数量(carousel模式)。或者 'auto'则自动根据slides的宽度来设定数量。
        centeredSlides : true,
        followFinger : false,
      },
      
      selected:'tab1',
      currentTab:0,
      tabs:['tab1','tab2','tab3','tab43444444444','tab5','tab6','tab74343434','tab88888888888']
    }
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapState([
      'count',
    ]),
  },
  methods:{
     ...mapMutations([
      'increment' ,
      'set',
      'get'
     ])
  }

}
</script>
<style lang="scss" scoped>
.fit{
  width:50px;
  height: 50px;
  background-color: red;
}
.swiper-slide{
  width:80%;
  img{
    width:100%;
  }
}
// img{
//   width:100%;
//   height: auto;
// }
  $breakpoints: (
          'small'  : ( max-width:400px ),
          'medium' : "( min-width: 401px ) and (max-width:800px)",
          'large'  : ( min-width: 801px )
  );

  @mixin respond-to($name) {
    @if map-has-key($breakpoints, $name) {
      @media #{map-get($breakpoints, $name)} {
        @content;
      }
    }
    @else {
      @warn "Unfortunately, no value could be retrieved from `#{$name}`. "
        + "Please make sure it is defined in `$breakpoints` map.";
    }
  }
  .container{
    @include  respond-to(large){
      background-color:green;
    }
    @include  respond-to(medium){
      font-size: 14px;
      background-color:pink;
    }
    @include  respond-to(small){
      font-size: 12px;
      background-color:rgba(0,0,0,0.1);
    }
  }

  .block {
    color: red;
    @at-root #{&}__element {
      color: blue;
    }
    @at-root #{&}__modifier {
      color:orange;
    }
  }

    /*@import "../assets/style/a.css";*/
  /*@import "../assets/style/b";*/
  body {
    background-color: #f5f5f5;
  }

@function len($n){
  @return $n+rem
}
$n:2;
  h1{
    font-size:if($n==1,8px,20px);
  }
  /*用在媒体查询，如想在宽度不同时候去变化背景色*/
  /*@media (max-width: 500px) {*/
    /*.container {*/
      /*background: green;*/
      /*font-size:14px;*/
    /*}*/
  /*}*/
  /*@media (min-width: 501px) and (max-width: 1024px) {*/
    /*.container {*/
      /*background: red;*/
      /*font-size:16px;*/
    /*}*/
  /*}*/
  /*@media (min-width: 1025px) {*/
    /*.container {*/
      /*background: blue;*/
      /*font-size: 18px;*/
    /*}*/
  /*}*/

  @mixin phone {
    @media (max-width: 500px) {
      @content;
    }
  }

  @mixin ipad {
    @media (min-width: 501px) and (max-width: 1024px) {
      @content;
    }
  }

  @mixin pc {
    @media (min-width: 1025px) {
      @content;
    }
  }
  .a {
    @include phone {
      background: green;
      font-size:14px;
    }
    @include ipad {
      background: red;
      font-size:16px;
    }
    @include pc {
      background: blue;
      font-size: 18px;
    }
  }

  a {
    color:#000;
    background-color: lighten(#ccc, 10%);
    &:hover {
      color: rgba(red, 0.5);
      background-color: darken(#999, 50%);
    }
  }
</style>
