<script setup>
import RecommendationOverview from '@/views/dashboard/recommendationOverview.vue'
import ComparationsRecommendation from '@/views/dashboard/comparationsRecommendation.vue'
import ShareAndChallenges from '@/components/ShareAndChallenges.vue'
import LearningCenter from '@/components/LearningCenter.vue'

const handleHomeBtnClick = (() => {
  window.location.href = '/dashboard'
})

// 👉 Images
// import chart from '@images/cards/chart-success.png'
</script>

<template>
  <VRow>
    <!-- 👉 Health and Comfort Recommendations -->
    <VCol cols="12" sm="7">
      <RecommendationOverview />
    </VCol>

    <!-- 👉 Social Sharing and Challenges -->
    <VCol cols="12" sm="5">
      <ShareAndChallenges v-bind="{
        title: 'Eco-Friendly Lifestyle Suggestions',
        firstTitle: 'Beat the Heat Sustainably',
        firstContent: 'With an indoor temperature of 30.1°C, consider using energy-efficient fans or air conditioners, and draw curtains during peak sunlight hours to keep your space cooler without excessive energy use.',
        secondTitle: 'Eco-Friendly Lighting',
        secondContent: 'With indoor light at 400 lumens, consider switching to LED bulbs, which are more energy-efficient and have a longer lifespan compared to traditional bulbs.'
      }" />
    </VCol>

    <!-- 👉 Comparison with Outdoor -->
    <VCol cols="12">
      <ComparationsRecommendation v-bind="{
        indoorTempStat: '30.1',
        outdoorTempStat: '29.9',
        indoorHumidStat: '90',
        outdoorHumidStat: '70',
        indoorLightStat: '400',
        outdoorLightStat: '627',
        indoorCo2Stat: '343',
        outdoorCo2Stat: '123',
      }" />
    </VCol>

    <!-- 👉 Learning Center -->
    <VCol cols="12">
      <LearningCenter v-bind="{
        title: 'Learning Center',
        firstTitle: 'Understanding Indoor Air Quality',
        firstContent: 'Indoor air quality significantly affects our health and comfort. Learning about the various air pollutants and how to mitigate them is crucial for maintaining a healthy living environment.',
        firstLink: ' EPA Guide on Indoor Air Quality',
        secondTitle: 'Energy Efficiency for a Comfortable Home',
        secondContent: 'Energy efficiency not only lowers your utility bills but also creates a more comfortable and sustainable living environment. Discover how to optimize energy usage in your home through smart practices and technologies.',
        secondLink: 'Energy Saver Guide by the U.S. Department of Energy'
      }" />
    </VCol>

    <!-- 👉 Indoor and Outdoor Stats -->
    <VCol cols="12">
      <VRow>
        <!-- 👉 Indoor -->
        <VCol cols="12" sm="6">
          <CardStatisticsVertical v-bind="{
            title: 'Current Indoor Stats',
            image: 'material-symbols:aq-indoor',
            tempStat: '28',
            humidStat: '63',
            lightStat: '600',
            co2Stat: '215',
          }" />
        </VCol>

        <!-- 👉 Outdoor -->
        <VCol cols="12" sm="6">
          <CardStatisticsVertical v-bind="{
            title: 'Current Outdoor Stats',
            image: 'icon-park-solid:outdoor',
            tempStat: '28',
            humidStat: '63',
            lightStat: '600',
            co2Stat: '215',
          }" />
        </VCol>
      </VRow>
    </VCol>

    <!-- 👉 Home, Indoor, Outdoor Buttons -->
    <!-- <VBtn class="home-btn" icon="ic:sharp-home" variant="plain" elevation="12" @click="handleHomeBtnClick" ></VBtn> -->
  </VRow>
</template>

<style lang="scss" scoped>
// .home-btn {
//   position: fixed;
//   background-color: #fff;

//   /* // To keep upgrade to pro button on top of v-layout */
//   z-index: 999;
//   inset-block-start: 20%;
//   inset-inline-end: 1.5%;

//   width: calc(var(--v-btn-height) + 26px);
//   height: calc(var(--v-btn-height) + 26px);
//   border-radius: 32px;

//   /* .v-application &.v-btn.v-btn--elevated {
//     box-shadow: 0 1px 20px 1px rgb(var(--v-theme-error)) !important;

//     &:hover {
//       box-shadow: none !important;
//     }
//   } */
// }
</style>