<template>
  <div id="app">
    <!-- tab-click是子组件向外抛出的自定事件 -->
    <li-tabs
    >

    </li-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
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
