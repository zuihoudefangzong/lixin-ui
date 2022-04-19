<template>
  <div id="app" style="padding: 100px;">
    <li-collapse>
      <li-collapse-item title="标题一">内容一</li-collapse-item>
      <li-collapse-item title="标题二">内容二</li-collapse-item>
      <li-collapse-item title="标题三">内容三</li-collapse-item>
    </li-collapse>
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
