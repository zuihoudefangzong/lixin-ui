<template>
  <div class="cascader">
    <!-- trigger触发层 -->
    <div class="trigger"
      @click="popoverVisible = ! popoverVisible"
    >{{result || '&nbsp;'}}
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
    },
    // 使用者传的函数 组件帮你调用
    // 可传可不传
    loadData: {
      type: Function
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
      console.log('点击了一层的左边')
      this.$emit('update:selected', newSelected)
      // 下面代码开始search功能的
      // options里面没有children 需要ajax请求
      // 所以使用者还会传1个函数 更新options
      // 保存一下最后一级被点击的选项
      let lastItem = newSelected[newSelected.length-1]
      console.log(lastItem)

      // 更新update最顶级options函数Functions
      let updateOptions = (result) => {
        console.log(result)
        let toUpdate =  this.options.filter( item => {
          return item.cityCode === lastItem.cityCode
        })[0]
        this.$set(toUpdate, 'children', result[0].children)
      }

      // 用户传了回调 更新最顶级options的函数传个用户
      if(this.loadData){
        console.log('调用户的函数')
        // 回调:把别人传给我的函数调用一下
        // 调回调的时候传一个函数updateOptions,这个函数理论应该被调用
        this.loadData(lastItem, updateOptions)
      }
    },
  },
  computed: {
    result(){
      // 计算每一项的name
      return this.selected.map( item => item.cityName).join(' / ')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "var";
.cascader {
  position: relative;
  .trigger {
    border: 1px solid red;
    height: $input-height;
    display: inline-flex;
    align-items: center;
    padding: 0 .5em;
    min-width: 10em;
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