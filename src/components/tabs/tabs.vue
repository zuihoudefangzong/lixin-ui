<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>
<script>
// 为了用事件总线
import Vue from 'vue'
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
  data() {
    return {
      // 自身访问的
      eventBus: new Vue()
    }
  },
  // 实例选项provide
  provide(){
    return {
      // 让任意后代组件访问的eventBus
      eventBus: this.eventBus
    }
  },
  methods: {
    // 要选判断tabs组件默认第一层子组件
    checkChildren(){
      if (this.$children.length === 0) {
        console && console.warn &&
          console.warn('tabs的子组件应该是tabs-head和tabs-nav，但你没有写子组件')
      }
    },
    // 判断初始子组件选项卡的位置
    selectTab() {
      // 要判断里面是否有组件名为li-head
      this.$children.forEach( (vm) => {
        if(vm.$options.name === 'LiTabsHead') {
          vm.$children.forEach( childVm => {
            if( childVm.$options.name === 'LiTabsItem'
              && childVm.name === this.selected) {
                this.eventBus.$emit('update:selected', this.selected, childVm);
              }
          })
        }
      })
    }
  },
  mounted() {
    this.checkChildren()
    this.selectTab()
  }
}
</script>

<style lang="scss" scoped>
.tabs {

}
</style>