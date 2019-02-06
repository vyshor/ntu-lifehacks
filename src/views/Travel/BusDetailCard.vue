<template>
<div>
  <transition name="fade">
    <div class="busCard__container" :style="cardStyle" :class="{ dragging }"
      @mousedown="startDrag" @touchstart="startDrag" ref="card" v-if="showMainCard">
      <div class="bus__icon" :style="busIconStyle">
        <svg class="crowdLevel">
          <circle class="level__bar" cx="50" cy="50" r="45"/>
          <circle class="level__value" cx="50" cy="50" r="45" :style="circleStyle" :class="color"/>
        </svg>
        <div class="level__text">{{ displayLevel }}%</div>
        <bus-icon :color="color"/>
      </div>
      <div class="bus__details">
        <div class="nextBus__label">Next Bus</div>
        <div class="infos">
          <div class="info time">
            <div class="label">Arriving in</div>
            <div class="value">
              <span class="number">{{ arrivalTime }}</span>
              <span class="scale">min</span>
            </div>
          </div>
          <div class="info location">
            <div class="label">Vehicle No.</div>
            <div class="value">{{ vehicleNo }}</div>
          </div>
        </div>
        <!--<div class="infos">-->
          <!--<div class="info recommendation">-->
            <!--<div class="label">Recommendation</div>-->
            <!--<div class="value">{{ recommendation }}</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
  </transition>
  <arrow-icon class="arrow__icon" :style="arrowStyle"/>
  <div class="list__nextBuses" :style="cardStyle" v-if="active"
    :class="{ fade: showMainCard, dragging }"
    @mousedown="startDrag" @touchstart="startDrag">
    <div v-for="(arrival, idx) in arrival_data" :key="idx" :class="{ recommended: idx === recommended }"
      :style="getNextBusStyle(idx)" class="bus__item">
      <div class="bus__icon">
        <div class="level__bar" :class="color"
          :style="getLevelBarStyle(idx)"/>
        <!--<div class="crowdLevel">{{ bus.level }}</div>-->
        <div class="crowdLevel">75</div>
      </div>
      <div class="infos" :class="{ hidden: showMainCard }">
        <div class="info time">
          <div class="label">Arriving in</div>
          <div class="value" v-if="arrival.arriving > 0">
            <span class="number">{{ arrival.arriving }}</span>
            <span class="scale">min</span>
          </div>
          <div class="value" v-else-if="arrival.arriving === 0">
            <span class="number">Arr</span>
          </div>

        </div>
        <div class="info location">
          <div class="label">Vehicle No.</div>
          <div class="value">{{ arrival.vehicle }}</div>
        </div>
      </div>
      <!--<div class="recommended__container" v-if="idx === recommended">-->
        <!--<div class="recommended__text">recommended</div>-->
        <!--<img class="starIcon" src="../../assets/SVG/recommended.svg"/>-->
      <!--</div>-->
    </div>
  </div>
</div>
</template>

<script>
import BusIcon from './BusIcon';
import ArrowIcon from './ArrowIcon';

const MAX_DASH_ARRAY = 280;
const MOUNTED_TIMEOUT_ANIMATE = 200;
const INTERVAL = 15;
const DAMP_ICON_X = 10;

export const TRESHOLD_SCROLL_Y = -100;

const mockedCrowdLevel = 75;
const mockedArrivalTIme = 3;
const locations = {
  INNOVATION_CENTRE: 'Innovation Centre',
};

// const colors = {
//   $blue: 'rgb(0,122,255)',
//   $pink: 'rgb(255,45,85)',
//   $red: 'rgb(255,59,48)',
//   $purple: 'rgb(88,86,214)',
//   $orange: 'rgb(255,149,0)',
// };

export default {
  props: {
    color: String,
    dragged: Object,
    startDrag: Function,
    dragging: Boolean,
    offsetX: Number,
    scrollY: Number,
    active: Boolean,
    arrival_data: Array,
  },
  components: {
    BusIcon,
    ArrowIcon,
  },
  data() {
    return {
      crowdLevel: 0,
      displayLevel: 0,
      recommended: 1,
      buses: [
        { time: mockedArrivalTIme, level: mockedCrowdLevel, lastStop: '-' },
        { time: 5, level: 20, lastStop: '-' },
        { time: 15, level: 45, lastStop: locations.INNOVATION_CENTRE },
      ],
    };
  },
  watch: {
    active(val) {
      if (!val) {
        this.crowdLevel = 0;
        this.displayLevel = 0;
      } else this.setCrowdLevel();
    },
  },
  computed: {
    arrivalTime() {
      return this.arrival_data[0].arriving;
    },
    vehicleNo() {
      return this.arrival_data[0].vehicle;
    },
    circleStyle() {
      const length = (this.crowdLevel / 100) * MAX_DASH_ARRAY;
      return {
        'stroke-dasharray': `${length} 1000`,
      };
    },
    cardStyle() {
      return {
        transform: `
          translateX(${this.dragged.x + this.offsetX}px)
          translateY(${this.dragged.y + this.scrollY}px)
        `,
      };
    },
    arrowStyle() {
      const scrolled = this.dragged.y + this.scrollY;
      return {
        ...this.cardStyle,
        opacity: 1 - (scrolled / TRESHOLD_SCROLL_Y),
      };
    },
    busIconStyle() {
      return {
        'margin-left': `${(this.dragged.x + this.offsetX) / DAMP_ICON_X}px`,
      };
    },
    showMainCard() {
      //return this.dragged.y + this.scrollY > TRESHOLD_SCROLL_Y;
      return false;
    },
    getNextBusStyle() {
      return idx => ({
        transform: `translateY(${this.showMainCard ? idx * 100 : 0}px)`,
        'transition-delay': `${idx * 50}ms`,
        opacity: this.showMainCard ? 1 / (idx + 2) : 1,
      });
    },
    getLevelBarStyle() {
      return idx => ({
        height: `${this.showMainCard ? 0 : this.buses[idx].level}%`,
        'transition-delay': `${(idx * 50) + 250}ms`,
      });
    },
  },
  methods: {
    setCrowdLevel() {
      this.crowdLevel = mockedCrowdLevel;
      const itv = setInterval(() => {
        this.displayLevel += 1;
        if (this.displayLevel >= mockedCrowdLevel) clearInterval(itv);
      }, INTERVAL);
    },
  },
  mounted() {
    console.log(this.arrival_data);
    setTimeout(() => {
      if (this.active) this.setCrowdLevel();
    }, MOUNTED_TIMEOUT_ANIMATE);
  },
};
</script>

<style lang="scss" scoped>
@import '../colors.scss';

.busCard__container {
  display: flex;
  user-select: none;
  position: absolute;
  z-index: 100;
  width: calc(80% + 10px);
  height: 150px;
  left: calc(10% - 7.5px);
  bottom: 32px;
  box-shadow: 0 20px 40px -15px rgba(0,0,0,.3);
  background: white;
  cursor: grab;
  &:not(.dragging) {
    transition: transform .1s ease-out;
  }
  .bus__icon {
    flex-grow: 1;
    box-sizing: border-box;
    width: 140px;
    height: calc(100% + 5px);
    padding: 15px 5px 0 5px;
    transform: scale(1.1);
    box-shadow: 0 5px 30px -5px rgba(0,0,0,.3);
    margin-right: 10px;
    background: #232222;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .crowdLevel {
      width: 100px;
      height: 100px;
      .level__bar {
        fill: rgba(0,0,0,0);
        stroke: #444;
        stroke-width: 5px;
      }
      .level__value {
        transition: stroke-dasharray 1s ease;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        fill: rgba(0,0,0,0);
        stroke-width: 5px;
        &.blue { stroke: $blue; }
        &.red { stroke: $red; }
      }
    }
    .level__text {
      color: white;
      margin: 15px;
    }
  }
  .bus__details {
    box-sizing: border-box;
    padding: 15px;
    flex-grow: 2;
    text-align: left;
    .nextBus__label {
      font-size: 18px;
    }
    .infos {
      display: flex;
      width: 100%;
      padding-top: 8px;
      .info {
        width: 50%;
        font-size: 15px;
        margin-right: 5px;
        .label {
          font-size: .9em;
          opacity: .5;
        }
        .value { margin-top: 2.5px; }
        &.time {
          padding-right: 5px;
          .value .number { font-size: 2.1em; }
          .value .scale { font-size: 1.1em; }
        }
        &.recommendation {
          width: 100%;
          .label { font-size: .8em; }
          .value { font-size: .8em; }
        }
        @media screen and (max-width: 380px) {
          font-size: 13px;
        }
      }
    }
  }
}

.list__nextBuses {
  box-sizing: border-box;
  padding: 5px 10px;
  position: absolute;
  width: calc(100% - 30px);
  max-height: 300px;
  left: 15px;
  top: calc(100% - 92.5px);
  z-index: 100;
  cursor: grab;
  .bus__item {
    box-sizing: border-box;
    padding-right: 15px;
    height: 80px;
    margin-bottom: 12px;
    border-radius: 2px;
    box-shadow: 0 5px 30px -5px rgba(0,0,0,.2);
    background: white;
    transition: transform .3s ease, opacity .35s ease;
    display: flex;
    .bus__icon {
      box-sizing: border-box;
      width: 100px;
      height: 100%;
      box-shadow: 0 5px 30px -5px rgba(0,0,0,.3);
      background: #232222;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .level__bar {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 0;
        transition: height .8s ease;
        &.blue { background: linear-gradient(10deg, $purple -150%, $blue 120%); }
        &.red { background: linear-gradient(10deg, $purple -150%, $red 120%); }
      }
      .crowdLevel {
        color: white;
        position: absolute;
        font-weight: 500;
        width: 30%;
        margin: auto;
      }
    }
    .infos {
      display: flex;
      width: 100%;
      padding: 8px 0;
      color: #232222;
      z-index: 12;
      transition: opacity .5s ease .5s;
      .info {
        width: 50%;
        font-size: 15px;
        margin-right: 5px;
        display: flex;
        flex-direction: column;
        .label {
          font-size: .9em;
          opacity: .5;
        }
        .value { margin-top: 2.5px; }
        &.time {
          padding-right: 5px;
          .value .number { font-size: 2.1em; }
          .value .scale { font-size: 1.1em; }
        }
        &.location {
          .value {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        @media screen and (max-width: 380px) {
          font-size: 13px;
        }
      }
      &.hidden {
        opacity: 0;
        transition: opacity .5s ease;
      }
    }
    &.recommended {
      margin-bottom: 28px;
      .infos { padding-bottom: 15px; }
      .recommended__container {
        position: absolute;
        bottom: -20px;
        right: -15px;
        font-size: 11px;
        font-weight: 500;
        padding-left: 15px;
        box-shadow: 0 -1px 10px -2px rgba(0,0,0,.5);
        border-radius: 30px;
        background: #333333;
        color: #BBB;
        display: flex;
        align-items: center;
        height: 35px;
        z-index: 100;
        .starIcon {
          width: 35px;
        }
      }
    }
  }
  &:not(.dragging) {
    transition: transform .5s ease;
  }
}
.arrow__icon {
  position: absolute;
  bottom: 16px;
  left: 50%;
  z-index: 9;
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
