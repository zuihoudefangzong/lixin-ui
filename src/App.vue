<template>
  <div id="app">
    <div class="box">
      <li-input value="张三"></li-input>
      <li-input value="张三" disabled ></li-input>
      <li-input value="张三" readyonly ></li-input>
    </div>
    <div class="box">
      <li-input value="张三" error="姓名不能少于两个字" ></li-input>
    </div>
    
    <div style="margin:20px">
          <li-button :loading="loading1" @click="loading1 = !loading1">按钮</li-button>
      <li-button icon="settings" icon-position="left" :loading="loading2" @click="loading2 = !loading2">按钮</li-button>
      <li-button-group>
        <li-button icon="left">上一页</li-button>
        <li-button>更多</li-button>
        <li-button icon="right" icon-position="right">下一页</li-button>
      </li-button-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading1: false,
      loading2: false,
      loading3: false,
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
.box {
  margin: 20px;
}
</style>
