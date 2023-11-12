<script setup>
import { useTheme } from 'vuetify'
import illustrationJohnDark from '@images/cards/illustration-john-dark.png'
import illustrationJohnLight from '@images/cards/illustration-john-light.png'

const { global } = useTheme()
const illustrationJohn = computed(() => global.name.value === 'dark' ? illustrationJohnDark : illustrationJohnLight)
</script>

<template>
  <VCard class="text-start h-100">
    <VCardItem class="px-6 pt-4 pb-3">
      <VCardTitle class="text-md-h6 text-primary">
        Health and Comfort Recommendations
      </VCardTitle>
    </VCardItem>
    <VRow no-gutters>
      <!-- <VCol cols="12" sm="10" md="9" order="2" order-sm="1"> -->
      <VCol cols="12">
        <VCardItem class="pb-1 pt-2">
          <VCardSubtitle class="text-subtitle-1">
            Temperature Comfort
          </VCardSubtitle>
        </VCardItem>

        <VCardText class="pb-2">
          <span class="text-light-primary">
            Recommend setting the
            thermostat to a more comfortable range of 20-22°C.
          </span>
          <br>
        </VCardText>

        <VCardItem class="pb-1 pt-2">
          <VCardSubtitle class="text-subtitle-1">
            Air Quality Alert
          </VCardSubtitle>
        </VCardItem>

        <VCardText class="pb-2">
          <span>
            With indoor CO2 levels at 355.69 ppm, suggest keeping it below 1000 ppm for maintaining a
            healthy environment.
          </span>
          <br>
        </VCardText>

        <VCardItem class="pb-1 pt-2">
          <VCardSubtitle class="text-subtitle-1">
            Humidity Control
          </VCardSubtitle>
        </VCardItem>

        <VCardText class="pb-2">
          <span class="text-light-primary">
            As the indoor humidity is 32.77%, recommend using a humidifier to
            increase humidity for better comfort.
          </span>
          <br>
        </VCardText>
        <br>
      </VCol>

      <!-- <VCol cols="12" sm="1" order="1" order-sm="2" class="text-center">
        <img :src="illustrationJohn" :height="$vuetify.display.xs ? '150' : '100'"
          :class="$vuetify.display.xs ? 'mt-6 mb-n2' : 'position-absolute'" class="john-illustration flip-in-rtl">
      </VCol> -->
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>

</style>
