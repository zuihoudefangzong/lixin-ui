<template>
  <header :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'LiHeader',
  props: {
    height: {
      type: String,
      default: '60px'
    }
  }  
}
</script>