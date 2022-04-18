<template>
  <div id="app" style="padding-top: 100px;padding-left: 100px;">
    <li-popover>
      <template slot="content">
        <div>popover内容1</div>
      </template>
      <li-button>点我</li-button>
    </li-popover>
    <!-- <li-popover>
      <template slot="content">
        <div>popover内容2</div>
      </template>
      <button>点我</button>
    </li-popover> -->
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
