<template>
  <div class="row">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.row {
  display: flex;
  // flex是占完width100% default不换行
}
</style>