<template>
  <transition>
    <div class="toast">
        <slot></slot>
    </div>   
  </transition>
</template>

<script>
export default {
  name: 'LiToast'
}
</script>

<style lang="scss" scoped>
$font-size: 14px;
$toast-min-height: 40px;
$toast-bg: rgba(0, 0, 0, 0.75);
.toast {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: $font-size;
  line-height: 1.8;
  height: $toast-min-height;
  background: $toast-bg;
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.50);
  color: white;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-radius: 4px;
}
</style>