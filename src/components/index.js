// import MyInput from '@/components/MyInput.vue'
// import MyCheckbox from '@/components/MyCheckbox.vue'
// import MySelect from '@/components/MySelect.vue'

//export default
// {
//     MyInput,
//     MyCheckbox,
//     MySelect,

// }

//通过动态获取文件夹下文件来引入需要的模块


// require.context模块导出（返回）一个（require）函数，这个函数可以接收一个参数：request 函数–这里的 request 应该是指在 require() 语句中的表达式
const requireFun = require.context('.', false, /^\.\/My.*\.vue$/)

let modules = {}
// 导出的方法有 3 个属性： resolve, keys, id。
// resolve 是一个函数，它返回请求被解析后得到的模块 id。
// keys 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
// id 是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到

//['./MyInput.vue','./MySelect.vue']
requireFun.keys().forEach((file)=>{
    let componetName = file.replace(/(\.\/|\.vue)/g, ''); // 'MyInput'
    modules[componetName] = requireFun(file).default || requireFun(file)
})
export default modules

