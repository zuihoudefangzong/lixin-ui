<template>
  <div class="g-button-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'liButtonGroup',
  mounted() {
    this._buttonWarn()
  },
  methods: {
    _buttonWarn () {
      // console.dir(this.$el)
      // console.log(this.$el)
      // $el.chilren可以获取当前组件所有子元素
      for (let node of this.$el.children) {
        let name = node.nodeName.toLowerCase()
        if( name !== 'button') {
          console.warn(`g-button-group里面的children element应该全是button, 但你写了${name}`)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .g-button-group {
    display: inline-flex;
    vertical-align: middle;
    >.g-button {
      border-radius: 0;
      &:first-child { border-top-left-radius: var(--border-radius); border-bottom-left-radius: var(--border-radius);}
      &:last-child { border-top-right-radius: var(--border-radius); border-bottom-right-radius: var(--border-radius);}
      // &:not(:first-child){ border-left: none;}
      // 自身让-1px 右边的按钮margin-left会盖住左边的
      &:not(:first-child) { margin-left: -1px; }
      &:hover { position: relative; z-index: 1;}
    }
  }
</style>