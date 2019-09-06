<template>
    <section>
        <el-select v-model='selected' @change='change'>
            <el-option :value='item.name' :label='item.name' v-for="(item,i) in indexConfig" :key='i'></el-option>
        </el-select>
        <el-button @click='add'>添加</el-button>
        <el-button @click='save'>保存</el-button>
        <el-button @click='clear'>重置</el-button>
        <ul>
            <li v-for='(item,i) in componentList' :key='i'>
                <component :is='item.name' v-model='item.setting'></component>
            </li>
        </ul>
    </section>
</template>
<script>
import indexConfig from '@/components/indexConfig.js'
import {configMap} from '@/components/indexConfig.js'
import components from '@/components'
export default {
    components,
    data(){
        return {
            indexConfig:indexConfig,
            componentList:[],
            selected:'',
            currentItem:null,
        }
    },
    mounted(){
        let page = localStorage.getItem('page')
        if(page){
            this.componentList=JSON.parse(page)
        }
    },
    methods:{
        change(){
           this.currentItem=configMap[this.selected]
        },
        add(){
            this.componentList.push(this.currentItem)
        },
        save(){
            localStorage.setItem('page',JSON.stringify(this.componentList))
        },
        clear(){
            localStorage.removeItem('page')
            this.componentList=[]
        }
    }
}
</script>