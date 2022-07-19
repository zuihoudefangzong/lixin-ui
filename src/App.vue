<template>
  <div class="container">
    <!-- <div>{{selected}}</div> -->
    <li-table
      :dataSource="dataSource"
      :columns="columns"
      bordered
      striped
      :selected-items.sync="selected"
      :order-by.sync="orderBy"
      @update:orderBy="updateDataSource"
      :loading="loading"
      height="400"
      expend-field="description"
      checkable
    >
      <!-- 默认插槽slot和作用域插槽slot-scope应用 -->
      <template slot-scope="xxx">
        <button @click="edit(xxx.item)">编辑</button>
        <button @click="deleteItem(xxx.item)">删除</button>
      </template>
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
        {id:1,name:'方方',score:100,description:'你好方方'},
        {id:2,name:'圆圆',score:88},
        {id:3,name:'张三',score:99},
        {id:4,name:'李四',score:77},
        {id:5,name:'超人',score:66},
        {id:6,name:'蝙蝠侠',score:777},
        {id:7,name:'汽车人',score:93},
        {id:8,name:'方方',score:100},
        {id:9,name:'圆圆',score:88},
        {id:10,name:'张三',score:99},
        {id:11,name:'李四',score:77},
        {id:12,name:'超人',score:66},
        {id:13,name:'蝙蝠侠',score:777},
        {id:14,name:'汽车人',score:93},
        {id:15,name:'方方',score:100},
        {id:16,name:'圆圆',score:88},
        {id:17,name:'张三',score:99},
        {id:18,name:'李四',score:77},
        {id:19,name:'超人',score:66},
        {id:20,name:'蝙蝠侠',score:777},
      ],
      columns: [
        {text:'姓名',field:'name',width:100},
        {text:'分数',field:'score',},
      ],
      selected:[],
      orderBy: {
        score: true
      },
      loading: false
    }
  },
  methods: {
    updateDataSource() {
      this.loading = true
      // 发送到后端mysql排序
      // this.dataSource = this.dataSource.sort((a,b)=> a.score-b.score)
     setTimeout(() => {
      
      this.dataSource = this.dataSource.sort((a,b)=> b.score-a.score)
      this.loading = false
     }, 3000);
    },
    edit(obj){
      console.log(obj,'编辑')
    },
    deleteItem(obj) {
      console.log(obj,'delete')
    }
  }
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
