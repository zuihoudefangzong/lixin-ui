<template>
  <aside :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
export default {
  name: 'LiAside',
  props: {
      width: {
        type: String,
        default: '300px'
      }
    }
}
</script>