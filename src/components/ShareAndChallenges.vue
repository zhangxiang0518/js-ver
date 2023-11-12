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
})

// import { useTheme } from 'vuetify'
// const { global } = useTheme()
// auto switch background color for indoor/outdoor stats items
// NOTE color should be in 8-digit hex code and without # sign
// const tempBgColor = computed(() => global.name.value === 'dark' ? purpleDark : "")

// colors for dark mode
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
      <VCardTitle class="text-md-h6 text-primary" style="text-overflow: break-word; word-wrap: break-word; white-space: normal;">
        {{ props.title }}
      </VCardTitle>
    </VCardItem>

    <!-- first recommedation -->
    <VCardText class="mb-2 py-0 d-flex">
      <v-icon icon="ph:number-circle-one-light" :color="props.color" size="large"></v-icon>
      <span class=" text-subtitle-1 pl-1 text-grey-800">
        {{ props.firstTitle }}
      </span>
    </VCardText>

    <VCardText class="my-2 py-0 mb-5">
      <span class="share-content text-light-primary">
        {{ props.firstContent }}
      </span>
    </VCardText>

    <!-- second recommendation -->
    <VCardText class="mb-2 py-0 d-flex">
      <v-icon icon="ph:number-circle-two-light" :color="props.color" size="large"></v-icon>
      <span class=" text-subtitle-1 pl-1 text-grey-700">
        {{ props.secondTitle }}
      </span>
    </VCardText>

    <VCardText class="my-2 py-0 mb-5">
      <span class="share-content">
        {{ props.secondContent }}
      </span>
    </VCardText>

    <!-- third recommendation -->
    <VCardText class="mb-2 py-0 d-flex">
      <v-icon icon="ph:number-circle-three-light" :color="props.color" size="large"></v-icon>
      <span class=" text-subtitle-1 pl-1 text-grey-800">
        {{ props.thirdTitle }}
      </span>
    </VCardText>

    <VCardText class="my-2 py-0 mb-5">
      <span class="share-content text-light-primary">
        {{ props.thirdContent }}
      </span>
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
.card-item {
  /* max-height: 500px; */
}

</style>
