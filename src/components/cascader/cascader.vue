<template>
  <div class="cascader">
    <!-- trigger触发层 -->
    <div class="trigger" @click="popoverVisible = ! popoverVisible">
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <!-- 监听子组件update:selected事件 -->
      <li-cascader-items
        :items="options"
        :height="popoverHeight"
        :selected="selected"
        @update:selected="onUpdateSelected"
      ></li-cascader-items>
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
    // 使用者指定弹出层的height 例子200px
    // 为了传个li-cascader-items
    popoverHeight: String,
    // 用户选中的内容可不传 
    // cascader组件自身维护
    selected: {
      type: Array,
      // 当默认值是引用数据类型
      // 要写成函数 同时带来1个面试题
      // data为什么必须是函数(sticky组件有讲)
      default: ()=> { return []}
    }
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
  methods: {
    // 如果我的子元素也更新 我帮她继续向上传达
    onUpdateSelected(newSelected) {
      this.$emit('update:selected', newSelected)
    },
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