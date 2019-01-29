
##### 变量
```scss
 $contentWidth:1200px;
 $contentWidth:1400px !default ;//默认值，加上!default标识的语句会被优先编译和赋值.默认变量的价值在进行组件化开发的时候会非常有用。
 .block{
        $height: 200px !global; //局部变量转全局变量
        height: $height;
        width: $contentWidth;
 }
 #sidebar {
   height:$height;
 }
```
#####多值变量，分为list类型和map类型
######list类型，list数据可通过空格，逗号或小括号分隔多个值，可用```nth($var,$index)```取值
```scss
//一维数据
$HSize:12px 14px 16px;
//二维数据
$px1: 5px 10px, 0 auto;
$px2: (5px 10px) (0 auto);
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
######map数据以key和value成对出现，其中value又可以是list。
######格式为：```$map: (key1: value1, key2: value2, key3: value3);```。可通过```map-get($map,$key)```取值,```map-has-key($map,$key)```判断有无key
```scss
$map:(dribble: #ea4c89, facebook: #3b5998, Github: #171515, google: #db4437, twitter: #55acee);
.twitter {
    background-color: map-get($map, twitter);
}
.facebook {
    background-color: map-get($map, facebook);
}
 
//css style
.twitter {
  background-color: #55acee;
}
.facebook {
  background-color: #3b5998;
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

######@at-root
```scss
.block {}
.block__element{}
.block__modifier{}

.block {
    color: red;
    #{&}__element {  //#{&}引用父类选择器
        color:blue;
    }
    #{&}__modifier {
        color: orange;
    }
}

//编译结果
.block {
  color: red; 
}
.block .block__element {
  color: blue; 
}
.block .block__modifier {
  color: orange; 
}


//用at-root 跳出嵌套，编译出来的CSS无任何嵌套，不管多少层
.block {
    color: red;
    @at-root #{&}__element {
        color: blue;
    }
    @at-root #{&}__modifier {
        color:orange;
    }
}
//编译结果
.block {
  color: red; 
}
.block__element {
  color: blue; 
}
.block__modifier {
  color: orange; 
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
//编译为
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
#####混合器(mixin) 用于定义可重复使用的样式,通过@include来调用
#####可以传递参数，参数名以$符号开始，多个参数以逗号分开，也可以给参数设置默认值
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
######传递多值参数,如果一个参数可以有多组值，则参数后加...，会当成数值列表处理
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
######@content 传入代码片段,它可以使@mixin接受一整块样式
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
```

```scss
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
     @include  respond-to(b){//编译时就会出现@warn的错误
      color:pink ;
     }
  }
```

######@mixin和@extend的区别
* @extend 
   * 基于某个选择器，将其他类似需求的选择器挂靠上以提高复用程度
   * 编译后相同项会合并
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
   * @mixin 定义的是一个片段。
   * 可以传递参数，通过参数生成不同代码。
   * 它需要配合 @inclde 命令来引用这段代码，类似复制的效果。
   * @mixin 定义的内容，不会编译输出。
   * 不合并

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
######三目判断
* ```if($condition, $if_true, $if_false)```
```scss
$n:1;
h1{
   font-size:if($n==1,8px,20px);
}
```
######@for
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
######@each, ```@each $var in <list or map>```
```scss
//一些按钮图标
$icon-data:puma, sea-slug, egret, salamander !default;
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
//多个字段list数据循环
$group:(puma, black, default),(sea-slug, blue, pointer),(egret, white, move);
@each $img, $color, $cursor in $group {
    .#{$img}-icon {
        background-image: url('/images/#{$img}.png');
        border: 2px solid $color;
        cursor: $cursor;
    }
}
@each $th in $group {
  .#{nth($th, 1)}-icon {
        background-image: url('/images/#{nth($th, 1)}.png');
        border: 2px solid nth($th, 2);
        cursor: nth($th, 3);
    }
}

```
```scss
//多个字段map数据循环
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header, $size in $headings {
  #{$header} {
    font-size: $size;
  }
}
//css style
h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.5em;
}
h3 {
  font-size: 1.2em;
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
#####函数
######颜色函数``` rgb($red,$green,$blue)```，```rgba($color,$alpha)```，```lighten($color,$amount)```，```darken($color,$amount)```
```scss
a {
  color: rgb(256, 256, 256);
  background-color: lighten(#ccc, 10%);
  &:hover {
    color: rgba(red, 0.5);
    background-color: darken(#999, 50%);
  }
}
 //css style
a {
  color: white;
  background-color: #e6e6e6;
}
a:hover {
  color: rgba(255, 0, 0, 0.5);
  background-color: #1a1a1a;
}
```
######自定义函数 @function
```scss
$a: 40px;
$b: 10px;
@function grid-width($n) {
  @return $n * $a + ($n - 1) * $b;
}
#sidebar {
  width: grid-width(5);
}

//客管
@function len($n){
    @return $n+rem
}
@function len($n){
    @return $n+rpx
}
.block{
    width:len(18)
}
```


```
#####注释
* 标准的CSS注释 /*comment*/,会保留到编译后的文件。

* 单行注释 //comment,只保留在sass源文件中，编译后被省略。

* 重要注释 /*!comment*/,即使压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。

```