<template>
    <div class="container">
        <div class="icon red" v-html="alert"></div>
        <div class="icon" v-html="x"></div>
        <div class="icon" v-html="archive"></div>
        <div class="icon" v-html="arrowUp"></div>
        <div class="icon" v-html="arrowDown"></div>
        <div class="icon" v-html="arrowLeft"></div>
        <div class="icon" v-html="arrowRight"></div>
    </div>
</template>

<script>
    const Octicons = require("octicons");

    export default {
        name: "main",
        data() {
            return {
                alert: "",
                x: "",
                archive: "",
                arrowUp: "",
                arrowDown: "",
                arrowLeft: "",
                arrowRight: "",
            }
        },
        mounted() {
            this.alert = Octicons.alert.toSVG({height: 30});
            this.x = Octicons.x.toSVG();
            this.archive = Octicons.archive.toSVG();
            this.arrowUp = Octicons["arrow-up"].toSVG();
            this.arrowDown = Octicons["arrow-down"].toSVG();
            this.arrowLeft = Octicons["arrow-left"].toSVG();
            this.arrowRight = Octicons["arrow-right"].toSVG();
            console.log(Octicons);
        }
    }
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
        padding: 50px;
    }

    .icon {
        display: inline-block;
    }

    .red {
        color: red;
    }

    svg {
        fill: currentColor;
    }
</style>