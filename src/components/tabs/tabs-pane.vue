<template>
  <div class="tabs-pane" :class="classes" v-if="active">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:  'LiTabsPane',
  props: {
    name: {
      type: String || Number,
      // 必传
      require: true
    }
  },
  // 在任何后代组件里，我们都可以使用inject选项
  // 接收指定的我们想要添加在这个实例上的property
  inject: ['eventBus'],
  data() {
    return {
      active: false
    }
  },
  created(){
    this.eventBus.$on('update:selected', (name) => {
      this.active = name === this.name
    })
  },
  computed: {
    classes() {
      return {
        'active': this.active
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-pane {
  padding: 1em;
  &.active {}
}
</style>