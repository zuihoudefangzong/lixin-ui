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
    selected: Array,
    // accordion是否手风琴模式
    accordion: Boolean
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
    // 所有控制权在collapse
    // 第1 默认先打开当前激活的面板
    this.eventBus.$emit('update:selected', this.selected)

    // 监听子组件的打开$emit
    this.eventBus.$on('update:addSelected', name => {
      // 警告不能直接修改props里面的值 深拷贝的应用
      // JSON序列化stringify就是深拷贝 然后再反序列化转为javascrip
      let selectedCopy = JSON.parse(JSON.stringify(this.selected))
      // 要支持accordion手风琴
      if (this.accordion) {
        // 警告不能直接修改props里面的值
        // this.selected = [name]
        // 这里就用到了深拷贝
        selectedCopy = [name]
      }
      else {
        selectedCopy.push(name)
      }
      // 通知子组件更新了
      this.eventBus.$emit('update:selected', selectedCopy)
      // 这是通知外面的
      this.$emit('update:selected', selectedCopy)
    })

    this.eventBus.$on('update:removeSelected', name => {
      // 警告不能直接修改props里面的值 深拷贝的应用
      // JSON序列化stringify就是深拷贝 然后再反序列化转为javascrip
      let selectedCopy = JSON.parse(JSON.stringify(this.selected))
      let index = selectedCopy.indexOf(name)
      selectedCopy.splice(index, 1)
      // 通知子组件更新了
      this.eventBus.$emit('update:selected', selectedCopy)
      // 这是通知外面的
      this.$emit('update:selected', selectedCopy)
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