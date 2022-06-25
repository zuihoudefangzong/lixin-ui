<template>
  <div
    class="li-nav"
    :class="{'vertical':vertical}"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LiNav',
  props: {
    selected: {
      // type: Array,
      // default: ()=> []
      type: String
    },
    // 是否多选 只支持单选
    // multiper: {
    //   type: Boolean,
    //   default: false
    // }
    // default vertical竖立纵向的
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 存储所有LiNavItem实例
      items: [],
      // 受cascader级联选择器启发 级联选择
      namePath: []
    }
  },
  methods: {
    // updatechildren的selected状态
    updateChlidren () {
      this.items.forEach(vm => {
        if(this.selected.indexOf(vm.name)>=0){
          vm.selected = true
        }else {
          vm.selected = false
        }
      })
    },
    // 监听或者订阅children的add:selected行为
    listenToChildren () {
      this.items.forEach(vm => {
        vm.$on('update:selected', (name)=>{
          // if(this.multiper)// 导航栏多选
          // if(this.selected.indexOf(name) < 0 ){
          //   // 没有在的时候push 有就不管了
          //   this.selected.push(name)
          // }
          // let copy = JSON.parse(JSON.stringify(this.selected))
          // console.log(copy)
          this.$emit('update:selected',name)
        })
      })
    },
    // 强耦合的函数 主要给children子vm LiNavItem用
    addItem (vm){
      this.items.push(vm)
    }
  },
  // computed: {
  //   items () {
  //     return this.$children.filter(vm => vm.$options.name = 'LiNavItem')
  //   }
  // },
  mounted () {
    this.updateChlidren()
    this.listenToChildren()
  },
  updated () {
    this.updateChlidren()
  },
  // 提供provide
  provide () {
   return {
     root: this,
     vertical:this.vertical
   }
  }
}
</script>

<style lang="scss" scoped>
@import '~../../styles/_var.scss';
.li-nav {
  display: flex;
  border: 1px solid $grey;
  cursor: default;
  user-select: none;// 不允许用户复制选中
  &.vertical{
    flex-direction: column;
    border:1px solid $grey;
  }
}
</style>