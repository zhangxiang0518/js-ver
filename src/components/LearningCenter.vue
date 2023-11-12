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
  firstTitle: {
    type: String,
    default: "No data",
    required: true,
  },
  firstContent: {
    type: String,
    default: "No data",
    required: true,
  },
  firstLink: {
    type: String,
    default: "No data",
    required: true,
  },
  secondTitle: {
    type: String,
    default: "No data",
    required: true,
  },
  secondContent: {
    type: String,
    default: "No data",
    required: true,
  },
  secondLink: {
    type: String,
    default: "No data",
    required: true,
  },
  thirdTitle: {
    type: String,
    default: "No data",
    required: true,
  },
  thirdContent: {
    type: String,
    default: "No data",
    required: true,
  },
  thirdLink: {
    type: String,
    default: "No data",
    required: true,
  },
})


import illustrationJohnDark from '@images/cards/illustration-john-dark.png'
import illustrationJohnLight from '@images/cards/illustration-john-light.png'
import { useTheme } from 'vuetify'
const { global } = useTheme()
const illustrationJohn = computed(() => global.name.value === 'dark' ? illustrationJohnDark : illustrationJohnLight)

const goToWebLink = ((link) => {
  window.location.href = link;
})

// // auto switch background color for indoor/outdoor stats items
// // NOTE color should be in 8-digit hex code and without # sign
// const tempBgColor = computed(() => global.name.value === 'dark' ? purpleDark : "")
// const humidBgColor = computed(() => global.name.value === 'dark' ? orangeDark : "")
// const litBgColor = computed(() => global.name.value === 'dark' ? greenDark : "")
// const co2BgColor = computed(() => global.name.value === 'dark' ? yellowDark : "")

// // colors for dark mode
// const purpleDark = "967cd9";
// const orangeDark = "d49581";
// const greenDark = "93bd96";
// const yellowDark = "ded68e";



// const isPositive = controlledComputed(() => props.change, () => Math.sign(props.change) === 1)
</script>

<template>
  <VCard class="card-item pb-3 h-100">
    <!-- <VCardText class="d-flex px-6 pt-4 pb-1">
      <span class="text-md-h6 text-primary">{{ props.title }}</span>
    </VCardText> -->

    <VCardItem class="pl-6 pt-4 pb-3">
      <VCardTitle class="text-md-h6 text-primary">
        {{ props.title }}
      </VCardTitle>
    </VCardItem>

    <VRow>
      <VCol cols="12" sm="9" md="10" order="2" order-sm="1">
        <!-- first recommedation -->
        <VCardText class="mb-2 py-0 d-flex">
          <span class="share-title text-subtitle-1 text-grey-800">
            {{ props.firstTitle }}
          </span>
        </VCardText>

        <VCardText class="my-2 py-0 mb-5">
          <span class="share-content text-light-primary">
            {{ props.firstContent }}
          </span>
        </VCardText>

        <VCardText class="my-2 py-0 mb-5">
          Link:
          <span class="learn-link text-light-primary text-decoration-underline" @click="goToWebLink(props.firstLink)">
            <i>{{ props.firstLink }}</i>
          </span>
        </VCardText>

        <!-- second recommendation -->
        <VCardText class="mb-2 py-0 d-flex">
          <span class="share-title text-subtitle-1 text-grey-700">
            {{ props.secondTitle }}
          </span>
        </VCardText>

        <VCardText class="my-2 py-0 mb-5">
          <span class="share-content">
            {{ props.secondContent }}
          </span>
        </VCardText>

        <VCardText class="my-2 py-0 mb-5">
          Link:
          <span class="learn-link text-light-primary text-decoration-underline">
            <i>{{ props.secondLink }}</i>
          </span>
        </VCardText>

        <!-- third recommendation -->
        <VCardText class="mb-2 py-0 d-flex">
          <span class="share-title text-subtitle-1 text-grey-800">
            {{ props.thirdTitle }}
          </span>
        </VCardText>

        <VCardText class="my-2 py-0 mb-5">
          <span class="share-content text-light-primary">
            {{ props.thirdContent }}
          </span>
        </VCardText>

        <VCardText class="my-2 py-0 mb-5">
          Link:
          <span class="learn-link text-light-primary text-decoration-underline">
            <i>{{ props.thirdLink }}</i>
          </span>
        </VCardText>
      </VCol>

      <VCol cols="12" sm="1" order="1" order-sm="2" class="text-center">
        <img :src="illustrationJohn" :height="$vuetify.display.xs ? '150' : '125'"
          :class="$vuetify.display.xs ? 'mt-6 mb-n2' : 'position-absolute'" class="john-illustration flip-in-rtl">
      </VCol>
    </VRow>
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
.card-item {
  /* max-height: 500px; */
}

.share-title {
  /* justify-content; */
}

.john-illustration {
  inset-block-end: -0.0625rem;
  inset-inline-end: 3rem;
}

.learn-link:hover {
  cursor: pointer;
}
</style>
