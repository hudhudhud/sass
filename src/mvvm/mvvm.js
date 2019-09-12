// defineProperty example
(function(){
    let a={}
    let newV=123
    Object.defineProperty(a,'val',{
        configurable:true,
        enumerable:true,
        get(){
            return newV;
        },
        set(newVal){
            newV=newVal
        }
    })
})()

//https://github.com/codeyu/mini-mvvm/blob/master/src/js/mvvm.js
// start

function Mvvm(options={}){
    this.$options=options;
    let data = this._data = this.$options.data;
    //data劫持
    observe(data)

    //this代理this._data,即原来访问要data要mvvm._data.song，现在就mvvm.song
    for(let key in data){
        Object.defineProperty(this,key,{
            configurable:true,
            get(){
                return this._data[key]
            },
            set(newV){
                this._data[key]=newV
            }
        })
    }
    
    // 初始化computed,将this指向实例
    initComputed.call(this)

    //字符串模板编译
    Compile(options.el,this)

    // 所有事情处理好后执行mounted钩子函数
    options.mounted.call(this)
}

function initComputed(){
    let vm = this;
    let computed=this.$options.computed;
    Object.keys(computed).forEach(key=>{
        Object.defineProperty(vm,key,{
            // 这里判断是computed里的key是对象还是函数
            // 如果是函数直接就会调get方法,get方法即computed方法
            // 如果是对象的话，手动调一下get方法即可
            // 如： sum() {return this.a + this.b;},他们获取a和b的值就会调用get方法
            // 所以不需要new Watcher去监听变化了
            get:typeof computed[key] === 'function' ? computed[key]:computed[key].get,
            set(){}
        })
    })
}

//data数据劫持
function observe(data){
    if(!data || typeof data !=='object')return
    return new Observe(data)
}

function Observe(data){
    for(let key in data){
        let dep = new Dep()
        let val=data[key]
        observe(val)
        Object.defineProperty(data,key,{
            configurable:true,
            get(){
                Dep.target && dep.addSub(Dep.target)  // 将watcher添加到订阅事件中 [watcher]
                //console.log('subs list',dep.subs)
                return val;
            },
            set(newVal){
                if(val===newVal)return
                val=newVal;
                observe(newVal)//如果新值是个对象，需要重新劫持
                dep.notify()  // 让所有watcher的update方法执行即可
            }
        })
    }
}

//数据编译，字符串模板解析
function Compile(el,vm){
    vm.$el=document.querySelector(el)

    //把el下面的所有节点放到文档碎片里（没有实际的节点），字段替换完成之后再一次append到el下
    let fragment = document.createDocumentFragment()
    let child = null;
    while(child = vm.$el.firstChild){
        //若添加的子元素是文档中存在的元素，则通过appendChild在为其添加子元素时，会从文档中删除之前存在的元素
        fragment.appendChild(child)
    }

    function replace(frag){
        let placeholders=[]//记录已经绑定过的{{}}就不重复绑定
        Array.from(frag.childNodes).forEach(node=>{
            let txt = node.textContent;
            let reg=/\{\{(.*?)\}\}/g

            //字符串模板
            if(node.nodeType === 3 && reg.test(txt)){//即是文本节点
               let replaceTxt = function(){
                  // console.log('replaceTxt...',txt)
                   node.textContent=txt.replace(reg,(match,placeholder)=>{
                        //监听变化
                        //给Watcher添加两个参数，用来取新的值（newVal）给回调函数传参
                        if(placeholders.indexOf(placeholder)===-1){
                            new Watcher(vm, placeholder, replaceTxt);   // 监听变化，进行匹配替换内容
                            placeholders.push(placeholder)
                        }
                        return placeholder.split('.').reduce((res,key)=>{
                                return res[key]
                            },vm)

                        //若上面看不懂，同下
                        // let val = vm
                        // txt.split('.').forEach(key=>{ //循环到最后的key值
                        //     val = val[key]
                        // })
                        // return val 
                    })
                }
                replaceTxt()
            }

            //v-model
            if(node.nodeType===1){ //元素节点
                let nodeAttr= node.attributes
                Array.from(nodeAttr).forEach(attr => {
                    let name = attr.name;   // v-model  type
                    let exp = attr.value;   // c        text
                    if (name.includes('v-')){
                        node.value = vm[exp];   // this.c 为 2
                    }
                    // 监听变化
                    new Watcher(vm, exp, function(newVal) {
                        node.value = newVal;   // 当watcher触发时会自动将内容放进输入框中
                    });
                    
                    node.addEventListener('input', e => {
                        let newVal = e.target.value;
                        // 相当于给this.c赋了一个新值
                        // 而值的改变会调用set，set中又会调用notify，notify中调用watcher的update方法实现了更新
                        vm[exp] = newVal;   
                    });
                });
            }

            if(node.childNodes && node.childNodes.length){
                replace(node)
            }
        })
    }

    replace(fragment)
    vm.$el.appendChild(fragment)
}

//发布订阅，即修改数据更新页面
//在set的时候更新界面，在get的时候订阅，替换文本的时候监听改文本的变化
function Dep(){
    this.subs=[]
}
Dep.prototype={
    addSub(sub){
        this.subs.push(sub)
    },
    notify(){
        console.log('notify....')
        // 绑定的方法，都有一个update方法
        this.subs.forEach(sub=>sub.update())
    }
}

 //监听函数
function Watcher(vm,exp,fn){
    this.fn=fn
    this.vm = vm
    this.exp = exp

    Dep.target=this
}

Watcher.prototype.update=function(){
    let nv=this.vm
    let ary = this.exp.split('.')
    ary.forEach(key=>{
        nv=nv[key]
    })
    this.fn(nv)
}
// let watcher = new Watcher(()=>console.log(111))
// let dep = new Dep()
// dep.addSub(watcher) //将watcher放到数组中，watcher自带update方法
// dep.notify()  //111

