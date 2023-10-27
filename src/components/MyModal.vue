<template>
  <div class="modal">
    <slot></slot>
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modal .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.6;
  z-index: 0;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>
;
