<template>
  <div class="collapse-item">
    <div class="title" @click="open = !open">{{title}}</div>
    <div class="content" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiCollapseItem',
  props: {
    title: {
      type: String,
      // 必传
      require: true
    }
  },
  data() {
    return {
      // default不打开
      open: false
    }
  }
}
</script>

<style lang="scss" scoped>
$grey: #ebeef5;
$border-radius: 4px;
.collapse-item {
  >.title {
    // 每个面板titl都应该有border
    border: 1px solid $grey;
    // 避免重叠 占父元素的位置
    margin: -1px;
    margin-bottom: 0;
    min-height: 32px;
    display: flex;
    align-items: center;
    padding: 0 8px;
  }
  // 第一个div.collapse-item
  &:first-child {
    .title {
      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;
    }

  }
  // 最后一个div.collapse-item
  &:last-child {
    >.title:first-child {
      border-bottom-left-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
    margin-bottom: -1px;
  }
  // 这里div.centent可以不加的 
  >.content {
    padding: 8px;
  }
}
</style>