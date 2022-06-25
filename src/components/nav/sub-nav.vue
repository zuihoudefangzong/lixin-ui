<template>
  <div
    class="li-sub-nav"
    :class="{
      'active': active
    }"
    v-click-outside="click"
  >
    <span
      class="li-sub-nav-label"
      @click="onClick"
    >
      <slot name="title"></slot>
      <span
        class="li-sub-nav-icon"
        :class="{'open':open}">
        <li-icon name="right"></li-icon>
      </span>
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
import liIcon from '../icon.vue'
export default {
  name: 'LiSubNav',
  components: { liIcon},
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
  &-label {
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
  &-icon { display: none;}
}

// 多级嵌套子菜单
.li-sub-nav .li-sub-nav  {
  &.active {
    &::after {
      display: none;
    }
  }
  .li-sub-nav-popover{
    // background: green;
    // position: absolute;
    top: 0;
    left: 100%;
    margin-left: 8px;
  }
  .li-sub-nav-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .li-sub-nav-icon {
      display: inline-flex;
      margin-left: 1em;
      transition: transform 250ms;
      &.open {
        transform: rotate(180deg);
      }
      svg {fill: $light-color;}
    }
  }
  
}
</style>