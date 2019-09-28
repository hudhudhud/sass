<template>
      <el-table :data="list" @selection-change="handleSelectionChange" v-bind="$attrs" v-on="$listeners"  highlight-current-row  @sort-change="handleSortChange">
        <template v-for="(column, index) in columns">
          <slot name="front-slot"> </slot>
          <!-- 复选框 -->
          <el-table-column :key="index" v-if="column.type === 'selection'" type="selection" width="55"> </el-table-column>
          <!-- 序号 -->
          <el-table-column :key="index" v-else-if="column.type === 'index'" type="index" width="50" label="序号"> </el-table-column>
          <!-- 展开 -->
          <el-table-column :key="index" v-else-if="column.type === 'expand'" type="expand" width="100%">
            <template slot-scope="scope">
              <slot v-if="column.slot" :name="column.slot" :scope="scope"></slot>
            </template>
          </el-table-column>
          <!-- 具体内容 -->
          <el-table-column :key="index" v-else-if="!column.hidden" align="left" :label="column.title" :width="column.width"  :sortable="column.sortable"
                           :prop="column.key">
            <template slot-scope="scope">
              <!-- 仅仅显示文字 -->
                <!-- 操作按钮 -->
                <label v-if="column.type === 'operate'">
                  <a   class="operate-button" v-for="(operate, index) in column.operates" :key="index" @click="handleClick(operate, scope.row)"
                       v-if="operate.show==='undefined'||operate.show===scope.row[operate.showKey]">
                    <!--show值与给的列值相等时才显示该按钮-->
                    {{operate.name}}
                  </a>
                </label>
                 <!-- 使用slot的情况下 -->
                <label v-else-if="column.slot">
                  <!-- 具名slot 如果没指定列或者列是有值的，那就用slot，否则没值按空列显示 -->
                  <template >
                    <slot v-if="column.slot" :name="column.slot" :scope="scope"></slot>
                  </template>
                </label>
                <span v-else>
                  {{column.format?column.format(scope.row[column.key]):scope.row[column.key]}}
                </span>
            </template>
          </el-table-column>
        </template>
        <!--默认的slot -->
        <slot/>
      </el-table>
</template>

<script>
export default {
  name: 'base-table',
  props: {
    // 核心数据
    list: {
      type: Array,
      default: () => []
    },
    // columns
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    selection:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      tableHeight: 200
    }
  },
  created(){
    console.log(11111111111,this.$listeners)
  },
  methods: {
    // 处理点击事件
    handleClick(action, data) {
      // emit事件
      this.$emit(`${action.emitKey}`, data)
    },
    handleSelectionChange(data){
        this.$emit(`selectionChange`, data)
    },
    handleSortChange(data){
      this.$emit('sortChange',data)
    },
    isValue(val){
      if(val!==null&&val!==undefined&&val!=='')
        return true
      return false
    }
  }
}
</script>
<style lang="scss">
  a{
    color:#409EFF;
    cursor: pointer;
  }
</style>
