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
          <th><input type="checkbox"></th>
          <th v-if="numberVisible">#</th>
          <th v-for="column,index in columns" :key="index">
            {{column.text}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item,index in dataSource" :key="item.id">
          <td>
            <input type="checkbox" @change="onChangeItem(item,)">
          </td>
          <td v-if="numberVisible">{{index+1}}</td>
          <template v-for="column in columns">
            <td>{{item[column.flied]}}</td>
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
      required: true
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

  },
  methods: {

    
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