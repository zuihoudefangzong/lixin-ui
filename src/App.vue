<template>
  <div id="app" style="padding-top: 100px; padding-left: 300px;">
    <li-popover>
      <template slot="content">
        <div>popover上面内容</div>
      </template>
      <li-button>上面</li-button>
    </li-popover>
    <li-popover position="bottom">
      <template slot="content">
        <div>popover下面内容</div>
      </template>
      <li-button>下面</li-button>
    </li-popover>
    <br>
    <li-popover position="left">
      <template slot="content">
        <div>popover左边1</div>
      </template>
      <li-button>左边</li-button>
    </li-popover>
    <li-popover position="right">
      <template slot="content">
        <div>popover右边内容2</div>
      </template>
      <li-button>右边</li-button>
    </li-popover>
  </div>
</template>

<script>
export default {
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
</style>
