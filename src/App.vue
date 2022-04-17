<template>
  <div id="app">
    <!-- tab-click是子组件向外抛出的自定事件 -->
    <li-tabs :selected.sync="selectedTab" @update:selected="handleClick">
      <li-tabs-head>
        <li-tabs-item name="1">美女</li-tabs-item>
        <li-tabs-item name="financce">财经</li-tabs-item>
        <li-tabs-item name="sports">体育</li-tabs-item>
        <template slot="actions">
          <button>设置</button>
        </template>
      </li-tabs-head>
      <li-tabs-body>
        <li-tabs-pane name="1">美女相关咨询</li-tabs-pane>
        <li-tabs-pane name="financce">财经相关咨询</li-tabs-pane>
        <li-tabs-pane name="sports">体育相关咨询</li-tabs-pane>
      </li-tabs-body>
    </li-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: 'sports'
    }
  },
  methods: {
      handleClick(data) {
        // console.log(tab, event);
        console.log(data)
      }
  }
}
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
.demo {
  border: 1px solid #666;
  min-height: 100px;
}
</style>
