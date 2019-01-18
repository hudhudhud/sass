<template>
    <div class="home">
        <ul>
            <li class="a-icon">a</li>
            <li class="b-icon">b</li>
            <li class="c-icon">c</li>
        </ul>
        <div class="code seriousError">
            123
            <span>
                i m span
            </span>
        </div>
        <p class="ff">
            <span class="f1 active">one</span>
            <span class="f2">two</span>
            <span class="f3">three</span>
        </p>
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <div class="block">
            <p><span class="hoverlink">321</span></p>
            <p><a href="https://www.baidu.com">baidu</a></p>
            <p class="notice">通知</p>
            <p class="important">important 通知</p>
        </div>
        <ul class="one">
            <li v-for="(item,i) in (Array(3).fill(true))" :key="i" :class='`item-${i+1}`'>item-{{i}}</li>
        </ul>

        <ul class="two">
            <li class="a-img"></li>
            <li class="b-img"></li>
            <li class="c-img"></li>
            <li class="d-img"></li>
        </ul>

        <div class="f">
            <div class="in">
                <p class="fl a">left</p>
                <p class="fr a">right</p>
            </div>
            <p class="shadows">normal</p>
        </div>

        <p class="primary">primary</p>

        <p class="colors">colors</p>
    </div>
</template>

<script>
    // @ is an alias to /src
    //import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'home',
        components: {
            //HelloWorld
        },
        data() {
            return {}
        }
    }
</script>
<style scoped lang="scss">
    //普通（局部）变量:用$base:1.6 !global可以将局部变量转为全局变量
    // 默认（全局）变量：用$base:1.6 !default声明为全局变量
    //变量是数组，用nth($HSize,index)
    .block {
        $height: 200px !global;//局部变量转全局变量，否则报错
        height: $height ;
        width: 800px;
        //line-height: $height;
        background-color: rgba(0, 0, 0, 0.3);
    }

    p{
        height: $height;
    }

    $HSize:12px 14px 16px;
    .f1{
        font-size:nth($HSize,1)
    }
    .f2{
        font-size:nth($HSize,2)
    }
    .f3{
        font-size:nth($HSize,3)
    }

    //如果变量需要镶嵌在字符串之中，就必须写在#{}之中。
    $side : left;
    .rounded{
        border-#{$side}-radius : 5px;
    }

    .code{
        $attr:border;
        $mainColor:red;
        #{$attr}-color: #{$mainColor};//属性值也可以用插值，跟使用变量一样
    }
    //计算功能
    $a : 100px;
    p{
        padding-top : (14px / 2);        //7px
        margin : 3px + 4px auto;        //7px auto
        top : 50px + 100px;        //150px
        right : $a * 10;    //10px
        cursor: e + -resize;//字符串拼接 e-resize
        &:after {
            content: "Foo " + Bar; //引号的合并也有一定规则 "Foo Bar"
            font-family: sans- + "serif"; //sans-serif
        }
        &:before{ //在字符串中计算并输出，需要用到#{}
            $w:6;
            content:"I ate #{5 + $w} pies!"
        }
    }

    //嵌套,属性嵌套
    .ff{
        border:{
            left-color:red;
            top-left-radius:10% ;
            top-color:red;
        }
        span{
            &.active{//引用父类选择器
                color:red;
            }
        }
    }

    //扩展/继承(@extend)
    .error {
        border: 1px #f00;
        background-color: #fdd;
        span{
            color:pink
        }
    }

    .seriousError {
        @extend .error;
        border-width: 3px;
    }

    a {
        text-decoration: none;
        &:hover {
            text-decoration: underline;
            color: red;
        }
    }

    .hoverlink {
        @extend a:hover;
    }


    /*带有 % 符号的选择器不会被编译输出，但是可以被 @extend 到*/
    %extreme {
        color: blue;
        font-weight: bold;
        font-size: 2px;
    }

    .notice {
        @extend %extreme;
    }

    .important {
        @extend .notice
    }

    /*（Mixin）用于定义可重复使用的样式*/
    @mixin clearfix {
        &:after {
            content: ".";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
    }

    .in {
        @include clearfix;
    }

    /*混合样式中也可以包含其他混合样式*/
    @mixin highlighted-background {
        background-color: #fc0;
    }

    @mixin header-text {
        font-size: 20px;
    }
    @mixin compound {
        @include highlighted-background;
        @include header-text;
    }


    /*传参数*/
    @mixin sexy-border($color, $width:1px) { //默认值
        border: {
            color: $color;
            width: $width;
            style: dashed;
        }
    }

    p.a {
        @include sexy-border(red);
    }
    p {
        @include sexy-border(red,2px);
    }
    p {
        @include sexy-border($width: 2px, $color: red);
    }

    /*传递多值参数,不确定用多少个参数，则参数后加...，会当成数值列表处理*/
    @mixin box-shadow($shadows...) {
        -moz-box-shadow: $shadows;
        -webkit-box-shadow: $shadows;
        box-shadow: $shadows;
    }

    .shadows {
        @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
    }

    //输出 .shadows {
    //-moz-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
    // -webkit-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
    //box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
    //}


    //参数变量也可以用在引用混合指令的时候，分解某个变量值 (@include)
    @mixin colors($text, $background, $border) {
        color: $text;
        background-color: $background;
        border-color: $border;
    }

    $values: #ff0000, #00ff00, #0000ff;
    .primary {
        @include colors($values...);
    }

    $value-map: (text: #00ff00, background: #0000ff, border: #ff0000);
    .secondary {
        @include colors($value-map...);
    }

    //scope，向 @mixin 传递内容（样式片段），当使用 @include 命令使用这条 mixin 的时候，将一段内容包裹了起来，这段被包裹的内容就会替换掉 @mixin 中的 @content
    //媒体查询 keyframes
    @mixin colors($color: red) {
        background-color: $color;
        @content;
        border-color: $color;
    }

    .colors {
        @include colors(blue) {
            color: green;
            font-size: 30px
        }
    }

    /*@mixin和@extend的区别：*/

    /*@mixin 定义的是一个片段，这个片段可以是类似变量的一段文字一条属性，也可以是一整个选择器和内容，
    也可以是一个选择器的一部分 CSS 代码。此外还可以传递参数，通过参数生成不同代码。
    它需要配合 @inclde 命令来引用这段代码，类似复制的效果。@mixin 定义的内容，不会编译输出。*/

    /*@extend 就是简单的扩展，基于某个选择器，将其他类似需求的选择器挂靠上，以提高复用程度*/



    $type: monster;
    p {
        @if $type == ocean {
            color: blue;
        } @else if $type == matador {
            color: red;
        } @else if $type == monster {
            color: green;
        } @else {
            color: black;
        }
    }

    /*输出 */
    /*p {color: green; }*/

    ul {
        list-style: none;
    }

    %li {
        border: 1px solid;
        height: 20px;
        background-color: mix(red,yellow,40);
    }

    ul.one {
        li {
            display: block;
            @extend %li;
        }
    }

    //@for $var from <start> to <end> 不包括end
    //@for $var from <start> through <end> 包括end
    //从1开始
    @for $i from 1 through 3 {
        .item-#{$i} {
            width: 50px * $i;
        }
    }



    ul.two {
        li {
            display: inline-block;
            @extend %li;
            width: 100px;
            height: 100px;
            background-size: cover;
            background-repeat: no-repeat;
        }
    }

     %bgi{
        background-repeat: no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
    }
    $imgs:a b c d !default;
    @each $img in $imgs {
        .#{$img}-img {
            @extend %bgi;
            //@include colors(blue);
            background-image: url('../assets/images/#{$img}.png');
            background-position:0 -(index($imgs,$img)*10px); //index获取当前项index
        }
    }


    @each $animal, $color, $cursor in (puma, black, default),
            (sea-slug, blue, pointer),
            (egret, white, move) {
        .#{$animal}-icon {
            background-image: url('/images/#{$animal}.png');
            border: 2px solid $color;
            cursor: $cursor;
        }
    }

    $group:(a, black, default),(b, blue, pointer),(c, white, move);
    @each $img, $color, $cursor in $group {
        .#{$img}-icon {
            width:50px;
            height: 50px;
            display: inline-block;
            background-image: url('../assets/images/#{$img}.png');
            border: 2px solid $color;
            cursor: $cursor;
        }
    }

    $i: 6;
    @while $i > 0 {
        .item-#{$i} {
            width: 2em * $i;
        }
        $i: $i - 2;
    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
    }



    //@function,用法与@mixin类似
    $grid-width: 40px;
    $gutter-width: 10px;
    @function grid-width($n) {
        @return $n * $grid-width + ($n - 1) * $gutter-width;
    }

    #sidebar {
        width: grid-width(5);
    }

    //颜色函数
    // rgb($red,$green,$blue)：根据红、绿、蓝三个值创建一个颜色；
    // rgba($red,$green,$blue,$alpha)：根据红、绿、蓝和透明度值创建一个颜色；
    // rgba($color,$alpha):根据颜色和透明度值创造一个颜色
    // red($color)：从一个颜色中获取其中红色值；
    //  green($color)：从一个颜色中获取其中绿色值；
    // blue($color)：从一个颜色中获取其中蓝色值；
    // mix($color-1,$color-2,[$weight])：把两种颜色混合根据混合比例混合在一起，默认值50%。

    //亮度函数
    $baseColor: #ad141e;
    .lighten {
        background: lighten($baseColor,10%);
    }
    .darken{
        background: darken($baseColor,10%);
    }
    //注释
        /*标准的CSS注释 !*comment*!,会保留到编译后的文件。*/

        /*单行注释 //comment,只保留在sass源文件中，编译后被省略。*/

        /*重要注释 !*!comment*!,即使压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。*/


    .button { background: green; }
    .button-1 { @extend .button; }
    .button-2 { @extend .button; }
   // 使用 @extend 产生 DRY CSS 风格的代码。
    /*.button, .button-1, .button-2*/
    /*{ background: green; }*/
    //注意,样式片段没有重复,这就是 DRY 。但是 @mixin 就不能产生 DRY 式的代码。

    @mixin button { background-color: green; }
    .button-1 { @include button; }
    .button-2 { @include button; }
    //这段使用 @mixin 的Sass编译出来的样子:

    /*!.button { background-color: green; }*/
    /*.button-1 { background-color: green; }*/
    /*.button-2 { background-color: green; }*/
    //可以看到,相同的样式片段在不同的选择器中重复多次,这也导致了编译出来的CSS不是 DRY 形式的。
</style>