<script setup>
const props = defineProps({
  // indoor or outdoor title
  title: {
    type: String,
    required: true,
  },
  // indoor or outdoor icon
  image: {
    type: String,
    required: true,
  },
  // stat for temperature
  tempStat: {
    type: String,
    required: true,
  },
  humidStat: {
    type: String,
    required: true,
  },
  lightStat: {
    type: String,
    required: true,
  },
  co2Stat: {
    type: String,
    required: true,
  },
  // to be defined
  // change: {
  //   type: Number,
  //   required: true,
  // },
  // indoor/outdoor title color
  color: {
    type: String,
    default: "primary",
    required: false,
  },
})

import { useTheme } from 'vuetify'
const { global } = useTheme()
// auto switch background color for indoor/outdoor stats items
// NOTE color should be in 8-digit hex code and without # sign
const tempBgColor = computed(() => global.name.value === 'dark' ? purpleDark : "")
const humidBgColor = computed(() => global.name.value === 'dark' ? orangeDark : "")
const litBgColor = computed(() => global.name.value === 'dark' ? greenDark : "")
const co2BgColor = computed(() => global.name.value === 'dark' ? yellowDark : "")

// colors for dark mode
const purpleDark = "967cd9";
const orangeDark = "d49581";
const greenDark = "93bd96";
const yellowDark = "ded68e";



// const isPositive = controlledComputed(() => props.change, () => Math.sign(props.change) === 1)
</script>

<template>
  <VCard class="card-item">
    <VCardText class="d-flex align-center pb-4">
      <v-icon :icon="props.image" :color="props.color" size="x-large"></v-icon>
      <span class="mx-2 text-h6">{{ props.title }}</span>
    </VCardText>

    <VCardText class="my-2">
      <div class="item-wrapper temp-item pa-3 mb-2 text-text-color" :style="'background-color: #' + tempBgColor + ';'">
        <p class="pa-1 font-weight-bold">
          Temperature
        </p>
        <div class="value-wrapper px-2 py-1">
          <p>{{ props.tempStat }}°C</p>
        </div>
      </div>

      <div class="item-wrapper humid-item pa-3 mb-2 text-text-color" :style="'background-color: #' + humidBgColor + ';'">
        <p class="pa-1 font-weight-bold">
          Humidity
        </p>
        <div class="value-wrapper px-2 py-1">
          <p>{{ props.humidStat }}%</p>
        </div>
      </div>

      <div class="item-wrapper light-item pa-3 mb-2 text-text-color" :style="'background-color: #' + litBgColor + ';'">
        <p class="pa-1 font-weight-bold">
          Light
        </p>
        <div class="value-wrapper px-2 py-1">
          <p>{{ props.lightStat }} lux</p>
        </div>
      </div>

      <div class="item-wrapper co2-item pa-3 mb-2 text-text-color" :style="'background-color: #' + co2BgColor + ';'">
        <p class="pa-1 font-weight-bold">
          CO₂
        </p>
        <div class="value-wrapper px-2 py-1">
          <p>{{ props.co2Stat }} ppm</p>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Manrope&display=swap');
</style>

<style scoped>
.comfortable {
  color: #10b981;
}

.mild-uncomfortable {
  color: #f5d565;
}

.uncomfortable {
  color: #e9a23b;
}

.card-item {
  /* background-color: rgb(129, 201, 159); */
}

.item-wrapper {
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  font-family: 'Manrope', sans-serif;
}

.temp-item {
  background-color: rgb(213, 225, 247);
}

.humid-item {
  background-color: rgb(216, 241, 248);
}

.light-item {
  background-color: rgb(218, 244, 233);
}

.co2-item {
  background-color: rgb(247, 249, 214);
}

.value-wrapper {
  display: inline;
  text-align: center;
  background-color: #ffffff88;
  border-radius: 10px;
  font-family: 'Rubik', sans-serif;
}
</style>
