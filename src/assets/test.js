var statuss;
(function (statuss) {
    statuss[statuss["a"] = 0] = "a";
    statuss[statuss["b"] = 1] = "b";
})(statuss || (statuss = {}));
var val = statuss[0];
console.log(val);
//不会为字符串枚举成员生成反向映射 sad.....
var mystatus;
(function (mystatus) {
    mystatus["Draft"] = "Draft";
    mystatus["Published"] = "Published";
})(mystatus || (mystatus = {}));
// string to enum
var str = 'Draft';
var my = mystatus[str];
// enum to string
mystatus[mystatus.Published] === 'Published';
