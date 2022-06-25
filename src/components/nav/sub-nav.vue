<template>
  <div
    class="li-sub-nav"
    :class="{
      'active': active,
      'vertical':vertical
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
    <!-- vertical的时候 -->
    <template v-if="vertical">
      <transition
        @enter="enter"
        @leave="leave"
        @after-leave="afterLeave"
        @after-enter="afterEnter"
      >
        <div
          class="li-sub-nav-popover"
          v-show="open"
          :class="{'vertical':vertical}"
        >
          <slot></slot>
        </div>
      </transition>
    </template>
    <!-- else 横着 -->
    <template v-else>
      <div class="g-sub-nav-popover" v-show="open">
        <slot></slot>
      </div>
    </template>
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
  inject: ['root','vertical'],
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
    click () { this.open = false },
    // vertical的transition
    enter (el,done) {// enter进入
      // 获取到height 
      const {height} = el.getBoundingClientRect()
      // 用的v-else 先变成0
      el.style.height = 0
      // 强制让上面height生效
      // 避免多次赋值 浏览器height合并了 只认最后一次赋值
      el.getBoundingClientRect()
      el.style.height = `${height}px`
      el.addEventListener('transitionend', () => {
        done()
      })
    },
    afterEnter (el) {
      el.style.height = 'auto'
    },
    leave: function (el, done) {
      let {height} = el.getBoundingClientRect()
      // console.log(height)
      el.style.height = `${height}px`
      el.getBoundingClientRect()
      el.style.height = 0
      el.addEventListener('transitionend', () => {
        // 过渡事件结束后才调用done()
        done()
      })
    },
    afterLeave: function (el) {
      el.style.height = 'auto'
    },
  },
  
}
</script>
<style lang="scss" scoped>
@import '~../../styles/_var.scss';
.li-sub-nav{
  position: relative;
  &:not(.vertical) {
    &.active {
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
    transition: height 250ms;
    // 纵向的vertical
    &.vertical{
      position: static;
      border-radius: 0;
      border: none;
      box-shadow: none;
      // 高度的变化 动画不流畅
      overflow: hidden;
    }
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
      svg {fill: $light-color;}
      &.open {
        transform: rotate(180deg);
      }
      &.vertical {
        transform: rotate(90deg);
        &.open {
          transform: rotate(270deg);
        }
      }
    }
  }
  
}
</style>