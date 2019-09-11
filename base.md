<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>test</title>
  </head>
  <body>
    <div id="app">hello</div>
    <!--defer 这个属性的用途是表明脚本在执行时不会影响页
        面的构造。也就是说，脚本会被延迟到整个页面都解析完毕后再运行。因此，在<script>元素中设置
        defer 属性，相当于告诉浏览器立即下载，但延迟执行,将延迟
        到浏览器遇到</html>标签后再执行 -->
    <script src='a.js' defer></script>
    <!-- 指定 async 属性的目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容。
        为此，建议异步脚本不要在加载期间修改 DOM。
        异步脚本一定会在页面的 load 事件前执行，但可能会在 DOMContentLoaded 事件触发之前或之
        后执行。 -->
    <script src='b.js' ></script>
    <script>
        
    </script>
  </body>
</html>

typeof null "object"

//基本数据类型包括 Undefined、 Null、 Boolean、 Number 和 String、Symbol。

null==undefined true

NaN==NaN false

isNaN(NaN) //内部参数不能转换为数字则为true true

011 //八进制 9

0xf //16进制 15

Number(0xf) //如果字符串是十六进制格式，例如"0xf"，则将其转换为相同大小的十进制整数值； 15

Number('22xx') NaN

parseInt('22xx') //parseInt()函数在转换字符串时，更多的是看其是否符合数值模式。它会忽略字 22 符串前面的空格，直至找到第一个非空格字符。如果第一个字符不是数字字符或者负号， parseInt() 就会返回 NaN；也就是说，用 parseInt()转换空字符串会返回 NaN（Number()对空字符返回 0）。

                如果第一个字符是数字字符，parseInt()会继续解析第二个字符，直到解析完所有后续字符或者遇到了
                一个非数字字符。

parseInt('0xf') //不指定基数意味着让 parseInt()决定如何解析输入的字符串，因此为了避免错误的解析，我们建议无论在什么情况下都明确指定基数。 15

parseInt('0xf',10) 0

parseFloat('0.123.443') //字符串中的第一个小数点是有效的，而第二个小数点就是无效的了，因此它后面的字符串将被忽略 0.123

parseFloat("0908.5"); //它始终都会忽略前导的零 908.5

parseFloat('0x123.33') //十六进制格式的字符串则始终会被转换成 0 0

parseFloat("3.125e7") //如果字符串包含的是一个可解析为整数的数（没有小数点，或者小数点后 31250000 都是零）， parseFloat()会返回整数

(10).toString(2) //数值、布尔值、对象和字符串值（没错，每个字符串也都有一个 toString()方法，该方法返回字 1010 符串的一个副本）都有 toString()方法。通过传递基数， toString()可以输出以二进制、八进制、十六进制

null.toString() //但 null 和 undefined 值没有这个方法 Cannot read property 'toString' of null

String(null) //够将任何类型的值转换为字符串,不至于报错 'null'

//在对非数值应用一元加操作符时，该操作符会像 Number()转型函数一样对这个值执行转换 var s1 = "01"; var s2 = "1.1"; var s3 = "z"; var b = false; var f = 1.1; var o = { valueOf: function() { return -1; } }; s1 = +s1; // 值变成数值 1 s2 = +s2; // 值变成数值 1.1 s3 = +s3; // 值变成 NaN b = +b; // 值变成数值 0 f = +f; // 值未变，仍然是 1.1 o = +o; // 值变成数值-1

== 相等和不相等——先转换再比较 === 全等和不全等——仅比较而不转换 var result1 = ("55" == 55); //true，因为转换后相等 var result2 = ("55" === 55); //false，因为不同的数据类型不相等 null == undefined //true null === undefined //false 0=='' //true 0==='' //false

//逗号操作符，在用于赋值时，逗号操作符总会返回表达式中的最后一项 var num = (5, 1, 4, 8, 0); // num 的值为 0

//label语句 var num = 0; outPoint: for (var i = 0 ; i < 5 ; i++){ for (var j = 0 ; j < 5 ; j++){ if( i == 2 && j == 2 ){ break outPoint; //跳出双层循环 } num++; } } console.log(num); //12

//switch 如果省略 break 关键字， 就会导致执行完当前 case 后，继续执行下一个 case。最后的 default 关键字则用于在表达式不匹配前 面任何一种情形的时候，执行机动代码（因此，也相当于一个 else 语句）。

从根本上讲， switch 语句就是为了让开发人员免于编写像下面这样的代码：
if (i == 25){
  alert("25");
} else if (i == 35) {
  alert("35");
} else if (i == 45) {
  alert("45");
} else {
  alert("Other");

}
而与此等价的 switch 语句如下所示：
switch (i) {
  case 25:
    alert("25");
    break;
  case 35:
    alert("35");
    break;
  case 45:
    alert("45");
    break;
  default:
    alert("Other");
}

//arguments 因为 arguments 对象中的值会自动反映到对应的命名参数，所以修改 arguments[0]，也就修改了 m，结果它们的 值都会变成 2。不过，这并不是说读取这两个值会访问相同的内存空间；它们的内存空间是独立的，但 它们的值会同步。严格模式下则不同步 function a(m,n){ arguments[0]=2 console.log(m,n) } a(1,2) // 2 2

"use strict"
function a(m,n){
  arguments[0]=2
  console.log(m,n)
}
a(1,2) // 1 2

//访问变量有按值和按引用两种方式，而参数只能按值传递。 为了证明对象是按值传递的，我们再看一看下面这个经过修改的例子： function setName(obj) { obj.name = "Nicholas"; obj = new Object(); obj.name = "Greg"; } var person = new Object(); setName(person); alert(person.name); //"Nicholas" 这个例子与前一个例子的唯一区别，就是在 setName()函数中添加了两行代码：一行代码为 obj 重新定义了一个对象，另一行代码为该对象定义了一个带有不同值的 name 属性。在把 person 传递给 setName()后，其 name 属性被设置为"Nicholas"。然后，又将一个新对象赋给变量 obj，同时将其 name 属性设置为"Greg"。如果 person 是按引用传递的，那么 person 就会自动被修改为指向其 name 属性值 为"Greg"的新对象。但是，当接下来再访问 person.name 时，显示的值仍然是"Nicholas"。这说明 即使在函数内部修改了参数的值，但原始的引用仍然保持未变。实际上，当在函数内部重写 obj 时，这 个变量引用的就是一个局部对象了。而这个局部对象会在函数执行完毕后立即被销毁。

//类型检测 typeof 1 //基本类型 person instanceof Object //引用类型

//在 Web 浏览器中，全局执行环境被认为是 window 对象，因 此所有全局变量和函数都是作为 window 对象的属性和方法创建的。

某个执行环境中的所有代码执行完毕后，该环境被销毁， 保存在其中的所有变量和函数定义也随之销毁（全局执行环境直到应用程序退 出——例如关闭网页或浏览器——时才会被销毁）。

每个函数都有自己的执行环境。当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。 而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境

每个环境都可以向上搜索作用域链，以查询变量和函数名； 但任何环境都不能通过向下搜索作用域链而进入另一个执行环境。

JavaScript 没有块级作用域，即 if (true) { var color = "blue"; } alert(color); //"blue" 其他语言都只能在if块内部才能访问到color

如果初始化变量时没有使用 var 声明，该变量会自动被添加到全局环境

#####作用域链 当在某个环境中为了读取或写入而引用一个标识符时，必须通过搜索来确定该标识符实际代表什 么。搜索过程从作用域链的前端开始，向上逐级查询与给定名字匹配的标识符。如果在局部环境中找到 了该标识符，搜索过程停止，变量就绪。如果在局部环境中没有找到该变量名，则继续沿作用域链向上 搜索。搜索过程将一直追溯到全局环境的变量对象。如果在全局环境中也没有找到这个标识符，则意味 着该变量尚未声明。

#####垃圾回收： ######标记回收（mark-and-sweep）： 当变量进入环境（例如，在函数中声明一个变量）时，就将这个变量标记为“进入环境”。从逻辑上讲，永远不能释放进入环境的变 量所占用的内存，因为只要执行流进入相应的环境，就可能会用到它们。而当变量离开环境时，则将其标记为“离开环境”。 垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记（当然，可以使用任何标记方式）。 然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记。而在此之后再被加上标记 的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后，垃圾收集器 完成内存清除工作，销毁那些带标记的值并回收它们所占用的内存空间。 ######引用计数（reference counting）：（有循环引用问题） 跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是 1。 如果同一个值又被赋给另一个变量，则该值的引用次数加 1。相反，如果包含对这个值引用的变量又取 得了另外一个值，则这个值的引用次数减 1。当这个值的引用次数变成 0 时，则说明没有办法再访问这 个值了，因而就可以将其占用的内存空间回收回来。这样，当垃圾收集器下次再运行时，它就会释放那 些引用次数为零的值所占用的内存。

优化内存占用的最佳方式，就是为执行 中的代码只保存必要的数据。一旦数据不再有用，最好通过将其值设置为 null 来释放其引用——这个 做法叫做解除引用（dereferencing）。这一做法适用于大多数全局变量和全局对象的属性。局部变量会在 它们离开执行环境时自动被解除引用， 函数中的局部变量在函数执行完毕后就离开了其执行环境，因此无需我们显式地去为它解除引用。

解除一个值的引用并不意味着自动回收该值所占用的内存。解除引用的真正作用是让值脱离 执行环境，以便垃圾收集器下次运行时将其回收。

离开作用域的值将被自动标记为可以回收，因此将在垃圾收集期间被删除。 “标记清除”是目前主流的垃圾收集算法，这种算法的思想是给当前不使用的值加上标记，然 后再回收其内存。

弱类型：WeakSet(语法同Set，但是值必须是对象类型，不能是值类型)、WeakMap（同Map，但是key必须是对象类型） http://es6.ruanyifeng.com/#docs/set-map WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象， 那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。 这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。 结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。 WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。 因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。 只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。 由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。 另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。 这些特点同样适用于本章后面要介绍的 WeakMap 结构

const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
 [e1, 'foo 元素'],
 [e2, 'bar 元素'],
];
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。 因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。 也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。 基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。 一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。

数组的 length 属性很有特点——它不是只读的 var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组 colors.length = 2; alert(colors[2]); //undefined

如果数组中的某一项的值是 null 或者 undefined，那么该值在 join()、 toLocaleString()、 toString()和 valueOf()方法返回的结果中以空字符串表示。

[null,1,undefined].join() ",1,"

ary.push(item1,item2) =>返回ary数组长度 ary.pop() =>返回弹出的最后一项 ary.shift() =>返回弹出的第一项 ary.unshift(item1,item2) =>返回ary数组长度

sort()方法会调用每个数组项的 toString()转型方法！！！！，然后比较得到的字符串，以 确定如何排序。即使数组中的每一项都是数值， sort()方法比较的也是字符串，如下所示。 var values = [0, 1, 5, 10, 15]; values.sort(); alert(values); //0,1,10,15,5

//若要数值类型比较，则需自己定义比较函数 比较函数接收两个参数，如果第一个参数应该位于第二个之后则返回一个正数,否则返回一个负数 function compare(value1, value2) { if (value1 < value2) { return -1; } else if (value1 > value2) { //大的在后面 return 1; } else { return 0; } } 或 function compare(value1, value2){ return value2 - value1; }

values.sort(compare); alert(values); //0,1,5,10,15

concat() 不改变原数组，返回新数组 slice(index,len) 不改变原数组，返回新数组 splice(index,len,replace) 改变原数组，返回删除的项数组，若没有删除的项，返回空数组

Date 类型的 valueOf()方法，不返回字符串，而是返回日期的毫秒表示。因此，可以 方便使用比较操作符（小于或大于）来比较日期值。请看下面的例子。

var date1 = new Date(2007, 0, 1); //"January 1, 2007"
var date2 = new Date(2007, 1, 1); //"February 1, 2007"
alert(date1 < date2); //true
alert(date1 > date2); //false

正则 开启s标志匹配任意字符 /./.test('\n') false /./s.test('\n') true

由于 RegExp 构造函数的模式参数是字符串，所以在某些情况下要对字符进行双重转义。所有元字符都必须双重转义，那 些已经转义过的字符也是如此，例如\n（字符\在字符串中通常被转义为\，而在正则表达式字符串中就 会变成\\）。下表给出了一些模式，左边是这些模式的字面量形式，右边是使用 RegExp 构造函数定义 相同模式时使用的字符串。

字面量模式 等价的字符串 /[bc]at/ "\[bc\]at" /.at/ "\.at" /name/age/ "name\/age" /\d.\d{1,2}/ "\d.\d{1,2}" /\w\hello\123/ "\w\\hello\\123"

//例：
a=new RegExp("\\[bc\\]at")
a.toString()  //==>"/\[bc\]at/"
a.test('[bc]at')// ==》true

####函数

解析器会率先读取函数声明，并使其在执行 任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真 正被解释执行。请看下面的例子。

alert(sum(10,10)); //20
function sum(num1, num2){
    return num1 + num2;
}

alert(sum(10,10));//sum is not a function
var sum = function(num1, num2){
  return num1 + num2;
};

//函数的名字仅仅是一个包含指针的变量而已
//用arguments.callee消除函数与factorial名称的紧密偶尔，
function factorial(num){
  if (num <=1) {
   return 1;
  } else {
   return num * arguments.callee(num-1)
  }
}

在函数内部，有两个特殊的对象： arguments 和 this。 每个函数都包含两个属性： length 和 prototype 对于ECMAScript 中的引用类型而言， prototype 是保存它们所有实例方法的真正所在。换句话说，诸如 toString()和 valueOf()等方法实际上都保存在 prototype 名下，只不过是通过各自对象的实例访 问罢了。

#####基本包装类型 Boolean、 Number 和 String 每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们 能够调用一些方法来操作这些数据

var s1 = "some text";
var s2 = s1.substring(2);

在运行第二行代码时，后台已经自动完成了一系列的处理 (1) 创建 String 类型的一个实例； (2) 在实例上调用指定的方法； (3) 销毁这个实例。 可以将以上三个步骤想象成是执行了下列 ECMAScript 代码。

var s1 = new String("some text");
var s2 = s1.substring(2);
s1 = null;

引用类型与基本包装类型的主要区别就是对象的生存期。使用 new 操作符创建的引用类型的实例， (所以就算是new Boolean(false)，因为返回的是object，所以也是true) 在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一 行代码的执行瞬间，然后立即被销毁。这意味着我们不能在运行时为基本类型值添加属性和方法。

var s1 = new String("some text")
s1.color='123'
s1.color   //==> "123"

a="222"
a.bbb='ccc'
a.bbb  //==> undefined //问题的原因就是第二行创建的 String 对象在执行第三行代码时已经被销毁了。
                       //第三行代码又创建自己的 String 对象，而该对象没有 color 属性

Object 构造函数也会像工厂方法一样，根据传入值的类型返回相应基本包装类型的实例。例如： var obj = new Object("some text"); alert(obj instanceof String); //true 把字符串传给 Object 构造函数，就会创建 String 的实例；而传入数值参数会得到 Number 的实 例，传入布尔值参数就会得到 Boolean 的实例。

使用 new 调用基本包装类型的构造函数，与直接调用同名的转型函数是不一样的。

var value = "25";
var number = Number(value); //转型函数
alert(typeof number); //"number"
var obj = new Number(value); //构造函数
alert(typeof obj); //"object

indexOf(str,startIndex) lastIndexOf(str,startIndex)

'a' in obj   //对象自身包括原型
for key in obj   //对象自身包括原型所有可枚举的属性
obj.hasOwnProperty('a')  //a是不是对象自身的属性
Object.keys(obj)  //对象自身所有可枚举的属性，不含原型
Object.getOwnPropertyNames(obj) //对象自身所有实例属性，无论是否可枚举

####创建对象 #####原型模式的最大问题是由其共享的本性所导致的 ######组合使用构造函数模式与原型模式

/*创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。构造函数模式用于定义实
例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，
但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参
数；可谓是集两种模式之长。下面的代码重写了前面的例子。*/
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}
Person.prototype = {
    constructor : Person,
    sayName : function(){
        alert(this.name);
    }
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
person1.friends.push("Van");
alert(person1.friends); //"Shelby,Count,Van"
alert(person2.friends); //"Shelby,Count"
alert(person1.friends === person2.friends); //false
alert(person1.sayName === person2.sayName); //true
/*
在这个例子中，实例属性都是在构造函数中定义的，而由所有实例共享的属性 constructor 和方
法 sayName()则是在原型中定义的。而修改了 person1.friends（向其中添加一个新字符串），并不
会影响到 person2.friends，因为它们分别引用了不同的数组。
这种构造函数与原型混成的模式，是目前在 ECMAScript 中使用最广泛、认同度最高的一种创建自
定义类型的方法。可以说，这是用来定义引用类型的一种默认模式*/

#######动态原型模式

function Person(name, age, job){
    //属性
    this.name = name;
    this.age = age;
    this.job = job;
    //方法
    //加上if后，只在new第一个实例时才会定义sayName方法，之后new其他就不会重新定义了
    //if 语句检查的可以是初始化之后应该存在的任何属性或方法——不必用一大堆if 语句检查每个属性和每个方法；只要检查其中一个即可
    //  要么它们全都还没有定义(new第一个实例时)，要么已经全都定义了(new其他实例后)，即它们的存在性是一致的，用同一个判断就可以了，而不需要分别对它们进行判断
    if (typeof this.sayName != "function"){
        Person.prototype.sayName = function(){
           alert(this.name);
        };
        Person.prototype.sayBye = function() {
           alert('bye');
        };
    }
}
var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();

#####确定原型和实例的关系

//使用 instanceof 操作符，只要用这个操作符来测试实例与原型链中出现过的构造函数，结果就会返回 true
instance instanceof Object     //true
instance instanceof SuperType  //true
//isPrototypeOf()方法。同样，只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型，因此 isPrototypeOf()方法也会返回 true
Object.prototype.isPrototypeOf(instance)  //true

//每个构造函数都有一个原型对象f.prototype，
function  f() {
  this.m=1
}
//原型对象都包含一个指向构造函数的指针f.prototype.constructor，
//而实例都包含一个指向原型对象的内部指针obj.__proto__。(obj.__proto__===f.prototype)
obj=new f()

那么，假如我们让原型对象等于另一个类型的实例，结果会怎么样呢？

f.prototype=new f1()//此时f拥有了f1下所有的实例以及原型上的属性和方法

显然，此时的原型对象将包含一个指向另一个原型的指针f.prototype===f1.prototype，相应地，另一个原型中也包含着一个指向另一个构造函数 的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实 例与原型的链条。

####继承 组合继承（combination inheritance），有时候也叫做伪经典继承，指的是将原型链和借用构造函数的 技术组合到一块，从而发挥二者之长的一种继承模式。其背后的思路是使用原型链实现对原型属性和方 法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数 复用，又能够保证每个实例都有它自己的属性。

function SuperType(name){
this.name = name;
this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
alert(this.name);
}
function SubType(name, age){
  //继承属性
  //每个实例都具有自己的属性,不在共享
  SuperType.call(this, name);
  this.age = age;
}
//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
  alert(this.age);
};
var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29
var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27

#####函数声明和函数表达式的主要区别就是函数声明会提升

######闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存
this 对象是在运行时基于函数的执行环境绑定的：

在全局函数中， this 等于 window； 当函数被作为某个对象的方法调用时， this 等于那个对象； 不过，匿名函数的执行环境具有全局性，因此其 this 对象通常指向 window

var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};
alert(object.getNameFunc()()); //"The Window"（在非严格模式下）

每个函数在被调用时都会自动取得两个特殊变量： this 和 arguments。 内部函数在搜索这两个变量时，只会搜索到其活动对象为止， 因此永远不可能直接访问外部函数中的这两个变量 不过，把外部作用域中的 this 对象保存在一个闭包能够访问 到的变量里，就可以让闭包访问该对象了，

var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
      var that = this;
      return function(){
         return that.name;
      };
    }
 };
 alert(object.getNameFunc()()); //"My Object"

  //7.4.1 静态私有变量
 //初始化未经声明的变量，总是会创建一个全局变量,如下Myobject就是全局的，privateVariable是局部的
 (function(){
 //私有变量和私有函数
     var privateVariable = 10;
     function privateFunction(){
         return false;
     }
     //构造函数
     MyObject = function(){
     };
     //公有/特权方法
     MyObject.prototype.publicMethod = function(){
         privateVariable++;
         return privateFunction();
     };
 })();

当在函数内部定义了其他函数时，就创建了闭包。闭包有权访问包含函数内部的所有变量，原理 如下。  在后台执行环境中，闭包的作用域链包含着它自己的作用域、包含函数的作用域和全局作用域。  通常，函数的作用域及其所有变量都会在函数执行结束后被销毁。  但是，当函数返回了一个闭包时，这个函数的作用域将会一直在内存中保存到闭包不存在为止。 使用闭包可以在 JavaScript 中模仿块级作用域（JavaScript 本身没有块级作用域的概念），要点如下。  创建并立即调用一个函数，这样既可以执行其中的代码，又不会在内存中留下对该函数的引用。  结果就是函数内部的所有变量都会被立即销毁——除非将某些变量赋值给了包含作用域（即外 部作用域）中的变量。 闭包还可以用于在对象中创建私有变量，相关概念和要点如下。  即使 JavaScript 中没有正式的私有对象属性的概念，但可以使用闭包来实现公有方法，而通过公 有方法可以访问在包含作用域中定义的变量。  有权访问私有变量的公有方法叫做特权方法。  可以使用构造函数模式、原型模式来实现自定义类型的特权方法，也可以使用模块模式、增强 的模块模式来实现单例的特权方法。 JavaScript 中的函数表达式和闭包都是极其有用的特性，利用它们可以实现很多功能。不过，因为 创建闭包必须维护额外的作用域，所以过度使用它们可能会占用大量内存。

window.resizeTo(x,y)//设置窗口大小为x,y
window.resizeBy(x,y)//设置窗口大小为原来的大小加x,加y
 window.open()
 //接收 4 个参数：要加载的 URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览
//器历史记录中当前加载页面的布尔值。通常只须传递第一个参数，最后一个参数只在不打开新窗口的情
//况下使用。

//如果为 window.open()传递了第二个参数，而且该参数是已有窗口或框架的名称，那么就会在具
//有该名称的窗口或框架中加载第一个参数指定的 URL。
// 如：
//等同于< a href="http://www.wrox.com" target="topFrame"></a>
window.open("http://www.wrox.com/", "topFrame");
//第二个参数也可以是下列任何一个特殊的窗口名称： _self、 _parent、 _top 或_blank。
//第三个参数是一个逗号分隔的设置字符串，表示在新窗口中都显示哪些特性
window.open("http://www.wrox.com/","wroxWindow","height=400,width=400,top=10,left=10,resizable=yes");

//setInterval
var num = 0;
var max = 10;
var intervalId = null;
function incrementNumber() {
    num++;
    //如果执行次数达到了 max 设定的值，则取消后续尚未执行的调用
    if (num == max) {
        clearInterval(intervalId);
        alert("Done");
    }
}
intervalId = setInterval(incrementNumber, 500);
//setTimeout
var num = 0;
var max = 10;
function incrementNumber() {
    num++;
    //如果执行次数未达到 max 设定的值，则设置另一次超时调用
    if (num < max) {
       setTimeout(incrementNumber, 500);
    } else {
       alert("Done");
    }
}
setTimeout(incrementNumber, 500);

//可见，在使用超时调用时，没有必要跟踪超时调用 ID，因为每次执行代码之后，如果不再设置另
//一次超时调用，调用就会自行停止。一般认为，使用超时调用来模拟间歇调用的是一种最佳模式。在开
//发环境下，很少使用真正的间歇调用，原因是后一个间歇调用可能会在前一个间歇调用结束之前启动。
//而像前面示例中那样使用超时调用，则完全可以避免这一点。所以，最好不要使用间歇调用。

 addEventListener() 
 removeEventListener()
//所有 DOM 节点中都包含这两个方法，并且它们都接受 3 个参数：要处
//理的事件名、作为事件处理程序的函数和一个布尔值。
// 最后这个布尔值参数如果是 true，表示在捕获
//阶段调用事件处理程序；如果是 false，表示在冒泡阶段调用事件处理程序。
//可以绑定多次，执行按绑定顺序执行
//这时候的事件处理程序是在元素的作用域中运行；换句话说，程序中的 this 引用当前元素
//回调函数参数event属性：
// currentTarget Element 只读 其事件处理程序当前正在处理事件的那个元素，即绑定事件的元素
// target: Element 只读 当前触发事件的真正目标元素

 attachEvent()
 detachEvent()
//这两个方法接受相同的两个参数：事件处理程序名称与事件处理程序函数。只支持事件冒泡
//可以绑定多次，执行按绑定顺序反方向执行
//IE 实现了与 DOM 中类似的两个方法：事件处理程序会在全局作用域中运行，因此 this 等于 window

var EventUtil = {
    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);//为了在 IE8 及更早版本中运行，此时的事件类型必须加上"on"前缀
        } else {
            element["on" + type] = handler; //document.getElementById("myBtn").onclick = function(){
                                            //  alert("Clicked");
                                            //};只能绑定一次
        }
    },
    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function(event){
        return event ? event : window.event;
    },
    getTarget: function(event){
        return event.target || event.srcElement;
    },
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    //获取相关元素，比如mouseover 和 mouserout 事件时，会涉及更多的元素事件
    getRelatedTarget: function(event){
        if (event.relatedTarget){
            return event.relatedTarget;
        } 
        else if (event.toElement){
            return event.toElement;
        }
        else if (event.fromElement){
             return event.fromElement;
        }
        else {
            return null;
        }
    },
    getWheelDelta: function(event){
        if (event.wheelDelta){
             return (client.engine.opera && client.engine.opera < 9.5 ?
             -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
            //Firefox 支持一个名为 DOMMouseScroll 的类似事件,当向前滚动鼠标滚轮时，这个属性的值是-3 的倍数，当向后滚动
            //  鼠标滚轮时，这个属性的值是 3 的倍数
            //由于Firefox 的值有所不同，因此首先要将这个值的符号反向，然后再乘以 40，就可以保证与其他浏览器的
            //  值相同了。
        }
     },
     //这个属性只有在发生keypress 事件时才包含值，而且这个值是按下的那个键所代表字符的 ASCII 编码
     getCharCode: function(event){
         if (typeof event.charCode == "number"){
             return event.charCode;
         } else {
            return event.keyCode;
         }
     },
};

var btn = document.getElementById("myBtn");
var handler = function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    alert("Clicked");
};
EventUtil.addHandler(btn, "click", handler);
//这里省略了其他代码
EventUtil.removeHandler(btn, "click", handler);

btn.onclick = function(event){
    event = EventUtil.getEvent(event);
};

window 的 load 事件会在页面中的一切都加载完毕时触发，但这个过程可能会因为要加载的外部资源过多而颇费周折 DOMContentLoaded 事件则在形成完整的 DOM 树之后就会触发，不理会图像、 JavaScript 文件、 CSS 文件或其他资源是否已经下载完毕。 与 load 事件不同，DOMContentLoaded 支持在页面下载的早期添加事件处理程序，这也就意味着用户能够尽早地与页面 进行交互

//图片的load事件、script的load事件、link的load事件
//我们是想向 DOM 中添加一个新元素，
//所以必须确定页面已经加载完毕——如果在页面加载前操作 document.body 会导致错误
EventUtil.addHandler(window, "load", function(){
    var image = document.createElement("img");
    EventUtil.addHandler(image, "load", function(event){
        event = EventUtil.getEvent(event);
        alert(EventUtil.getTarget(event).src);
    });
    document.body.appendChild(image);
    image.src = "smile.gif";//新图像元素不一定要从添加到文档后才开始
                              //下载，只要设置了 src 属性就会开始下载。
});
//与图像不同，只有在设置了<script>元素的 src 属性并将该元素添加到文档后，才会开始下载 JavaScript 文件
EventUtil.addHandler(window, "load", function(){
    var script = document.createElement("script");
    EventUtil.addHandler(script, "load", function(event){
        alert("Loaded");
    });
    script.src = "example.js";
    document.body.appendChild(script);
});
//与<script>节点类似，在未指定 href 属性并将<link>元素添加到文档之前也不会开始下载样式表
EventUtil.addHandler(window, "load", function(){
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel= "stylesheet";
    EventUtil.addHandler(link, "load", function(event){
        alert("css loaded");
    });
    link.href = "example.css";
    document.getElementsByTagName("head")[0].appendChild(link);
});

//当浏览器窗口被调整到一个新的高度或宽度时，就会触发 resize 事件
EventUtil.addHandler(window, "resize", function(event){
    alert("Resized");
});

//scroll
//在混杂模式下，可以通过<body>元素的 scrollLeft 和 scrollTop 来监控到这一变化；而在标准模式下，除 Safari 之外的所有浏览器都会通过<html>元素来反映这一变化
EventUtil.addHandler(window, "scroll", function(event){
    if (document.compatMode == "CSS1Compat"){//标准模式
        alert(document.documentElement.scrollTop);
    } else {//混杂模式，主要为了兼容ie
        alert(document.body.scrollTop);
    }
});

var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "mouseout", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var relatedTarget = EventUtil.getRelatedTarget(event);
    alert("Moused out of " + target.tagName + " to " + relatedTarget.tagName);
});

event.clientX/clientY 光标相对视口的位置 event.pageX/pageY 光标相对页面的位置 event.screenX/screenY 光标相对显示屏幕的位置 event.offsetX/offsetY 光标相对目标元素边界的位置

//mousewheel事件，event.wheelDelta属性
//当用户向前滚动鼠标滚轮时， wheelDelta 是 120 的倍数；当用户向后滚动鼠标滚轮时， wheelDelta 是120 的倍数
EventUtil.addHandler(document, "mousewheel", function(event){
    event = EventUtil.getEvent(event);
    var delta = (client.engine.opera && client.engine.opera < 9.5 ?//早期opera方向是反的
    -event.wheelDelta : event.wheelDelta);
    alert(delta);
});
//我们将相关代码放在了一个私有作用域中，从而不会让新定义的函数干扰全局作用域
(function(){
    function handleMouseWheel(event){
        event = EventUtil.getEvent(event);
        var delta = EventUtil.getWheelDelta(event);
        alert(delta);
    }
    EventUtil.addHandler(document, "mousewheel", handleMouseWheel);
    EventUtil.addHandler(document, "DOMMouseScroll", handleMouseWheel);
})();

//在取得了字符编码之后，就可以使用 String.fromCharCode()将其转换成实际的字符。
var textbox = document.getElementById("myText");
EventUtil.addHandler(textbox, "keypress", function(event){
    event = EventUtil.getEvent(event);
    alert(EventUtil.getCharCode(event));
});

contextmenu右键菜单事件

<!DOCTYPE html>
<html>
<head>
<title>ContextMenu Event Example</title>
</head>
<body>
<div id="myDiv">Right click or Ctrl+click me to get a custom context menu.
Click anywhere else to get the default context menu.</div>
<ul id="myMenu" style="position:absolute;visibility:hidden;background-color:
silver">
<li><a href="http://www.nczonline.net">Nicholas’ site</a></li>
<li><a href="http://www.wrox.com">Wrox site</a></li>
<li><a href="http://www.yahoo.com">Yahoo!</a></li>
</ul>
</body>
</html>

EventUtil.addHandler(window, "load", function(event){
    var div = document.getElementById("myDiv");
    EventUtil.addHandler(div, "contextmenu", function(event){
        event = EventUtil.getEvent(event);
        EventUtil.preventDefault(event);
        var menu = document.getElementById("myMenu");
        menu.style.left = event.clientX + "px";
        menu.style.top = event.clientY + "px";
        menu.style.visibility = "visible";
    });
    EventUtil.addHandler(document, "click", function(event){
        document.getElementById("myMenu").style.visibility = "hidden";
    });
});