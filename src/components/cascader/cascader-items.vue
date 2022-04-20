<template>
  <div class="cascder-item">
    {{optionItem.name}}
    <li-cascader-items
      v-if="optionItem"
      v-for="item in optionItem.children"
      :key="item.name"
      :optionItem="item"
    ></li-cascader-items>
  </div>
</template>

<script>
export default {
  // 如果你在vue里面用到自己name属性相同的标签名
  // 那么这个标签就是自己
  name: 'LiCascaderItems',
  props: {
    optionItem: Object
  }
}
</script>

<style lang="scss" scoped>
.cascder-item {
  border: 1px solid red;
  margin:  10px;
}
</style>