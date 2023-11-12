<script setup>
import { useTheme } from 'vuetify'
import { mapActions } from 'pinia';
import { useSystemStore } from "@/store/system";

const props = defineProps({
  themes: {
    type: Array,
    required: true,
  },
})

const computedIsDarkMode = computed(() => isDarkMode);

const {
  name: themeName,
  global: globalTheme,
} = useTheme()

const {
  state: currentThemeName,
  next: getNextThemeName,
  index: currentThemeIndex,
} = useCycleList(props.themes.map(t => t.name), { initialValue: themeName })

const changeTheme = () => {
  globalTheme.name.value = getNextThemeName()
}

const systemStore = useSystemStore();

// Update icon if theme is changed from other sources
watch(() => globalTheme.name.value, val => {
  currentThemeName.value = val

  // update isDarkMode indicatior in store
  if (val == "dark") {
    systemStore.set_isDarkMode(true);
  } else {
    systemStore.set_isDarkMode(false);
  }
})
</script>

<template>
  <IconBtn @click="changeTheme">
    <VIcon :icon="props.themes[currentThemeIndex].icon" />
    <VTooltip activator="parent" open-delay="1000" scroll-strategy="close">
      <span class="text-capitalize">{{ currentThemeName }}</span>
    </VTooltip>
  </IconBtn>
</template>
