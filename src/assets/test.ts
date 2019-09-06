enum statuss {
    a,
    b
}

let val=statuss[0]
console.log(val)

//不会为字符串枚举成员生成反向映射 sad.....


enum mystatus {
    Draft = 'Draft',
    Published = 'Published'
}

// string to enum
const str = 'Draft';
const my: mystatus = mystatus[str];

// enum to string
mystatus[mystatus.Published] === 'Published'