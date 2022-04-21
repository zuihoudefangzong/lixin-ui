<template>
  <div class="cascder-item" :style="{height: height}">
    <div class="left">
      <div class="label"
        v-for="item in items"
        :key="item.name"
        @click="leftSelected = item"
      >
      {{item.name}}
      <!-- 又children的时候就出现小箭头 -->
      <icon v-if="item.children" name="right" class="icon"></icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <li-cascader-items
        :items="rightItems"
        :height="height"
      >
      </li-cascader-items>
    </div>
  </div>
</template>

<script>
import Icon from '../icon.vue'
export default {
  // 如果你在vue里面用到自己name属性相同的标签名
  // 那么这个标签就是自己
  name: 'LiCascaderItems',
  components: { Icon },
  props: {
    items: Array,
    // 接住父组件传给我的height
    height: String
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
@import "var";
.cascder-item {
  display: flex;
  align-items: flex-start;
  // 暂时高度写死
  height: 100px;
  .label {
    padding: .2em .8em;
    display: flex;
    align-items: center;
    .icon {
      margin-left: .2em;
      transform: scale(0.8);
    }
  }
  .left {
    height: 100%;
    padding: .1em 0;
  }
  .right {
    height: 100%;
    border-left: 1px solid $border-color-light;
  }
}
</style>