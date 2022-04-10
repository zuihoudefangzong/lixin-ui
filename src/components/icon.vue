<template>
  <svg class="g-icon">
    <!-- 要改变svg的颜色 用css3的fill就可 -->
    <use :xlink:href="`#i-${name}`"></use>
  </svg>
</template>

<script>
// 直接import会直接运行
import "./svg";
export default {
  name: "GIcon",
  // 组件之间传参
  // 假如用户没
  props: ['name'],
};
</script>

<style lang="scss" scoped>
  // 让icon大小 和字体宽高一样
  .g-icon {width: 1em; height: 1em; }
</style>