<template>
  <div class="cascader">
    <!-- trigger触发层 -->
    <div class="trigger" @click="popoverVisible = ! popoverVisible">
    </div>
    <div class="popover" v-if="popoverVisible">
      <div v-for="item in options" :key="item.name">
        <div>{{item.name}}</div>
      </div>
      <!-- <div v-for="item in options" :key="item.name">
        <li-cascader-items :optionItem="item"></li-cascader-items>
      </div> -->
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
      popoverVisible: false
    }
  },
  components: { LiCascaderItems },
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
    height: 200px;
    width: 80px;
  }
}
</style>