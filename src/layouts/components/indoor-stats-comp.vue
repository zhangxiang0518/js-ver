<!--  -->
<script setup>
import { useTheme } from 'vuetify'
const { global } = useTheme();

const props = defineProps({
  // componentsInfo: {
  //   type: Object,
  //   default: function () {
  //     return {
  //       name: 'sample name',
  //       value: 'sample value'
  //     };
  //   }
  // },
})
const fileNameSuffix = computed(() => global.name.value === 'dark' ? 'DarkIcon.png' : 'Icon.png')

</script>

<template>
  <div class="" style="font-family: 'Manrope', sans-serif;">
    <div class="dBoard-body">
      <!--insert components here-->
      <VRow>
        <!--default skin-->
        <VCol cols="6" xs="6" sm="4" md="3" v-for="(comp, index) in componentsLayoutList" :key="comp.cid">
          <VCard class="rounded-corner ma-sm-1 ma-md-3 ma-lg-5" :id="'card-id-' + index">
            <VCardItem class="card-item pt-4 pb-2 pl-8 pr-2">
              <img :src="'src/assets/images/icons/' + comp.filename.toLowerCase() + fileNameSuffix" class="item-img">
            </VCardItem>

            <VCardItem class="py-0 px-3 px-sm-6 px-lg-7 mb-4">
              <div class="text-wrapper">
                <span class="item-name text-grey-900"
                  :style="$vuetify.display.xs ? 'font-size: 15px;' : 'font-size: 18px;'">{{ comp.name }}</span>
                <div class="item-value-wrapper" :style="$vuetify.display.xs ? 'font-size: 15px;' : 'font-size: 18px;'">
                  <span class="item-value text-grey-700">{{ comp.value + ' ' }}</span>
                  <span class="item-unit text-grey-700">{{ comp.unit }}</span>
                </div>
              </div>
            </VCardItem>
          </VCard>
          <!-- <default-skin
              :components-info="comp" :item-h="paraItemH"
              :item-w="paraItemW"></default-skin> -->
        </VCol>

        <!-- <VCol cols="12" sm="12" md="6" class="">
          <VCard class="rounded-corner ma-sm-1 ma-md-3 ma-lg-5" :id="'card-id-' + index">
            <VCardItem class="card-item pt-4 pb-2 pl-8 pr-2">
             
            </VCardItem>

          </VCard>
        </VCol> -->
      </VRow>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import Vue from "vue";
import DefaultSkin from "@/layouts/components/dashboardComponents/defaultSkin.vue";
import { getViewportSize } from "@/utils/basic.js";
import RecommendationOverview from '@/views/dashboard/recommendationOverview.vue';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    // HumiditySkin1,
    // TempSkin1,
    DefaultSkin
  },
  data() {
    //这里存放数据
    return {
      allItemsRefresh: true,
      componentsLayoutList: [
        {
          show: true,
          cid: 101,
          name: "Temperature",
          value: 30,
          unit: "℃",
          filename: "Temperature"
        }, {
          show: false,
          cid: 102,
          name: "Humidity",
          value: 25,
          unit: "%",
          filename: "Humidity"
        }, {
          show: true,
          cid: 103,
          name: "Light",
          value: 40,
          unit: "lux",
          filename: "Light"
        },
        {
          show: true,
          cid: 104,
          name: "CO₂",
          value: 40,
          unit: "ppm",
          filename: "co2"
        },
        {
          show: true,
          cid: 105,
          name: "PM2.5",
          value: 40,
          unit: "mg/m³",
          filename: "pm25"
        },
        {
          show: true,
          cid: 106,
          name: "Wind Speed",
          value: 40,
          unit: "m/s",
          filename: "windspeed"
        },
        // {
        //   name: "Light",
        //   value: true
        // },
        // {
        //   name: "Light",
        //   value: true
        // }, {
        //   name: "Light",
        //   value: true
        // }, {
        //   name: "Light",
        //   value: true
        // }
      ],
      paraItemW: 150,
      paraItemH: 150,
      vw: undefined,
      vh: undefined,
    };
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
  },
  //监听属性 类似于data概念
  computed: {
    
  },
  //监控data中的数据变化
  watch: {
    
  },
  //方法集合
  methods: {
    setItemSize() {
      const [vw, vh] = getViewportSize();
      this.vw = vw;
      this.vh = vh;
      if (this.vw < 576) {
        this.paraItemW = 80;
      } else if (this.vw >= 576 && this.vw < 768) {
        this.paraItemW = 100;
      } else if (this.vw >= 768 && this.vw < 992) {
        this.paraItemW = 120;
      } else if (this.vw >= 992 && this.vw < 1200) {
        this.paraItemW = 140;
      } else if (this.vw >= 1200 && this.vw < 1400) {
        this.paraItemW = 170;
      } else if (this.vw >= 1400 && this.vw < 1600) {
        this.paraItemW = 200;
      } else {
        this.paraItemW = 220;
      }
      this.paraItemH = this.paraItemW;
    },

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.setItemSize();
    window.addEventListener('resize', this.setItemSize);
    
  },
  beforeCreate() {
  }, //生命周期 - 创建之前
  beforeMount() {
  }, //生命周期 - 挂载之前
  beforeUpdate() {
  }, //生命周期 - 更新之前
  updated() {
  }, //生命周期 - 更新之后
  beforeDestroy() {
    window.removeEventListener('resize', this.setItemSize);
  }, //生命周期 - 销毁之前
  destroyed() {
  }, //生命周期 - 销毁完成
  activated() {
  }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.dBoard-ttl {
  position: fixed;
  top: 15%;
  left: 25%;
  font-size: 1.5vw;
}

.dBoard-item-wrapper {
  display: block;
  /*position: relative;*/
  width: 100%;
  box-sizing: border-box;
}

.card-item {
  /* position: relative; */
}

.item-img {
  width: 70%;
  margin: 10% 0 10% 0;
}

.text-wrapper {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  /* position: absolute;
  bottom: 0;
  width: 100%; */
}

.rounded-corner {
  border-radius: 30px;
  /* aspect-ratio: 1 / 1; */
}

.item-name {
  font-weight: 500;
}
</style>
