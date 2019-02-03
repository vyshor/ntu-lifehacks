<template>
  <div class="resp-container">
    <iframe class="resp-iframe" src="https://plan.kenrick95.org/" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: "courseplanner"
};
</script>

<style scoped>
.resp-container {
  position: relative;
  overflow: hidden;
  padding-top: 177.78%;
}

.resp-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>