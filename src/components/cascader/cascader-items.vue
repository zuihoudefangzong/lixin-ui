<template>
  <div class="cascder-item">
    <div class="left">
      <div class="label"
        v-for="item in items"
        :key="item.name"
        @click="leftSelected = item"
      >
      {{item.name}}
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <li-cascader-items :items="rightItems"></li-cascader-items>
    </div>
  </div>
</template>

<script>
export default {
  // 如果你在vue里面用到自己name属性相同的标签名
  // 那么这个标签就是自己
  name: 'LiCascaderItems',
  props: {
    items: Array
  },
  data() {
    return {
      leftSelected: null
    }
  },
  computed: {
    // 判断右边是否要渲染
    rightItems() {
      if( this.leftSelected && this.leftSelected.children) {
        return this.leftSelected.children
      }
      else {
        return null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cascder-item {
  display: flex;
  align-items: flex-start;
  .left {
    border: 1px solid red;
  }
  .right {
    margin-top: -1px;
  }
}
</style>