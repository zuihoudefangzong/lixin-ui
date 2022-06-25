<template>
  <div
    class="li-nav-item"
    :class="{
      'selected':selected,
      'vertical':vertical
    }"
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
  inject: ['root','vertical'],
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
  &:not(.vertical) {
    &.selected {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom: 2px solid $blue;
        width: 100%;
      }
    }
  }
  &.vertical {
    &.selected {
      color: $blue;
    }
  }
  a {
    // color继承父元素
    color: inherit;
    text-decoration: none;
  }
}
// 二级菜单
.li-sub-nav .li-nav-item {
  &:not(.vertical){
    &.selected {
      color: $color;
      background: $grey;
      &::after {
        display: none;
      }
    }
  }
  &.vertical {
    &.selected {
      color: $blue;
    }
  }
}
</style>