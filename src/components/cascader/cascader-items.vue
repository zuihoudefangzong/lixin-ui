<template>
  <div class="cascder-item" :style="{height: height}">
    <div class="left">
      <div>
      {{selected && selected[level] && selected[level].cityName }}
      {{selected && selected[level] && selected[level].cityCode }}
      </div>
      <div class="label"
        v-for="item in items"
        :key="item.cityName"
        @click="onclickLabel(item)"
      >
      {{item.cityName}}
      <!-- 又children的时候就出现小箭头 -->
      <icon v-if="item.children" name="right" class="icon"></icon>
      </div>
      
    </div>
    <div class="right" v-if="rightItems">
      <!-- 如果我的子元素也更新 我帮她继续向上传达 -->
      <li-cascader-items
        :items="rightItems"
        :height="height"
        :level="level + 1"
        :selected="selected"
        @update:selected="onUpdateSelected"
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
    height: String,
    // 用户选中的内容
    selected: {
      type: Array,
      default: ()=> { return []}
    },
    // 当前层级
    level: {
      type: Number,
      default: 0
    },
    loadData: {
        type: Function
    },
  },
  computed: {
    // 判断右边是否要渲染
    rightItems() {
      let currentSelected = this.selected[this.level]
      if( currentSelected  && currentSelected.children) {
        return currentSelected.children
      }
      else {
        return null
      }
    }
  },
  methods: {
    // 更新当前点击的选项
    onclickLabel(item) {
      // Vue深入响应式原理
      // this.$set(this.selected, this.level,item)
      // 同时不能直接props里面的值 深拷贝
      let copy = JSON.parse(JSON.stringify(this.selected))
      // 单向数据流简化问题了
      // 更新完当前点击的数据
      copy[this.level] = item
      // 单向数据流又再次简化问题了
      // 然后删除当前后面的所有内容
      copy.splice(this.level + 1)
      this.$emit('update:selected', copy)
    },
    // 如果我的子元素也更新 我帮她继续向上传达
    onUpdateSelected(newSelected) {
      this.$emit('update:selected', newSelected)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "var";
.cascder-item {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
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
    overflow: auto;
  }
  .right {
    height: 100%;
    border-left: 1px solid $border-color-light;
  }
}
</style>