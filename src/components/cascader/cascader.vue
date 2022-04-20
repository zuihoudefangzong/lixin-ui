<template>
  <div class="trigger">
    <slot></slot>
    <div class="popover">
      <div v-for="item in options" :key="item.name">
        <li-cascader-items :optionItem="item"></li-cascader-items>
      </div>
    </div>
  </div>
</template>

<script>
import LiCascaderItems from './cascader-items.vue'
export default {
  name: 'LiCascader',
  props: {
    // 数据源
    options: Array
  },
  components: { LiCascaderItems },
  created() {
    console.log(this.options)
  }
}
</script>

<style lang="scss" scoped>
</style>