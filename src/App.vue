<template>
  <div id="app">
    <li-carousel class="wrapper" :selected.sync="selected">
      <li-carousel-item name="第1">
        <div class="box">1</div>
      </li-carousel-item>
      <li-carousel-item name="第2">
        <div class="box">2</div>
      </li-carousel-item>
      <li-carousel-item name="第3">
        <div class="box">3</div>
      </li-carousel-item>
    </li-carousel>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      selected: undefined
    }
  },
  mounted() {
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
.wrapper {margin: 20px;}
.box {
  width: 100%;
  height: 550px;
  background-color: #99a9bf;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
</style>
