<template>
    <div id="busMapView">
        <div class="app__container" ref="container">
            <bus-map v-for="(color, idx) in busColors" :key="idx"
                     v-if="active === idx" :color="busColors[active]"
                     :bus_stop_data="bus_stop_data[active]"
                     v-on:pick-stop="setPickStop($event)"
                     :selected="picked_stop_idx"/>
            <bus-detail-card v-for="(color, idx) in busColors" :startDrag="startDrag"
                             :key="color" :offsetX="getTransformOffset(idx)" :scrollY="scrollY"
                             :active="active === idx"
                             :orientation="orientation" :color="color" :dragged="pos"
                             :dragging="dragging"
                             :arrival_data="arrival_data"/>
            <div class="currentLocation" v-if="picked_stop_idx !== -1">
                <img src="../../assets/SVG/pin_map.svg" class="location__pinIcon"/>
                <div class="location__text">{{ currentLocation }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    // import dynamics from 'dynamics.js';

    import BusMap from '@/views/Travel/BusMap';
    import BusDetailCard, {TRESHOLD_SCROLL_Y} from '@/views/Travel/BusDetailCard';

    import locationMethods from '@/mixins/locationMethods';

    const CHANGE_LINE_TRESHOLD = 100;
    const HORIZONTAL = 'horizontal';
    const VERTICAL = 'vertical';
    const ORIENTATION_TRESHOLD = 10;
    const MAGIC_NEXT_BUSES_HEIGHT = 150;

    const GITRAW_BLUE = "https://raw.githubusercontent.com/vyshor/ntu-lifehacks/master/src/views/Travel/new_Blue_Bus_Stop.json";
    const GITRAW_RED = "https://raw.githubusercontent.com/vyshor/ntu-lifehacks/master/src/views/Travel/new_Red_Bus_Stop.json";
    const arrival_url = (code) => {
        return ('https://baseride.com/routes/api/platformbusarrival/' + code + '/?format=json');
    };

    export default {
        components: {
            BusMap,
            BusDetailCard,
        },
        mixins: [locationMethods],
        name: 'BusMapView',
        data() {
            return {
                active: 0,
                busColors: ['blue', 'red'],
                dragging: '',
                start: {x: 0, y: 0},
                pos: {x: 0, y: 0},
                bufferMove: {x: 0, y: 0},
                scrollY: 0,
                screenWidth: 0,
                orientation: HORIZONTAL,
                bus_stop_data: {},
                picked_stop_idx: -1,
                curPos: null,
                arrival_data: [{
                    arriving: 3,
                    vehicle: 'PC231U'

                }]
            };
        },
        computed: {
            getTransformOffset() {
                const padding = 50;
                return idx => (idx - this.active) * (this.screenWidth - padding);
            },
            currentLocation: function () {
                return this.bus_stop_data[this.active][this.picked_stop_idx].title;
            },
        },
        methods: {
            startDrag(e) {
                const evt = e.changedTouches ? e.changedTouches[0] : e;
                this.dragging = true;
                this.start.x = evt.pageX - this.bufferMove.x;
                this.start.y = evt.pageY - this.bufferMove.y;
                window.addEventListener('mousemove', this.onDrag);
                window.addEventListener('mouseup', this.onRelease);
                window.addEventListener('touchmove', this.onDrag);
                window.addEventListener('touchend', this.onRelease);
            },
            onDrag(e) {
                e.stopPropagation();
                if (this.dragging) {
                    const evt = e.changedTouches ? e.changedTouches[0] : e;
                    this.bufferMove.x = evt.pageX - this.start.x;
                    this.bufferMove.y = evt.pageY - this.start.y;
                    if (!this.orientation && Math.abs(this.bufferMove.y) > ORIENTATION_TRESHOLD) {
                        this.orientation = VERTICAL;
                    } else if (!this.orientation && Math.abs(this.bufferMove.x) > ORIENTATION_TRESHOLD) {
                        this.orientation = HORIZONTAL;
                    }
                    if (this.orientation === HORIZONTAL) this.pos.x = this.bufferMove.x;
                    else if (this.orientation === VERTICAL
                        && (this.scrollY + this.pos.y > TRESHOLD_SCROLL_Y - MAGIC_NEXT_BUSES_HEIGHT
                            || this.bufferMove.y - this.pos.y > 0)) {
                        this.pos.y = this.bufferMove.y;
                    }
                }
            },
            onRelease() {
                if (this.dragging) {
                    this.dragging = false;
                    if (this.orientation === HORIZONTAL) {
                        if (Math.abs(this.bufferMove.x) > CHANGE_LINE_TRESHOLD) {
                            if (this.bufferMove.x > 0) this.prevLine();
                            else this.nextLine();
                        }
                        this.pos.x = 0;
                    } else if (this.orientation === VERTICAL) {
                        if (this.pos.y > TRESHOLD_SCROLL_Y && this.scrollY >= 0) {
                            this.scrollY = 0;
                        } else {
                            this.scrollY = Math.max(
                                Math.min(this.scrollY + this.pos.y, 0),
                                TRESHOLD_SCROLL_Y - MAGIC_NEXT_BUSES_HEIGHT,
                            );
                        }
                        this.pos.y = 0;
                    }
                    this.clearBufferMove();
                    this.orientation = '';
                }
            },
            clearBufferMove() {
                this.bufferMove.x = 0;
                this.bufferMove.y = 0;
            },
            prevLine() {
                this.active = Math.max(this.active - 1, 0);
                this.scrollY = 0;
            },
            nextLine() {
                this.active = Math.min(this.active + 1, this.busColors.length - 1);
                this.picked_stop_idx = -1;
                this.scrollY = 0;
            },
            getBusStopData() {
                let self = this;
                $.ajax(GITRAW_BLUE, {
                    async: true, success: function (res) {
                        // console.log(res);
                        self.bus_stop_data[0] = JSON.parse(res);
                        self.loadCurPos();

                    }
                });
                $.ajax(GITRAW_RED, {
                    async: true, success: function (res) {
                        // console.log(res);
                        self.bus_stop_data[1] = JSON.parse(res);

                    }
                });
            },
            setPickStop(idx) {
                this.picked_stop_idx = idx;
                this.getBusArrivalTiming(this.bus_stop_data[this.active][this.picked_stop_idx].code);
            },
            loadCurPos() {
                let self = this;
                this.getCurrentPosWithCallback(function (pos) {
                    self.curPos = pos;
                    let min_dist = 99999;
                    let min_idx = -1;
                    let i = 0;
                    for (let data of self.bus_stop_data[self.active]) {
                        let dist = self.distance(pos.lat, pos.lng, data.lat, data.lng);
                        if (dist < min_dist) {
                            min_idx = i;
                            min_dist = dist;
                        }
                        i++;
                    }
                    self.picked_stop_idx = min_idx;
                });
            },
            getBusArrivalTiming(code) {
                let self = this;
                $.ajax(arrival_url(code), {
                    async: true, success: function (res) {
                        if (res.forecast.length > 0) {
                            self.arrival_data = self.arrival_data.splice();
                            for (let forecast of res.forecast) {
                                self.arrival_data.push({
                                    arriving: Math.trunc(forecast.forecast_seconds / 60),
                                    vehicle: forecast.vehicle.split(/\s+/).slice(1, 4).join('')
                                })
                            }
                            console.log(self.arrival_data);
                        }
                    }
                });
            }
        },
        mounted() {
            this.$nextTick(() => {
                const container = this.$refs.container;
                this.screenWidth = container.getBoundingClientRect().width;
            });
            window.addEventListener('wheel', e => e.preventDefault());
            this.getBusStopData();
        },
    }
</script>

<style lang="scss">
    @import '../colors.scss';

    body {
        margin: 0;
        background-color: #FAFAFD;
        user-select: none;
    }

    #busMapView {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: calc(100vh - 112px);
    }

    .app__container {
        position: relative;
        background: rgb(214, 214, 214);
        width: 100%;
        height: 100%;
        box-shadow: 0 12px 50px -20px rgba(0, 0, 0, .4);
        border-radius: 5px;
        overflow: hidden;
    }

    .currentLocation {
        position: absolute;
        top: 10px;
        left: calc(15% - 10px);
        width: calc(70% + 20px);
        height: 50px;
        background: white;
        box-shadow: 0 10px 30px -5px rgba(0, 0, 0, .3);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .location__pinIcon {
            width: 12px;
            margin-left: 20px;
        }

        .location__text {
            flex-grow: 1;
            text-align: center;
        }
    }
    .info {
        background-color: rgba(0, 0, 0, 0) !important;
    }
</style>
