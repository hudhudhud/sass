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
    
    //字符串模板编译
    Compile(options.el,this)
}

//data数据劫持
function observe(data){
    if(!data || typeof data !=='object')return
    return new Observe(data)
}

function Observe(data){
    for(let key in data){
        let val=data[key]
        observe(val)
        Object.defineProperty(data,key,{
            configurable:true,
            get(){
                return val;
            },
            set(newVal){
                if(val===newVal)return
                val=newVal;
                observe(newVal)//如果新值是个对象，需要重新劫持
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
        Array.from(frag.childNodes).forEach(node=>{
            let txt = node.textContent;
            let reg=/\{\{(.*?)\}\}/g
            if(node.nodeType === 3 && reg.test(txt)){//即是文本节点
              txt=txt.replace(reg,(match,txt)=>{
                return txt.split('.').reduce((res,key)=>{
                    return res[key]
                },vm)
                //若上面看不懂，同下
                // let val = vm
                // txt.split('.').forEach(key=>{ //循环到最后的key值
                //     val = val[key]
                // })
                // return val 
              })
              node.textContent=txt
            }
            if(node.childNodes && node.childNodes.length){
                replace(node)
            }
        })
    }

    replace(fragment)
    vm.$el.appendChild(fragment)
}
