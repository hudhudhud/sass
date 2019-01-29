<template>
  <div class="about ff container">
    <h1>This is an about page</h1>
  </div>
</template>
<style lang="scss" scoped>
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
      background-color:red;
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
    color: rgb(256, 256, 256);
    background-color: lighten(#ccc, 10%);
    &:hover {
      color: rgba(red, 0.5);
      background-color: darken(#999, 50%);
    }
  }
</style>
