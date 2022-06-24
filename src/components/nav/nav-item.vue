<template>
  <div
    class="li-nav-item"
    :class="{'selected':selected}"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LiNavItem',
  props: {
    name: String,
    required: true
  },
  data () {
    return {
      selected: false
    }
  },
  methods: {
    onClick () {
      this.$emit('add:selected',this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.li-nav-item {
  padding: 10px 20px;
  &.selected {
    background: green;
  }
}
</style>