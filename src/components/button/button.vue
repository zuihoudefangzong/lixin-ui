<template>
  <button @click="$emit('click')" class="g-button" :class="{ [`icon-${iconPosition}`]: true }">
    <!-- 第1个icon和第2个icon不会同时出现 -->
    <g-icon v-if="icon && !loading" :name="icon" class="icon"></g-icon>
    <g-icon v-if="loading" name="loading" class="loading icon"></g-icon>
    <div class="centent">
      <!-- 插槽随用户传 slot插槽不能给class属性 -->
      <slot></slot>
    </div>
  </button>
</template>

<script>
import Icon from '../icon.vue'
export default {
  // props: ['icon', 'iconPosition'],
  props: {
    icon: {},
    iconPosition: {
      type: String,
      default: 'left',
      // 组件间传参会自动调用自定义验证函数validator
      validator(value){
        // 需要return false或true 都要有
        // console.log('自动调用自定义验证函数validator,'+value)
        // 只要值为left或者为right 就返回true 其他为faluse
        return value === 'left' || value === 'right'
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: { 'g-icon': Icon }
};
</script>

<style lang="scss" scoped>
@import 'var';
@keyframes spin {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
.g-button {
  // :root伪类选择器配合var()函数
  height: $button-height;
  // 左右留了1个
  padding: 0 .5em;
  font: inherit;
  border-radius: $border-radius;
  border: 1px solid $border-color;
  background: $button-bg;
  // inline-block转flex
  display: inline-flex;
  justify-content: center;
  align-items: center;
  // 按钮之间不对齐？inline引起
  vertical-align: middle;
  &:hover {
    border-color: $border-color-hover;
  }
  &:active {
    background: $button-active-bg;
  }
  // &:focus { outline: none; }
  >.centent { order: 2;}
  >.icon { order: 1; margin-right: .3em;}
  // 用order控制iocn和centent左右
  &.icon-right {
    >.centent { order: 1;}
    >.icon { order: 2;margin-right: 0;margin-left: .3em;}
  }
  // 2s走完100%  循环转动infinite linear线性运动
  >.loading { animation: spin 2s infinite linear;}
}
</style>