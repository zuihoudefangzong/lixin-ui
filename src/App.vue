<template>
  <div id="app">
    <g-button :loading="loading1" @click="loading1 = !loading1">按钮</g-button>
    <g-button icon="settings" icon-position="left" :loading="loading2" @click="loading2 = !loading2">按钮</g-button>
    <g-button-group>
      <g-button icon="left">上一页</g-button>
      <g-button>更多</g-button>
      <g-button icon="right" icon-position="right">下一页</g-button>
    </g-button-group>
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
body {font-size: var(--font-size);}
img { max-width: 100%;}
</style>
