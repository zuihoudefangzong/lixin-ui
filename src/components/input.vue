<template>
  <!-- 如果有传error 就有error的css类选择器 -->
  <!-- onchange是input输入鼠标移动后 激活其他dom 才触发 
       同时还要把当前dom(event)传出去-->
  <!-- vue的v-model语法糖 向外抛出自定义input事件和$event.target.value -->
  <div class="wrapper" :class="{'error': error}">
    <input :value="value"
    :disabled="disabled"
    :readonly="readonly"
    type="text"
    @change="$emit('change', $event.target.value)"
    @input="$emit('input', $event.target.value)"
    @focus="$emit('focus', $event.target.value)"
    @blur="$emit('blur', $event.target.value)">
    <!-- 直接加template 不用加div包裹 -->
    <template>
      <icon name="error" v-if="error" class="icon-error"></icon>
      <span v-if="error" class="errorMessage">{{error}}</span>
    </template>
  </div>
</template>

<script>
import Icon from './icon.vue'
export default {
  name: 'liInput',
  props: {
    value: String,
    disabled: {
      type: Boolean,
      default:false
    },
    readonly: {
      type: Boolean,
      default:false
    },
    // error信息
    error: String
  },
  components: { Icon }
}
</script>

<style lang="scss" scoped>
@import "var";
.wrapper {
  font-size: $font-size;
  display: inline-flex;
  align-items: center;
  // 所有子元素都有半个子margin-right 除了最后一个
  >:not(:last-child){ margin-right: .5em;}
  >input {
    height: 32px;
    border: 1px solid $border-color;
    border-radius: 4px;
    padding: 0 8px;
    // 从父元素继承字体尺寸
    font-size: inherit;
    // 鼠标移到 hover
    &:hover {
      border-color: $border-color-hover;
    }
    // 激活的时候
    &:focus{
      outline: none;
      box-shadow: inset 0 1px 3px $box-shadow-color;
    }
    // 当input有disabled状态或者readonly
    // readonly的时候是可以有focus状态html状态
    &[disabled],&[readonly] {
      border-color: #bbb;color: #bbb;cursor: not-allowed;
    }
  }
  &.error {
    >input {
      border-color: $red;
    }
  }
  .icon-error {
    // 图标颜色改变
    fill: $red;
  }
  .errorMessage {
    color: $red;
  }
}
</style>