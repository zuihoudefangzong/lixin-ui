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
        :loadData="loadData"
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
      loadingItem: {},
    }
  },
  components: { LiCascaderItems },
  methods: {
    // 如果我的子元素也更新 我帮她继续向上传达
    onUpdateSelected(newSelected) {
      // 向最顶级selected传递用户选中的内容
      this.$emit('update:selected', newSelected)
      // 下面代码开始search功能的
      // options里面没有children 需要ajax请求
      // 所以使用者还会传1个函数 更新options
      // 保存一下最后一级被点击的选项
      let lastItem = newSelected[newSelected.length-1]

      // 定义函数simplest功能就是给我1个数组 返回数组元素里面.cityCode
      // cityCode必须是唯一的
      let simplest = (array,cityCode) => {
        return array.filter(item => item.cityCode === cityCode)[0]
      }

      // 找到最简单的情况 数组每一项元素里面都没有children数组了
      // cityCode必须是唯一的
      let complex = (array, cityCode, childrenArray) => {
        // 找到最简单的情况 数组每1项元素里面都没有children数组
        // let noChildren = []
        // 数组每一项元素里面还有children数组了
        let hasChildren = []
        array.forEach( item => {
          if (item.children) {
            hasChildren.push(item)
          }
          // else {
          //   noChildren.push(item)
          // }
        })

        // 先从最简单的情况 数组的最表明一层找
        let found = simplest(array, cityCode)
        console.log(found)

        // 现在从最简单的情况里面找到了
        if(found) { return found }
        else {
          // 最简单没有找到就开始从haschilren里面
          // found = simplest(hasChildren, id)
          // haschildren最表明一层找到了?
          // if (found) {return found}
          // 最表明一层没找到 就遍历hasChildren.children
          for(let i=0; i< hasChildren.length; i++) {
            // 递归自身
            found =  complex(hasChildren[i].children, cityCode)
            if(found) { return found }
          }
          // 递归完 依然没找 cityCode不存在
          return undefined
        }
        
      }

      // 更新update最顶级options函数Functions
      let updateOptions = (result) => {
        // 违法单向数据流 不能直接改props里面的值
        let copy = JSON.parse(JSON.stringify(this.options))
        // 找到要挂children属性的元素 拿到当前对象的内存地址
        let toUpdate = complex(copy, lastItem.cityCode)
        // 拿到当前对象的内存地址 挂children
        toUpdate.children = result
        // 向最顶级selected传递 更改options数据源
        this.$emit('update:options', copy)
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