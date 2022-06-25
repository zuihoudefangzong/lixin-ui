<template>
  <div
    class="li-nav-item"
    :class="{'selected':selected}"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LiNavItem',
  props: {
    name: String,
    required: true
  },
  data () {
    return {
      selected: false
    }
  },
  inject: ['root'],
  methods: {
    onClick () {
      // 选中先清空namePath 
      this.root.namePath = []
      if(this.$parent.updateNamePath && this.$parent.$options.name === 'LiSubNav' ) {
        this.$parent.updateNamePath()
      }
      this.$emit('update:selected',this.name)
    },
    
  },
  created () {
    this.root.addItem(this)
  },
  
}
</script>

<style lang="scss" scoped>
@import '~../../styles/_var.scss';
.li-nav-item {
  padding: 10px 20px;
  position: relative;
  &.selected {
    // background: red;
    // 避免border占位文档流 用定位了
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-top: 1px solid $blue;
    }
  }
  a {
    color: inherit;
    text-decoration: none;
  }
}
// 二级菜单
.li-sub-nav .li-nav-item {
  &.selected {
    color: $color;
    background: $grey;
    &::after {
      display: none;
    }
  }
}
</style>