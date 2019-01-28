
##### 变量
```scss
 $contentWidth:1400px;
 $contentWidth:1400px !default ;
 .block{
        $height: 200px !global; //局部变量转全局变量
        height: $height;
        width: $contentWidth;
 }
 #sidebar {
   height:$height;
 }
```
######一个变量含有多个值，如$i : 12px 15px 16px 14px
######取第index个值时**nth($i,index)**
```scss
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
```
##### ${}插值,插值语句可以在选择器或属性名中使用变量
```scss
$name: foo;
$attr: border;
$mainColor:blue;
p.#{$name} {
  #{$attr}-color: #{$mainColor};//属性值也可以用插值，跟使用变量一样
}
```
#####嵌套,避免了重复输入父选择器
```scss
#main {
  width: 97%;
  span{
      &.active{//引用父类选择器
          color:red;
      }
  }
}
```
###### 属性嵌套
```scss
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
//编译为

.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
}
```
##### 计算
```scss
$a : 10px;
p{
    padding-top : (14px / 2);       //7px
    font: 10px/2px;                 // 10px/2px 
    font: 5px+10px/2px;             // 10px
    margin : 3px + 4px auto;        //7px auto
    top : 50px + 100px;             //150px
    right : $a * 10;                //100px
    cursor: e + -resize;            //字符串拼接 e-resize
    &:after {
        content: "Foo " + Bar; //引号的合并也有一定规则 "Foo Bar"
        font-family: sans- + "serif"; //sans-serif
    }
    &:before{ //在字符串中计算并输出，需要用到#{}
        $w:6;
        content:"I ate #{5 + $w} pies!"
    }
}

```
```scss
//如果需要使用变量，同时又要确保 / 不做除法运算而是完整地编译到 CSS 文件中，只需要用 #{} 插值语句将变量包裹。
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```
```scss
//颜色值计算
.main-col{ 
  color: #106021 + #023212; 
}
编译为
.main-col{
  color : #129233
};

```
#####@extend 扩展/继承,适合关联性比较强的选择器，比如一个通用样式，一个特殊样式
```scss
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
```
######% ,带有 % 符号的选择器不会被编译输出，但是可以被 @extend 到
```scss
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
```
#####@Mixin 用于定义可重复使用的样式(@include)
```html
<div class="in">
    <p class="fl">left</p>
    <p class="fr">right</p>
</div>
```
```scss
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
    font-size:14px;
    background-color:red;
}
```
```scss
//混合样式中也可以包含其他混合样式
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
```
######传参数
```scss
@mixin sexy-border($color, $width:1px) { //默认值
    border: {
        color: $color;
        width: $width;
        style: dashed;
    }
}
p.a{
    @include sexy-border(red);
}
p.b{
    @include sexy-border(red,2px);
}
p.c{
    @include sexy-border($width: 2px, $color: red);
}
```
######...未知参数个数,传递多值参数,不确定用多少个参数，则参数后加...，会当成数值列表处理
```scss
@mixin box-shadow($shadows...) {
    -moz-box-shadow: $shadows;
    -webkit-box-shadow: $shadows;
    box-shadow: $shadows;
}

.shadows {
    @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
```
```scss
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
```
######@content 传入代码片段
```scss
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
```
```css
/*用在媒体查询*/
@media only screen and (min-width: 0) and (max-width: 400px){
    .container {
        font-size: 12px;
        background-color: red;
    }
}
@media only screen  and (min-width: 401px) and (max-width: 800px){
    .container{
        font-size: 14px;
        background-color: pink;
    }
}
@media only screen and (min-width: 801px){
    .container{
        background-color: green;
    }
}
```
```scss
$width-small:  0 400px;
$width-medium: 401px 800px;
$width-large:  801px;
@mixin responsive($minWid,$maxWid:0) {
    @if $maxWid>0 and $minWid>0 {
      @media only screen and (min-width: $minWid) and (max-width: $maxWid) {
        @content;
      }
    }
    @else if $maxWid>0{
         @media only screen and (max-width: $maxWid){
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
```

######@mixin和@extend的区别
* @extend 
   * 基于某个选择器，将其他类似需求的选择器挂靠上以提高复用程度
   * 编译后可生成DRY CSS风格的代码
      如：
       ```scss
           .button { background: green; }
           .button-1 { @extend .button; }
           .button-2 { @extend .button; }
           //编译后
           .button, .button-1, .button-2{
             background: green;
           }
       ```
        但是 @mixin 就不能产生 DRY 式的代码。
* @mixin
   * @mixin 定义的是一个片段，这个片段可以是类似变量的一段文字一条属性，也可以是一整个选择器和内容，也可以是一个选择器的一部分 CSS 代码。
   * 可以传递参数，通过参数生成不同代码。
   * 它需要配合 @inclde 命令来引用这段代码，类似复制的效果。
   * @mixin 定义的内容，不会编译输出。

#####流程控制语句（@if、@for、@each、@while）
######@if
```scss
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
```
#######@for
```scss
//@for $var from <start> through <end> 包括end
//@for $var from <start> to <end> 不包括end
//从1开始
@for $i from 1 through 3 {
    .item-#{$i} {
        width: 50px * $i;
    }
}
```
######@each
```scss
//一些按钮图标
$icon-data:a b c d !default;
%bgi{
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
}
@each $icon in $icon-data {
    .#{$icon}-img {
        background-image: url('../assets/images/#{$icon}.png');
        background-position:0 -(index($icon-data,$icon)*10px); //index获取当前项index
    }
}
```
```scss
$group:(puma, black, default),(sea-slug, blue, pointer),(egret, white, move);
@each $img, $color, $cursor in $group {
    .#{$img}-icon {
        background-image: url('/images/#{$img}.png');
        border: 2px solid $color;
        cursor: $cursor;
    }
}
```
######@while
```scss
$i: 6;
@while $i > 0 {
    .item-#{$i} {
        width: 2em * $i;
    }
    $i: $i - 2;
}
```
#####自定义函数 @function
```scss
$a: 40px;
$b: 10px;
@function grid-width($n) {
  @return $n * $a + ($n - 1) * $b;
}
#sidebar {
  width: grid-width(5);
}

客管的又要兼容小程序的rpx,要兼容h5的rem，那宽度这些就需要写个通用的

@function len($n){
    return $n+'rem'
}
@function len($n){
    return $n+'rpx'
}

.block{
    width:len(18)
}
```
#####注释
* 标准的CSS注释 /*comment*/,会保留到编译后的文件。

* 单行注释 //comment,只保留在sass源文件中，编译后被省略。

* 重要注释 /*!comment*/,即使压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。
