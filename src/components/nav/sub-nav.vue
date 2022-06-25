<template>
  <div
    class="li-sub-nav"
    :class="{
      'active': active
    }"
    v-click-outside="click"
  >
    <span @click="onClick">
      <slot name="title"></slot>
    </span>
    <div
      class="li-sub-nav-popover"
      v-show="open"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ClickOutside from '../click-outside'
export default {
  name: 'LiSubNav',
  props: {
    name: String,
    required: true
  },
  data() {
    return {
      open: false,
    }
  },
  inject: ['root'],
  computed: {
    active () {
      return this.root.namePath.indexOf(this.name) >=0 ? true : false
    }
  },
  directives: { ClickOutside },
  methods: {
    onClick () {
      this.open = !this.open
    },
    updateNamePath() {
      this.active = true
      // 路径名 追加到前面
      this.root.namePath.unshift(this.name)
      if(this.$parent.updateNamePath && this.$parent.$options.name === 'LiSubNav') {
        this.$parent.updateNamePath()
      }
      // else{
      //   this. this.root.namePath = []
      // }
    },
    click () { this.open = false }
  },
  
}
</script>
<style lang="scss" scoped>
@import '~../../styles/_var.scss';
.li-sub-nav{
  position: relative;
  &.active {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border-top: 1px solid $blue;
    }
  }
  >span {
    padding: 10px 20px;
    display: block;
    // display: inline-block;// inline-block有bug
    // vertical-align: top;// 配合vertical
  }
  &-popover {
    position: absolute;
    top: 100%;
    left: 0;
    white-space: nowrap;
    background: white;
    margin-top: 4px;
    box-shadow: 0 0 3px fade_out(black, 0.8);
    border-radius: $border-radius;
    font-size: $font-size;
    color: $light-color;
    min-width: 8em;
  }
}

// 多级嵌套子菜单
.li-sub-nav .li-sub-nav  {
  .li-sub-nav-popover{
    // background: green;
    // position: absolute;
    top: 0;
    left: 100%;
    margin-left: 8px;
  } 
}
</style>