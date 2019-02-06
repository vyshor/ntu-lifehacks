<template>
  <svg class="bus__iconSVG" :class="`icon__${color}`" viewBox="0 0 60 60">
    <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
    <circle cx="12.53" cy="25.35" r="4.16"/>
    <circle cx="34.19" cy="25.35" r="4.16"/>
    <path d="M40.46,0H5.64A5.63,5.63,0,0,0,0,5.64V19.72a5.63,5.63,0,0,0,5.64,
    5.63H6.82a5.72,5.72,0,1,1,11.43,0H28.48a5.72,5.72,0,1,1,11.43,
    0h.55a5.64,5.64,0,0,0,5.64-5.63V5.64A5.64,5.64,0,0,0,40.46,
    0Zm1.92,12.68H39.57a8,8,0,0,1-8-8H40.8a1.58,1.58,0,0,1,1.58,1.58Z"/>
    </g>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    color: String,
  },
};
</script>

<style lang="scss" scoped>
@import '../colors.scss';

.bus__iconSVG {
  width: 50px;
  height: 50px;
  position: absolute;
  left: calc(50% - 17.5px);
  top: calc(50% - 27.5px);
  &.icon__blue { fill: $blue; }
  &.icon__red { fill: $red; }
}
</style>
