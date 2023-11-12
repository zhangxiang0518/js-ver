<!--
 * @Author: Tyler Tianyi Liu
 * @Date: 2023-11-06 16:10:17
 * @LastEditTime: 2023-11-06 20:19:05
 * @Version:
-->
<!--  -->

<template>
  <VCard style="font-family: 'Manrope', sans-serif;" class="elevation-0" v-if="isDataLoad">
    <VCardItem class="pb-0">
      <VCardTitle>
        <div class="d-flex">
          <VIcon icon="arcticons:airly"></VIcon>
          <span class="card-title mx-4">Air Quality</span>
        </div>

      </VCardTitle>
    </VCardItem>
    <VCardItem>
      <VRow>
        <!-- 👉 Items -->
        <VCol cols="12" sm="6" md="3" v-for="(key, index) in Object.keys(aqData)" :key="key">
          <VCard class="card-item elevation-2" :style="'background-color: ' + itemBgColor + '; color: ' + mainColor + ';'">
            <!-- 👉 Name -->
            <VCardItem>
              <span class="stat-name">{{ aqKeys[index] }}</span>
              <br>
              <!-- 👉 Value -->
              <span class="stat-value">{{ aqData[key] }}</span>
              <br>
              <span class="stat-unit"> μg/m³</span>
            </VCardItem>
          </VCard>
        </VCol>
      </VRow>
    </VCardItem>
  </VCard>
</template>

<script>
/**
 * v1.1  Edited by Tyler
 */

// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import { mapState } from "pinia";
import { useSystemStore } from "@/store/system";
import { useTheme } from 'vuetify'
// const store = useSystemStore();

export default {
  setup() {
    const { global } = useTheme();

    return {
      globalTheme: global
    };
  },
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      aqData: undefined,
      isDataLoad: false,
      aqKeys: [
        'CO',
        'NO₂',
        'O₃',
        'SO₂',
        'PM2.5',
        'PM10'
      ],
      adIcons: [
        'mdi:carbon-monoxide',

      ]
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapState(useSystemStore, ["currentWeatherData", "historyWeatherData"]),

    itemBgColor() {
      return this.globalTheme.name.value === 'dark' ? '#5274A5' : '#E6F1FD'
    },

    mainColor() {
      return this.globalTheme.name.value === 'dark' ? '#CAE1FC' : '#355F97'
    },
  },
  // 从父组件向子组件传递数据
  // 传入的prop放在这里 这里写的变量不用在data中声明
  props: {
    // something: {
    //   type: Number,
    //   default: undefined
    // },
  },
  // 监控data中的数据变化
  watch: {
    // something: {
    //   handler: function () {
    //     this.doSomething();
    //   },
    //   immediate: false, // 组件创建时是否触发此函数
    //   deep: false, // 是否深度监听（当监听变量的内部属性时 eg对象内部的属性变化，数组元素变化，嵌套的对象/数组）
    // },
    currentWeatherData: {
      handler: function (newval) {
        if (newval != undefined) {
          console.log(newval);
          let obj = JSON.parse(JSON.stringify(newval.current.air_quality));
          // console.log(obj[gb-defra-index]);
          delete obj["gb-defra-index"];
          delete obj["us-epa-index"];
          this.aqData = obj;
          // this.aqKeys = Object.keys(this.aqData);
          this.isDataLoad = true;
        } else {
          this.isDataLoad = false;
        }
      },
      deep: true,
      immediate: true,
    }
  },
  // 方法集合
  methods: {}, // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() { }, // 生命周期 - 创建之前
  created() { }, // 生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() { }, // 生命周期 - 挂载之前
  mounted() {
    console.log(this.currentWeatherData);
  },
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  activated() { }, // 如果页面有keep-alive缓存功能，在组件被激活时触发
  deactivated() { }, // 如果页面有keep-alive缓存功能，在组件被停用时触发
  beforeDestroy() { }, // 生命周期 - 销毁之前（可以取消订阅、解绑事件）
  destroyed() { }, // 生命周期 - 销毁完成
};
</script>
<style scoped>
.card-title {
  font-size: 20px;
}

.card-item {
  text-align: center;
}

.stat-name {
  font-weight: 600;
  font-size: 20px;
}

.stat-value {
  font-size: 45px;
}

.stat-unit {
  font-size: 14px;
}
</style>
<style></style>
