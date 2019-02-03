<template>
    <div class="resp-container" style="height:100%">
        <iframe class="resp-iframe" src="https://baseride.com/maps/public/ntu/" frameborder="0" scrolling="no"></iframe>
    </div>
</template>

<script>
    export default {
        name: "busmap"
    };
</script>

<style scoped>
    .resp-container {
        position: relative;
        overflow: hidden;
        padding-top: 10%;
    }

    .resp-iframe {
        position: absolute;
        top: -60px;
        left: 7%;
        width: 86%;
        height: 180%;
        border: 0;
    }
</style>