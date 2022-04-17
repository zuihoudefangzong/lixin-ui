<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:  'LiTabs',
  props: {
    // 当前激活的选项卡
    selected: {
      type: String,
      // 必传
      require: true
    },
    // 选项卡方向 default为y轴水平方向horizontal
    // x垂直方向vertical
    direction: {
      type: String,
      default: 'horizontal',
      validotor() {
        return ['vertical', 'horizontal'].indexOf >= 0
      }
    }
  },
  created() {
    // this.$emit('update:selected', param);
  }
}
</script>

<style lang="scss" scoped>
.tabs {

}
</style>