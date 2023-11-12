<!--
 * @Author: Tyler Tianyi Liu
 * @Date: 2023-11-02 22:22:04
 * @LastEditTime: 2023-11-06 20:20:25
-->
<script>
// import APIs
// import api from '@/request/api'

// import pinia store
import { mapState, mapActions } from "pinia";
import { useSystemStore } from "@/store/system.js";
import * as echarts from 'echarts';
import { useTheme } from 'vuetify'

// import util methods
import {
  // getDateDaysAgo, 
  getTodayDate
} from '@/utils/basic'
import SimpleStats from "@/layouts/components/outdoorComponents/simple-stats.vue";

export default {
  setup() {
    const { global } = useTheme();

    return {
      globalTheme: global
    };
  },
  // import引入的组件需要注入到对象中才能使用
  components: { SimpleStats },
  data() {
    //这里存放数据
    return {
      isAdmin: true,
      historyTempChart: undefined,
      chartHeight: 300,
      chartWidth: 300,
      xAxisData: [],
      yAxisData: [],
      dataMin: -40,
      dataMax: 40,
      dataInterval: 1,
      chartRefresh: true,
      // chartShow: false,
      // mainColor: '#355F97',
      // mainDarkColor: '#355F97',
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapState(useSystemStore, ["currentWeatherData", "historyWeatherData"]),
    mainColor() {
      return this.globalTheme.name.value === 'dark' ? '#CAE1FC' : '#355F97'
    },

    bgMainColor() {
      return this.globalTheme.name.value !== 'dark' ? '#CAE1FC' : '#355F97'
    },

    bgWhiteColor() {
      return this.globalTheme.name.value !== 'dark' ? '#ffffff88' : '#ffffff22'
    },

    updateTime() {
      const lastUpdatedDate = this.currentWeatherData.current.last_updated.slice(0, 10);
      const todayDate = getTodayDate();

      const timePart = this.currentWeatherData.current.last_updated.slice(10);

      if (lastUpdatedDate === todayDate) {
        return 'Today' + timePart;
      } else {
        return 'Yesterday' + timePart;
      }
      // return this.currentWeatherData.current.last_updated.slice(0, 10) === this.getTodayDate ? 'Today' + this.currentWeatherData.current.last_updated.slice(10) : 'Yesterday' + this.currentWeatherData.current.last_updated.slice(10)
    },

    currentInfoShow() {
      return this.currentWeatherData === undefined ? false : true
    },

    chartShow() {
      return this.historyWeatherData === undefined ? false : true
    }
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
    // chartShow: {
    //   handler: function(newval){
    //     console.log(newval);
    //   }
    // },
    mainColor: {
      handler: function (newval) {
        this.initChart();
      },
      deep: true,
    },

  },
  // 方法集合
  methods: {
    ...mapActions(useSystemStore, ["set_currentWeatherData", "set_historyWeatherData"]),

    initHistoryTempChart() {
      // assign value to height and width
      const ele = document.getElementById("history-temp-chart");

      // ele.style.width = this.chartWidth + 'px';
      ele.style.width = '100%';
      ele.style.height = (this.chartHeight - 100) + 'px';

      // calculate dom size for chart
      this.calcChartSize();

      // init echarts
      const historyTempChart = echarts.init(ele);

      // chart options
      const option = {
        title: {
          text: "Temperature",
          textStyle: {
            color: this.mainColor,
          },
        },
        tooltip: {
          show: false,
          // trigger: 'axis',
          // label: {
          //   formatter: '{b} {c}'
          // },
        },
        grid: {
          top: '15%',
          bottom: '15%',
          left: '2%',
          right: '2%',
        },
        xAxis: {
          data: this.xAxisData,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: this.mainColor,
          }
        },
        yAxis: {
          show: false,
          name: '°C',
          type: 'value',
          interval: this.dataInterval,
          min: this.dataMin,
          max: this.dataMax,
        },
        series: [
          {
            name: 'Temp.',
            type: 'line',
            smooth: true,
            data: this.yAxisData,
            color: this.mainColor,
            label: {
              color: this.mainColor,
              fontFamily: 'Manrope, sans-serif',
              distance: 10,
              show: true,
              position: 'top',
              formatter: '{c}°C',

            }
          }
        ]
      };

      // assign options to chart
      historyTempChart.setOption(option);

      // set chart resize as window resize
      // window.addEventListener("resize", () => {
      //   console.log("resize!");
      //   this.calcChartSize();
      //   historyTempChart.resize();
      // });

      window.addEventListener('resize', function () {
        historyTempChart.resize();
      });

      // reload chart
      historyTempChart.resize();
    },

    getEleSize(ele) {
      const element = document.getElementById(ele);
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      return [width, height];
    },

    calcChartSize() {
      // get the father element of the chart
      const size = this.getEleSize('overview-left-card-id');
      this.chartWidth = size[0];
      this.chartHeight = size[1];
      console.log(JSON.stringify(size));
    },

    getDataForXAxis() {
      const data = this.historyWeatherData.forecast.forecastday;
      let xAxis = [];
      for (let i = 0; i < data.length; i++) {
        xAxis[i] = (data[i].date).slice(5);
      }
      this.xAxisData = xAxis;
    },

    getDataForYAxis() {
      const data = this.historyWeatherData.forecast.forecastday;
      let yAxis = [];
      for (let i = 0; i < data.length; i++) {
        yAxis[i] = data[i].day.avgtemp_c;
      }
      this.yAxisData = yAxis;
    },

    processChartData() {
      this.getDataForXAxis();
      this.getDataForYAxis();

      this.dataMax = Math.ceil(Math.max(...this.yAxisData));
      this.dataMin = Math.floor(Math.min(...this.yAxisData));
      const dif = this.dataMax - this.dataMin;
      if (dif < 1) {
        this.dataInterval = 0.1;
      } else {
        this.dataInterval = Math.round(dif) / 10
      }
    },

    initChart() {
      if (this.chartShow) {
        // console.log('1');
        this.processChartData();
        this.initHistoryTempChart();
      } else {
        // console.log('11111');
        var that = this;
        setTimeout(() => {
          that.initChart()
        }, 1000);
      }

    }
  }, // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {
  }, // 生命周期 - 创建之前
  async created() {

  }, // 生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {
  }, // 生命周期 - 挂载之前
  mounted() {
    // init the chart when mounting dom
    this.initChart();

  },
  beforeUpdate() {
  }, // 生命周期 - 更新之前
  updated() {
  }, // 生命周期 - 更新之后
  activated() {
  }, // 如果页面有keep-alive缓存功能，在组件被激活时触发
  deactivated() {
  }, // 如果页面有keep-alive缓存功能，在组件被停用时触发
  beforeDestroy() {
  }, // 生命周期 - 销毁之前（可以取消订阅、解绑事件）
  destroyed() {
  }, // 生命周期 - 销毁完成
};

// 👉 Images
// import chart from '@images/cards/chart-success.png'
</script>

<template>
  <VRow>
    <!-- 👉 Temperature and History Temperature -->
    <VCol cols="12" style="font-family: 'Manrope', sans-serif;" v-if="currentInfoShow">
      <VCard :style="'background-color:' + bgMainColor + ';'" class="elevation-0">
        <VRow>

          <!-- 👉 Left part of temperature card -->
          <VCol cols="12" md="5" class="pt-6 pl-md-6 pr-md-0 px-4" id="overview-left-card-id">

            <!-- 👉 Title -->
            <VCardItem class="pa-2">
              <div class="overview-left-title-wrapper" :style="'color: ' + mainColor + ';'">
                <div class="overview-left-title">
                  <VIcon icon="healthicons:geo-location-outline" />
                  <span>{{ currentWeatherData.location.name }}</span>
                </div>

                <div class="overview-left-update">{{ updateTime }}</div>
              </div>
            </VCardItem>

            <!-- 👉 Center Stats -->
            <VCardItem class="pa-2">
              <div class="overview-left-center-wrapper" :style="'color: ' + mainColor + ';'">
                <span class="overview-left-center-number">{{ currentWeatherData.current.temp_c }}</span>
                <span class="overview-left-center-unit">°C</span>
                <br />
                <span class="overview-left-center-description">{{ currentWeatherData.current.condition.text }}</span>
              </div>
            </VCardItem>

            <!-- 👉 Footer Stats -->
            <VCardItem class="px-2 py-4">
              <div class="overview-left-footer-wrapper d-flex" :style="'color: ' + mainColor + ';'">
                <!-- 👉 Pressure Data -->
                <span class="overview-left-footer-item">
                  <VIcon icon="material-symbols-light:airware-rounded" />
                  <span>{{ parseFloat(currentWeatherData.current.pressure_mb) / 10 }} kPa</span>
                </span>

                <!-- 👉 Wind Speed Data -->
                <span class="overview-left-footer-item">
                  <VIcon icon="ph:wind-light" />
                  <span>{{ currentWeatherData.current.wind_kph }} kph {{ currentWeatherData.current.wind_dir }}</span>
                </span>

                <!-- 👉 Humidity Data -->
                <span class="overview-left-footer-item">
                  <VIcon icon="material-symbols-light:water-drop-outline-rounded" />
                  <span>{{ currentWeatherData.current.humidity }} %</span>
                </span>
              </div>
            </VCardItem>
          </VCol>

          <!-- 👉 Right part of temperature card -->
          <VCol cols="12" md="7" class="pl-md-14 pr-md-10 py-md-10 pa-6">
            <VCard class="overview-right-card h-100" id="overview-right-card-id"
              :style="'background-color:' + bgWhiteColor + ';'">
              <VCardItem class="overview-right-chart-item pa-2" v-if="chartRefresh">

                <!-- 👉 History Temperature Chart -->
                <div id="history-temp-chart"></div>
              </VCardItem>
            </VCard>
          </VCol>

        </VRow>
      </VCard>
    </VCol>

    <!-- 👉 Other Data -->
    <VCol cols="12">
      <SimpleStats />
    </VCol>

  </VRow>
</template>

<style lang="scss" scoped>
.overview-left-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.overview-left-title {
  font-weight: 600;
  font-size: 18px;
}

.overview-left-update {
  font-size: 15px;
}

.overview-left-center-wrapper {
  text-align: center;
}

.overview-left-center-number {
  font-size: 80px;
}

.overview-left-footer-wrapper {
  justify-content: space-between;
}

.overview-left-footer-item{
  font-size: 18px;
}

.overview-right-card {
  // height: 100%;
  width: 100%;
}

.overview-right-chart-item {
  height: 100%;
  width: 100%;
}

#history-temp-chart {
  height: 100%;
  width: 100%;
}
</style>