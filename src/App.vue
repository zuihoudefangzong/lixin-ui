<template>
  <div id="app" style="padding: 50px;">
    <li-carousel :selected="selected">
      <li-carousel-item name="1">
        <div class="box">1</div>
      </li-carousel-item>
      <li-carousel-item name="2">
        <div class="box">2</div>
      </li-carousel-item>
      <li-carousel-item name="3">
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
      selected: '1'
    }
  },
  mounted() {
    let n = 1
    setInterval(() => {
      if(n===4) {
        n = 1
      }
      this.selected = n.toString()
      n++
    }, 3000);
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
.box {
  width: 200px;
  height: 150px;
  background-color: #99a9bf;
  border: 1px solid red;
}
</style>
