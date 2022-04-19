<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LiCollapse'
}
</script>

<style lang="scss" scoped>
$grey: #ebeef5;
$border-radius: 4px;
.collapse {
  // border-top: 1px solid #ebeef5;
  // border-bottom: 1px solid #ebeef5;
  border: 1px solid #ebeef5;
  border-radius: $border-radius;
}
</style>