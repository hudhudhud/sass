<template>
  <div class="about ff container">
    <h1>This is an about page</h1>
  </div>
</template>
<style lang="scss" scoped>
  $width-small:  0 400px;
  $width-medium: 401px 800px;
  $width-large:  801px;
  @mixin responsive($minWid,$maxWid:0) {
    @if $maxWid>0 {
      @media only screen and (min-width: $minWid) and (max-width: $maxWid) {
        @content;
      }
    }
    @else{
      @media only screen and (min-width: $minWid){
        @content;
      }
    }
  }
  .container {
    @include responsive($width-large) {
      background-color:green;
    }
    @include responsive($width-medium...) {
      font-size: 14px;
      background-color:pink;
    }
    @include responsive($width-small...) {
      font-size: 12px;
      background-color:red;
    }
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
  .container {
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
</style>