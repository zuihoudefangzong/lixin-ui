<template>
  <div class="tabs-item" @click="xxx">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:  'LiTabsItem',
  inject: ['eventBus'],
  props: {
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 每个选项卡name
    name: {
      type: String || Number,
      // 必传
      require: true
    }
  },
  created(){
    this.eventBus.$on('update:selected', (name) => {
      console.log(name)
    })
  },
  methods: {
    xxx() {
      this.$emit('update:selected','这是组件本身向外抛出的事件');
      this.eventBus.$emit('update:selected', this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-item {
  
}
</style>