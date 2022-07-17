<template>
  <div
    class="li-table-wrapper"
    
    ref="wrapper"
  >
    <div :style="{'height':height,'overflow':'auto'}" ref="tableWrapper">
      <table
        class="li-table"
        :class="{
          'bordered':bordered,
          'compact':compact,
          'striped':striped
        }"
        ref="table"
      >
        <thead>
          <tr>
            <th :style="{width: '50px'}">
              <!-- css属性半选indeterminate只能通过js操作 -->
              <input
                type="checkbox"
                @change="onchangeAllItem"
                ref="allChecked"
                :checked="areAllItemsSelected">
            </th>
            <th v-if="numberVisible" :style="{width: '50px'}">#</th>
            <th v-for="column in columns" :key="column.field"  :style="{'width':column.width +'px',}">
              <div class="li-table-header">
                {{column.text}}
                <!-- 升序asc 降序desc icon -->
                <span
                  class="li-table-sorter"
                  v-if="column.field in orderBy"
                  @click="changeOrderBy(column.field)">
                  <li-icon :class="{'active':orderBy[column.field] ==='asc'}" name="asc"  />
                  <li-icon :class="{'active':orderBy[column.field] ==='desc'}" name="desc"/>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item,index in dataSource" :key="item.id">
            <td :style="{width: '50px'}">
              <input 
                type="checkbox"
                @change="onchangeItem(item,index,$event)"
                :checked="inSelectedItems(item)">
            </td>
            <td v-if="numberVisible" :style="{width: '50px'}">{{index+1}}</td>
            <!-- template不能放v-for的key -->
            <template v-for="column in columns">
              <td :key="column.flied" :style="{'width':column.width +'px',}">{{item[column.field]}}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="loading" class="li-table-loading">
      <li-icon name="loading"/>
    </div>
  </div>
</template>

<script>
import LiIcon from '../icon.vue'
export default {
  name: 'LiTable',
  components: {LiIcon},
  props: {
    dataSource:{
      type: Array,
      required: true,
      validator (array) {
        return !(array.filter(item => item.id === undefined).length > 0)
      }
    },
    columns: {
      type: Array,
      required: true
    },
    // number 显示
    numberVisible: {
      type:Boolean,
      default: false
    },
    // border
    bordered: {
      type: Boolean,
      default: false
    },
    // 数据紧凑 就是改变padding
    compact: {
      type: Boolean,
      default: false
    },
    // 斑马纹
    striped: {
      type: Boolean,
      default: false
    },
    // 当前选中的
    selectedItems: {
      type: Array,
      default: () => []
    },
    // 表格排序
    orderBy: {
      type: Object,
      default: () => ({}),
    },
    // loading
    loading: {
      type: Boolean,
      default: false
    },
    // 固定height
    height: {
      type: [Number,String]
    },
    

  },
  methods: {
    // 单选
    onchangeItem(item, index, event){
      const selected = event.target.checked
      let copy = JSON.parse(JSON.stringify(this.selectedItems))
      if(selected) {
        if(this.inSelectedItems(item) === false){// 避免重复push
          copy.push(item)
        }
      }else {
        // 因为引用数据类型 只能同过对象的key判断
        copy = copy.filter(i => i.id !== item.id)
      }
      this.$emit('update:selectedItems',copy)
    },
    // 全选或者反选
    onchangeAllItem(event) {
      const selected = event.target.checked
      this.$emit('update:selectedItems', selected ? this.dataSource : [])
    },
    // 当前是否要选中 取决于selectedItems
    inSelectedItems(item){// 因为引用数据类型 只能同过对象的key判断
      return this.selectedItems.filter( i=> i.id ===item.id).length > 0
    },

    // orderBy
    changeOrderBy(key){
      const copy = JSON.parse(JSON.stringify(this.orderBy))
      let oldValue = copy[key]

      if(oldValue === 'asc'){
        copy[key] ='desc'
      }else if(oldValue === 'desc'){
        copy[key] = true
      }else {
        copy[key] = 'asc'
      }
      this.$emit('update:orderBy',copy)
    },

  },
  watch: {
    selectedItems() {
      if(this.selectedItems.length === this.dataSource.length){
        // 全选的时候 半选状态取消
        this.$refs.allChecked.indeterminate = false
      }else if(this.selectedItems.length === 0){
        this.$refs.allChecked.indeterminate = false
      }else {
        this.$refs.allChecked.indeterminate = true
      }
    }
  },
  computed:{
    // 计算是否全选
    areAllItemsSelected(){
      // 判断两个数组的元素两个id一样
      // sort默认字典序 sort会改变原数组 单向数据流
      const a = this.dataSource.map(item =>item.id).sort()
      const b = this.selectedItems.map(item =>item.id).sort()

      if(a.length !== b.length) return false
      let equal = true
      for(let i=0;i<a.length;i++){
        if(a[i] !== b[i]) {
          equal = false
        }
      }
      return equal
    }
  },
  mounted() {
    // 固定表头 实际是复制了一个table thead
    // 只拷贝的table自身 所有后代都没有拷贝 浅拷贝
    let table2 = this.$refs.table.cloneNode(false)
    this.table2 = table2
    table2.classList.add('li-table-copy')
    let tHead = this.$refs.table.children[0]
    let {height} = tHead.getBoundingClientRect()
    // this.$refs.table.style.marginTop = height + 'px'
    // 这里同时出现margin合并了
    this.$refs.tableWrapper.style.marginTop = height + 'px'
    this.$refs.tableWrapper.style.height = parseInt(this.height) - height + 'px'
    console.log(this.$refs.tableWrapper.style.height)
    table2.appendChild(tHead)
    this.$refs.wrapper.appendChild(table2)
  },
  beforeDestroy() {
    this.table2.remove()
  }
}
</script>


<style lang="scss" scoped>
@import '~../../styles/_var.scss';
$grey: darken($grey,10%);
.li-table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  th,td {
    border-bottom: 1px solid $grey;
    // padding: ;
    text-align: left;
    padding: 8px;
  }

  // table边框 
  &.bordered {
    border: 1px solid $grey;
    td, th {
      border: 1px solid $grey;
    }
  }

  // 数据紧凑 就是改变padding
  &.compact {
    td, th {
      padding: 4px;
    }
  }

  // 斑马纹
  &.striped {
    tbody {
      > tr {
        &:nth-child(odd) {
          background: white;
        }
        &:nth-child(even) {
          background: lighten($grey, 10%);
        }
      }
    }
  }

  &-sorter {
    display: inline-flex;
    flex-direction: column;
    margin: 0 4px;
    cursor: pointer;
    svg {
      width: 10px;
      height: 10px;
      fill: $grey;
      &:first-child {
        position: relative;
        bottom: -1px;
      }
      &:nth-child(2){
        position: relative;
        top: -1px;
      }
      &.active {
        fill: red;
      }
    }
  }

  &-header {
    display: flex;
    align-items: center;
  }

  &-wrapper {
    position: relative;
    // 触发bfc 
    // overflow值不为默认的visible块元素
    overflow: auto;
  }
  // loading css
  &-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    svg {
      width: 50px;
      height: 50px;
      @include spin;
    }
  }

  // copy table theader
  &-copy {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
  }
}
</style>