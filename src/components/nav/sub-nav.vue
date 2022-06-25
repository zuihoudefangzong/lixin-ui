<template>
  <div class="li-sub-nav">
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
export default {
  name: 'LiSubNav',
  data() {
    return {
      open: false
    }
  },
  methods: {
    onClick () {
      this.open = !this.open
    }
  }
}
</script>
<style lang="scss" scoped>
.li-sub-nav{
  position: relative;

  >span {
    padding: 10px 20px;
    display: inline-block;// inline-block有bug
    vertical-align: top;// 配合vertical
  }
  &-popover {
    position: absolute;
    top: 100%;
    left: 0;
    border: 1px solid black;
    white-space: nowrap;
  }
}
</style>