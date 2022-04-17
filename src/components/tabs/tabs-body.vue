<template>
  <div class="tabs-body">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:  'LiTabsBody',
  inject: ['eventBus'],
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-body {
  
}
</style>