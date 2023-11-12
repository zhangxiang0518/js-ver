<script setup>
import { useTheme } from 'vuetify'
const { global } = useTheme()
// auto switch background color for indoor/outdoor stats items
// NOTE color should be in 8-digit hex code and without # sign
const tempCompareBgC = computed(() => global.name.value === 'dark' ? purpleDark : "")
const humidCompareBgC = computed(() => global.name.value === 'dark' ? orangeDark : "")
const litCompareBgC = computed(() => global.name.value === 'dark' ? greenDark : "")
const co2CompareBgC = computed(() => global.name.value === 'dark' ? yellowDark : "")


// colors for dark mode
const purpleDark = "967cd9";
const orangeDark = "d49581";
const greenDark = "93bd96";
const yellowDark = "ded68e";

const props = defineProps({
  // indoor or outdoor title
  indoorTempStat: {
    type: String,
    required: true,
    default: 1,
  },
  outdoorTempStat: {
    type: String,
    required: true,
    default: 1,
  },
  indoorHumidStat: {
    type: String,
    required: true,
    default: 1,
  },
  outdoorHumidStat: {
    type: String,
    required: true,
    default: 1,
  },
  indoorLightStat: {
    type: String,
    required: true,
    default: 1,
  },
  outdoorLightStat: {
    type: String,
    required: true,
    default: 1,
  },
  indoorCo2Stat: {
    type: String,
    required: true,
    default: 1,
  },
  outdoorCo2Stat: {
    type: String,
    required: true,
    default: 1,
  },
})

// logic to compute if the stat movement is postive,
// if is, show green stats, else show red stats
const isDarkMode = computed(() => global.name.value === 'dark' ? true : false)

const isTempMovementPositive = computed(() => parseFloat(props.indoorTempStat) <= 28 && parseFloat(props.indoorTempStat) >= 22 ? true : false)
const isHumidMovementPositive = computed(() => parseFloat(props.indoorHumidStat) <= 60 && parseFloat(props.indoorHumidStat) >= 40 ? true : false)
const isLightMovementPositive = computed(() => parseFloat(props.indoorLightStat) <= 700 && parseFloat(props.indoorLightStat) >= 300 ? true : false)
const isCo2MovementPositive = computed(() => parseFloat(props.indoorCo2Stat) <= 200 && parseFloat(props.indoorCo2Stat) >= 50 ? true : false)

const dataDate = "Oct 21"
const dataTime = "20:51"
</script>

<template>
  <VCard class="text-start">
    <VRow no-gutters>
      <VCol cols="12">
        <VCardItem class="pl-6 pt-4 pb-1">
          <VCardTitle class="text-md-h6 text-primary mb-2">
            Comparison with Outdoor
          </VCardTitle>
        </VCardItem>


        <VCardItem class="pt-0">
          <VRow>
            <VCol cols="12" sm="6" lg="3" class="">
              <!-- temperature item -->
              <div class="comparison-item pa-3 temp-item-bgc" :style="'background-color:#' + tempCompareBgC + ';'">

                <div class="title text-text-color font-weight-bold">
                  Temperature
                </div>
                <div class="item-date-text text-compare-date-text">
                  {{ dataDate }} - {{ dataTime }}
                </div>
                <div class="stats-wrapper">
                  <div class="stats">
                    <div class="item-indoor-stat font-weight-bold pt-2"
                      :class="isTempMovementPositive ? 'stat-green' : 'stat-red'">
                      {{ props.indoorTempStat }}°C
                    </div>
                    <div class="item-outdoor-stat text-compare-date-text">
                      {{ props.outdoorTempStat }}°C
                    </div>
                  </div>
                  <div class="movement pa-2 font-weight-bold text-text-color"
                    :style="isDarkMode ? 'background-color: #ffffff66' : 'background-color: #ffffff88'">
                    {{ ((parseFloat(props.outdoorTempStat) - parseFloat(props.indoorTempStat)) /
                      parseFloat(props.indoorTempStat) * 100).toFixed(1) }}%
                  </div>
                </div>
              </div>
            </VCol>


            <VCol cols="12" sm="6" lg="3" class="">
              <!-- humidty item -->
              <div class="comparison-item pa-3 humid-item-bgc" :style="'background-color:#' + humidCompareBgC + ';'">
                <div class="title text-text-color font-weight-bold">
                  Humidity
                </div>
                <div class="item-date-text text-compare-date-text">
                  {{ dataDate }} - {{ dataTime }}
                </div>
                <div class="stats-wrapper">
                  <div class="stats">
                    <div class="item-indoor-stat font-weight-bold pt-2" :class="[
                      isDarkMode ? (isHumidMovementPositive ? 'stat-green-dark-mode' : 'stat-red-dark-mode') : (isHumidMovementPositive ? 'stat-green' : 'stat-red')
                    ]">
                      {{ props.indoorHumidStat }}%
                    </div>
                    <div class="item-outdoor-stat text-compare-date-text">
                      {{ props.outdoorHumidStat }}%
                    </div>
                  </div>
                  <div class="movement pa-2 font-weight-bold text-text-color"
                    :style="isDarkMode ? 'background-color: #ffffff66' : 'background-color: #ffffff88'">
                    {{ ((parseFloat(props.outdoorHumidStat) - parseFloat(props.indoorHumidStat)) /
                      parseFloat(props.indoorHumidStat) * 100).toFixed(1) }}%
                  </div>
                </div>
              </div>
            </VCol>


            <VCol cols="12" sm="6" lg="3" class="">
              <!-- light item -->
              <div class="comparison-item pa-3 light-item-bgc" :style="'background-color:#' + litCompareBgC + ';'">
                <div class="title text-text-color font-weight-bold">
                  Light
                </div>
                <div class="item-date-text text-compare-date-text">
                  {{ dataDate }} - {{ dataTime }}
                </div>
                <div class="stats-wrapper">
                  <div class="stats">
                    <div class="item-indoor-stat font-weight-bold pt-2" :class="[
                      isDarkMode ? (isLightMovementPositive ? 'stat-green-dark-mode' : 'stat-red-dark-mode') : (isLightMovementPositive ? 'stat-green' : 'stat-red')
                    ]">
                      {{ props.indoorLightStat }} lux
                    </div>
                    <div class="item-outdoor-stat text-compare-date-text">
                      {{ props.outdoorLightStat }} lux
                    </div>
                  </div>
                  <div class="movement pa-2 font-weight-bold text-text-color"
                    :style="isDarkMode ? 'background-color: #ffffff66' : 'background-color: #ffffff88'">
                    {{ ((parseFloat(props.outdoorLightStat) - parseFloat(props.indoorLightStat)) /
                      parseFloat(props.indoorLightStat) * 100).toFixed(1) }}%
                  </div>
                </div>
              </div>
            </VCol>


            <VCol cols="12" sm="6" lg="3" class="">
              <!-- co2 item -->
              <div class="comparison-item pa-3 co2-item-bgc" :style="'background-color:#' + co2CompareBgC + ';'">
                <div class="title text-text-color font-weight-bold">
                  CO₂
                </div>
                <div class="item-date-text text-compare-date-text">
                  {{ dataDate }} - {{ dataTime }}
                </div>
                <div class="stats-wrapper">
                  <div class="stats">
                    <div class="item-indoor-stat font-weight-bold pt-2"
                      :class="isCo2MovementPositive ? 'stat-green' : 'stat-red'">
                      {{ props.indoorCo2Stat }} ppm
                    </div>
                    <div class="item-outdoor-stat text-compare-date-text">
                      {{ props.outdoorCo2Stat }} ppm
                    </div>
                  </div>
                  <div class="movement pa-2 font-weight-bold text-text-color"
                    :style="isDarkMode ? 'background-color: #ffffff66' : 'background-color: #ffffff88'">
                    {{ ((parseFloat(props.outdoorCo2Stat) - parseFloat(props.indoorCo2Stat)) /
                      parseFloat(props.indoorCo2Stat) * 100).toFixed(1) }}%
                  </div>
                </div>
              </div>
            </VCol>
          </VRow>
        </VCardItem>

      </VCol>
    </VRow>
  </VCard>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope&display=swap');
</style>

<style scoped>
.comparison-item {
  border-radius: 20px;
  font-family: 'Manrope', sans-serif;
  box-sizing: border-box;
}

.temp-item-bgc {
  background-color: rgb(213, 225, 247);
}

.humid-item-bgc {
  background-color: rgb(216, 241, 248);
}

.light-item-bgc {
  background-color: rgb(218, 244, 233);
}

.co2-item-bgc {
  background-color: rgb(247, 249, 214);
}

.title {
  font-size: 1.2rem;
}

.item-date-text {
  font-size: 0.75rem;
}

.stats-wrapper {
  display: flex;
  justify-content: space-between;
}

.item-indoor-stat {
  font-size: 1.3rem;
}

.item-outdoor-stat {
  font-size: 0.8rem;
}

.stat-green {
  color: #40ad65;
  /* color: #C2DECF; */
}

.stat-green-dark-mode {
  color: #40ad65;
  /* color: #C2DECF; */
}

.stat-red {
  color: #E86F6A;
}

.stat-red-dark-mode {
  color: #E86F6A;
}

.movement {
  align-self: flex-end;
  background-color: #aaa;
  border-radius: 10px;
}

.movement-green {
  background-color: #ffffff88;
}

.movement-green-dark-mode {
  background-color: #ffffff66;
}

.movement-red {
  background-color: #ffffff88;
}

.movement-red-dark-mode {
  background-color: #ffffff66;
}
</style>
