<!--  -->
<script setup>
import { useTheme } from 'vuetify'
const { global } = useTheme();

const props = defineProps({
  componentsInfo: {
    type: Object,
    default: function () {
      return {
        name: 'sample name',
        value: 'sample value'
      };
    }
  },
})

const fileNameSuffix = computed(() => global.name.value === 'dark' ? 'DarkIcon.png' : 'Icon.png')
</script>

<template>
  <VCard class="dBoard-item-wrapper" :id="componentsInfo.cid">
    <VCardItem class="">

    </VCardItem>
    <div class="item">
      <!--      <img :src="require('../../assets/lightIcon.png')" class="item-img"-->
      <img :src="'src/assets/images/icons/' + componentsInfo.filename.toLowerCase() + fileNameSuffix" class="item-img">
      <div class="item-name" :style="'font-size: ' + Math.round(itemW / 10) + 'px'">
        {{ componentsInfo.name }}
      </div>
      <div class="item-value" :style="'font-size: ' + Math.round(itemW / 10) + 'px'">
        <span style="font-weight: 600">{{ componentsInfo.value }}</span>
        {{ componentsInfo.unit }}
      </div>
    </div>
  </VCard>
</template>

<style scoped>
.item-name {
  position: absolute;
  top: 80%;
  font-size: 16px;
  left: 10%;
  color: #111827;
}

.item-value {
  position: absolute;
  top: 80%;
  right: 10%;
  font-size: 16px;
  text-align: center;
}

.item-img {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 25%;
  left: 25%;
  transform: translate(-25%, -25%);
  display: block;
  margin: 0 auto;
}

.item {
  /* margin: 20px auto; */
  box-sizing: border-box;
  /* position: relative; */
  /* display: block; */
  height: 160px;
  /* height: 100%; */
  text-align: center;
  border-radius: 10%;
  /* padding: 20px; */
  background-color: transparent;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1); */
  /* border: 1px solid #ddd; */
}

.item-img {
  width: 150px;
  height: 150px;
}

.dBoard-item-wrapper {
  /* display: block; */
  /*position: relative;*/
  width: 100%;
  box-sizing: border-box;
}
</style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
</style>  
