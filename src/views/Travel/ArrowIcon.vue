<template>
  <svg class="arrow__container">
    <path d="M2.5,2.5 L10,10 L17.5,2.5" class="arrow__bottom"/>
  </svg>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.arrow__container {
  width: 20px;
  height: 22.5px;
  .arrow__bottom {
    fill: rgba(0,0,0,0);
    stroke: #232222;
    stroke-width: 2.5px;
    stroke-linecap: round;
    animation: arrow 2s infinite ease-out;
  }
}

@keyframes arrow {
  0% {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>

