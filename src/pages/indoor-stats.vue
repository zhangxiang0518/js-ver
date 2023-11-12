<script setup>
// import RecommendationOverview from '@/views/dashboard/recommendationOverview.vue'
// import ComparationsRecommendation from '@/views/dashboard/comparationsRecommendation.vue'
// import ShareAndChallenges from '@/components/ShareAndChallenges.vue'
// import LearningCenter from '@/components/LearningCenter.vue'
import indoorStatsComp from '@/layouts/components/indoor-stats-comp.vue';

const handleHomeBtnClick = (() => {
  window.location.href = '/dashboard'
})

// 👉 Images
// import chart from '@images/cards/chart-success.png'
</script>

<template>
  <!-- <VRow>
    
  </VRow> -->

  <div>
    <indoor-stats-comp/>
  </div>
</template>

<style lang="scss" scoped>

</style>