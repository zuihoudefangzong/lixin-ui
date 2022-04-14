<template>
  <div class="col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
let validator = (obj)=> {
  let status = true
        // 先取出所有key
        let keys = Object.keys(obj)
        keys.forEach(
          key => {
            // 判断是否span和offset的key
            if(['span', 'offset'].includes(key) === false){
              // 不存在则 没有span和offset的key
              status = false
            }
          }
        )
        return status
}
export default {
  name: 'LiCol',
  props: {
    // span栅格占据的列数
    span: {
      // span可以传string或者Number
      // :span使用者老是忘记加:
      type: [Number, String],
      // 不传默认当前col占父元素width100%
    },
    // offset分栏偏移 栅格左侧的间隔格数
    // 就是左侧给margin 
    offset: {
      type: [Number, String],
    },
    // 响应式小屏 中屏 大屏 超大屏
    sm: { type: Object, validator },
    md: { type: Object, validator },
    lg: { type: Object, validator },
    xl: { type: Object, validator },
  },
  data() {
    return {
      gutter: 0,
    }
  },
  methods: {
    // 拼接class名
    createClasses(obj, str = '') {
      if(!obj) return []
      let array = []
      if(str){
        if(obj.span) { array.push(`col-${str}-${obj.span}`)}
        if(obj.offset) { array.push(`offset-${str}-${obj.offset}`)}
      }else {
        if(obj.span) { array.push(`col-${obj.span}`)}
        if(obj.offset) { array.push(`offset-${obj.offset}`)}
      }
      return array
    }
  },
  // 如果需要gutter变了 colStyle也跟着变那么需要重新计算
  computed: {
      colClass(){
        let { span, offset, sm, md, lg, xl , createClasses} = this
        return [
          // 函数调用完的到返回值在解构出来
          ...createClasses({span, offset}),
          ...createClasses(sm, 'sm'),
          ...createClasses(md, 'md'),
          ...createClasses(lg, 'lg'),
          ...createClasses(xl, 'xl')
        ]
      },
      colStyle() {
        let { gutter } = this
        if(gutter){
          return {
            paddingRight: gutter / 2 + 'px',
            paddingLeft: gutter / 2 + 'px'
          }
        }
      }
  }
}
</script>

<style lang="scss" scoped>
.col {
  // scss循环生成样式
  // 前缀col-拼接循环的n
  // n从1开始 (包含)24结束
  // 超小屏xs默认样式不用添加xs前缀
  // 同时也是不使用用响应式时候的PC电脑默认样式
  $class-prefix:col-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      width: ($n / 24) * 100%;
    }
  }
  $class-prefix:offset-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      margin-left: ($n / 24) * 100%;
    }
  }
  // 同时是移动端优先 小屏md开始 至少有576px才走这里
  @media (min-width: 576px) {
    $class-prefix:col-sm-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix:offset-sm-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
  // 中屏md开始 至少有768px才走这里
  @media (min-width: 768px) {
    $class-prefix:col-md-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix:offset-md-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
  // 大屏lg开始 至少有992px才走这里
  @media (min-width: 992px) {
    $class-prefix:col-lg-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix:offset-lg-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
  // 超大屏xl开始 至少有1200px才走到这里css
  @media (min-width: 1200px) {
    $class-prefix:col-xl-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix:offset-xl-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
}
</style>