<template>
  <footer :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script>
export default {
  name: 'LiFoot',
  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>