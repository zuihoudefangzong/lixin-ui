<template>
  <div class="cascader">
    <!-- trigger触发层 -->
    <div class="trigger" @click="popoverVisible = ! popoverVisible">
    </div>
    <div class="popover" v-if="popoverVisible">
      <div class="level1">
        <div class="label"
          v-for="optionItem in options"
          :key="optionItem.name"
          @click="level1Selected = optionItem"
        >
          {{optionItem.name}}
       </div>
      </div>
      <div class="level2">
        <div class="label"
          v-for="item in level2Items"
          :key="item.name"
          @click="level2Selected = item"
        >
          {{item.name}}
       </div>
      </div>
      <div class="level3">
        <div class="label"
          v-for="subItem in level3Items"
          :key="subItem.name"
        >
          {{subItem.name}}
       </div>
      </div>
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
    level2Items() {
      return this.level1Selected ? this.level1Selected.children : []
    },
    level3Items() {
      console.log('计算了level3')
      return this.level2Selected ? this.level2Selected.children : []
    }
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