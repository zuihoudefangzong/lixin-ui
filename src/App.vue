<template>
  <div class="container">
    <div>{{selected}}</div>
    <li-table
    :dataSource="dataSource"
    :columns="columns"
    bordered
    striped
    :selected-items.sync="selected"
    >
    </li-table>
    <li-table
    style="margin-top:20px;"
    :dataSource="dataSource"
    :columns="columns"
    bordered
    compact
    >
    </li-table>
  </div>
</template>


<script>
import LiTable from './components/table/table.vue'

export default {
  name: 'LiNavTest',
  components: {LiTable},
  data () {
    return {
      dataSource: [
        {id:1,name:'方方',score:100},
        {id:2,name:'圆圆',score:88},
        {id:3,name:'张三',score:99},
        {id:4,name:'李四',score:77},
        {id:5,name:'超人',score:66},
        {id:6,name:'蝙蝠侠',score:70},
        {id:7,name:'汽车人',score:93},
      ],
      columns: [
        {text:'姓名',flied:'name'},
        {text:'分数',flied:'score'},
      ],
      selected: []
    }
  },

};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* :root伪类选择器匹配文档根元素。 */
/* 直接写.g-button也行 */
html {--font-size: 14px;}
/* :root伪类选择器配合var()函数 */
body {font-size: var(--font-size);}
img { max-width: 100%;}
.container {
  margin: 10px;
}
</style>
