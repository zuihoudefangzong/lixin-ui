<template>
  <div id="app">
    <button @click="handleClick">打我</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(){
      this.$toast('我是message')
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
