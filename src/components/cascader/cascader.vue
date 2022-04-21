<template>
  <div class="cascader">
    <!-- trigger触发层 -->
    <div class="trigger" @click="popoverVisible = ! popoverVisible">
    </div>
    <div class="popover" v-if="popoverVisible">
      <li-cascader-items :items="options"></li-cascader-items>
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
  computed: {
  }
}
</script>

<style lang="scss" scoped>
@import "var";
.cascader {
  .trigger {
    border: 1px solid red;
    height: 32px;
    width: 100px;
  }
  .popover {
    border: 1px solid red;
    display: flex;
    .label {
      // 文字不换行
      white-space: nowrap;
    }
  }
}
</style>