<template>
  <div class="li-nav">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LiNav',
  props: {
    selected: {
      type: Array,
      default: ()=> []
    },
    // 是否多选
    multiper: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items () {
      return this.$children.filter(vm => vm.$options.name = 'LiNavItem')
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
        vm.$on('add:selected', (name)=>{
          if(this.multiper){// 导航栏多选
            if(this.selected.indexOf(name) < 0 ){
              // 没有在的时候push 有就不管了
              this.selected.push(name)
            }
            let copy = JSON.parse(JSON.stringify(this.selected))
            console.log(copy)
            this.$emit('update:selected',copy)
          }else {// 导航栏单选
            this.$emit('update:selected',[name])
          }
        })
      })
    }
  },
  mounted () {
    this.updateChlidren()
    this.listenToChildren()
  },
  updated () {
    this.updateChlidren()
  }
}
</script>

<style lang="scss" scoped>
.li-nav {
  display: flex;
  border: 1px solid red;
}
</style>