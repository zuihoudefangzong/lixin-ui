<template>
  <div class="li-table-wrapper">
    <table
      class="li-table"
      :class="{
        'bordered':bordered,
        'compact':compact,
        'striped':striped
      }"
      >
      <thead>
        <tr>
          <th>
            <!-- css属性半选indeterminate只能通过js操作 -->
            <input
              type="checkbox"
              @change="onchangeAllItem"
              ref="allChecked">
          </th>
          <th v-if="numberVisible">#</th>
          <th v-for="column in columns" :key="column.field">
            {{column.text}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item,index in dataSource" :key="item.id">
          <td>
            <input 
              type="checkbox"
              @change="onchangeItem(item,index,$event)"
              :checked="inSelectedItems(item)">
          </td>
          <td v-if="numberVisible">{{index+1}}</td>
          <!-- template不能放v-for的key -->
          <template v-for="column in columns">
            <td :key="column.flied">{{item[column.flied]}}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'LiTable',
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
    selectedItems: {
      type: Array,
      default: () => []
    }
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
    }
    
  },
  watch: {
    selectedItems() {
      if(this.selectedItems.length === this.dataSource.length){
        // 全选的时候 半选状态取消
        this.$refs.allChecked.indeterminate = false
        this.$refs.allChecked.checked = true
      }else if(this.selectedItems.length === 0){
        this.$refs.allChecked.indeterminate = false
        this.$refs.allChecked.checked = false
      }else {
        this.$refs.allChecked.indeterminate = true
      }
    }
  }
}
</script>


<style lang="scss" scope>
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

  &.bordered {
    border: 1px solid $grey;
    td, th {
      border: 1px solid $grey;
    }
  }

  &.compact {
    td, th {
      padding: 4px;
    }
  }

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
}
</style>