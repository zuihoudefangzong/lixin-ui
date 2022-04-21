<template>
  <div class="cascader">
    <!-- trigger触发层 -->
    <div class="trigger" @click="popoverVisible = ! popoverVisible">
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <li-cascader-items :items="options" :height="popoverHeight"></li-cascader-items>
    </div>
  </div>
</template>

<script>
import LiCascaderItems from './cascader-items.vue'
export default {
  name: 'LiCascader',
  props: {
    // 数据源
    options: {
      type: Array,
      require: true
    },
    // 使用指定弹出层的height 例子200px
    // 为了传个li-cascader-items
    popoverHeight: String
  },
  data(){
    return {
      // popover是否可见
      popoverVisible: false,
      // 用户选择的省
      level1Selected: null,
      level2Selected: null
    }
  },
  components: { LiCascaderItems },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
@import "var";
.cascader {
  position: relative;
  .trigger {
    border: 1px solid red;
    height: 32px;
    width: 100px;
  }
  .popover-wrapper {
    display: flex;
    position: absolute;
    // top100% 距离父元素高度100%
    // 父元素高度本质是靠div.trigger撑开
    top: 100%;
    left: 0;
    background: #fff;
    // extend继承了scss里面
    @extend .box-shadow;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    .label {
      // 文字不换行
      white-space: nowrap;
    }
  }
}
</style>