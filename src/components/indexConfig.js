//import components from './index'

let config=[{
    name:'MyInput',
    //component:components.MyInput,
    setting:'',
},
{
    name:'MyCheckbox',
   // component:components.MyCheckbox,
    setting:true,
},
{
    name:'MySelect',
    //component:components.MySelect,
    setting:{select1:'',select2:''}
}]
export default config

let _configMap={}
config.forEach(item=>{
    _configMap[item.name]=item
})

export const configMap=_configMap;