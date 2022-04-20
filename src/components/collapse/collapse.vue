<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'LiCollapse',
  props: {
    // 当前激活的面板
    selected: String
  },
  data() {
    return {
      eventBus: new Vue()
    }
  },
  provide() {
    return {
      eventBus: this.eventBus
    }
  },
  mounted() {
    this.eventBus.$emit('update:selected', this.selected)
    this.eventBus.$on('update:selected', name => {
      this.$emit('update:selected', name)
    })
  }
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