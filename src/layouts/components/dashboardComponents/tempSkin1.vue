<!--  -->
<template>
  <div class="dBoard-item-wrapper" :id="componentsInfo.cid">
    <div class="item no-select pointer-cursor"
         :style="'height: ' + itemH + 'px; width: ' + itemW + 'px; background-color: ' + dynamicBgColor + ';box-shadow: 0 0 12px 2px ' + dynamicBoxShadow"
         @click="handleClickItem">
      <!--      <img :src="require('../../assets/lightIcon.png')" class="item-img"-->
      <div class="item-name" :style="'font-size: ' + Math.round(itemW/10) + 'px; color: ' + dynamicTitleColor"
           style="font-family: 'JetBrains Mono',serif">
        Current Temp.
      </div>
      <div class="item-value" :style="'font-size: ' + Math.round(itemW/1.5) + 'px; color: ' + dynamicFontColor">
        <span
            :style="{ 'font-weight': '500', 'font-family': 'Semibold Rails, monospace', 'letter-spacing': computedLetterSpacing }"
        >{{ tempValue }}</span>
        <span
            :style="'font-size: ' + Math.round(itemW/5) + 'px; line-height: ' + Math.round(itemW/1.5) + 'px; vertical-align: top'">°</span>
        <span
            :style="'font-size: ' + Math.round(itemW/10) + 'px; line-height: ' + Math.round(itemW/1.5) + 'px; vertical-align: top'"
            v-if="isCelsius">C</span>
        <span
            :style="'font-size: ' + Math.round(itemW/10) + 'px; line-height: ' + Math.round(itemW/1.5) + 'px; vertical-align: top'"
            v-if="!isCelsius">F</span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * v1.1  Edited by Tyler
 */

// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      localItemInfo: {}, // copy of 'components' prop
      value: false, // copy of 'components.value' prop
      dynamicBgColor: "#eeeeee",
      dynamicFontColor: "#FFFFFF",
      dynamicTitleColor: "#888888",
      dynamicBoxShadow: "rgba(0, 0, 0, .1)",
      isCelsius: true,
      tempValue: 0,
    };
  },
  // 监听属性 类似于data概念
  computed: {
    computedLetterSpacing() {
      const value = this.componentsInfo.value.toString(); // 将值转换为字符串
      let letterSpacing = '-15px'; // 默认情况下为 -15px
      if (value.length === 1) {
        letterSpacing = '-5px'; // 一位数，设置为 -5px
      } else if (value.length === 2) {
        if (value.includes('1')) {
          letterSpacing = '-5px'; // 两位数且包含 '1'，设置为 -5px
        } else if (value.includes('7')) {
          letterSpacing = '-10px'; // 两位数且包含 '7'，设置为 -10px
        }
      }
      return letterSpacing;
    }
  },
  // 从父组件向子组件传递数据
  // 传入的prop放在这里 这里写的变量不用在data中声明
  props: {
    componentsInfo: {
      type: Object,
      default: function () {
        return {
          name: 'sample name',
          value: 'sample value'
        };
      }
    },
    itemH: {
      type: Number,
      default: 150,
    },
    itemW: {
      type: Number,
      default: 150,
    },
  },
  // 监控data中的数据变化
  watch: {
    componentsInfo: {
      handler: function (newval) {
        this.tempValue = newval.value; // 首先为dom的本地温度数值变量赋值
        if (!this.isCelsius){
          this.temperatureConversion();
        }
        if (newval.value < 8) {
          this.dynamicBgColor = "#ceebfd";
          this.dynamicFontColor = "#71a9c9";
          this.dynamicTitleColor = "#0A3575"
        } else if (newval.value >= 8 && newval.value < 15) {
          this.dynamicBgColor = "#d6f7f4";
          this.dynamicFontColor = "#00ccc1";
          this.dynamicTitleColor = "#0caab1";
        } else if (newval.value >= 15 && newval.value < 23) {
          this.dynamicBgColor = "#c4f8b3";
          this.dynamicFontColor = "#71db67";
          this.dynamicTitleColor = "#258418";
        } else if (newval.value >= 23 && newval.value < 28) {
          this.dynamicBgColor = "#fffdca";
          this.dynamicFontColor = "#FCCD3F";
          this.dynamicTitleColor = "#f6a000";
          this.dynamicBoxShadow = "rgba(231, 227, 171, 0.5)"
        } else if (newval.value >= 28 && newval.value < 33) {
          this.dynamicBgColor = "#ffe3c0";
          this.dynamicFontColor = "#ffab0e";
          this.dynamicTitleColor = "#d38a00";
        } else {
          this.dynamicBgColor = "#ffbeb0";
          this.dynamicFontColor = "#ff613f";
          this.dynamicTitleColor = "#ae2407";
        }
      },
      immediate: true, // 组件创建时是否触发此函数
      deep: true, // 是否深度监听（当监听变量的内部属性时 eg对象内部的属性变化，数组元素变化，嵌套的对象/数组）
    },
  },
  // 方法集合
  methods: {
    testAddTemp() {
      var that = this;
      setTimeout(() => {
        that.componentsInfo.value += 1;
        this.testAddTemp();
      }, 2000);
    },

    handleClickItem() {
      this.temperatureConversion();
      this.isCelsius = !this.isCelsius;
    },

    temperatureConversion(){
      if (this.isCelsius) {
        this.tempValue = Math.round((this.tempValue * 9 / 5) + 32);
      } else {
        this.tempValue = Math.round((this.tempValue - 32) * 5 / 9);
      }
    },
  }, // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {
  }, // 生命周期 - 创建之前
  created() {
  }, // 生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {
  }, // 生命周期 - 挂载之前
  mounted() {
    // this.testAddTemp();
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
</script>
<style scoped>
.item-name {
  transition: color 2s cubic-bezier(0.445, 0.050, 0.550, 0.950);
  position: absolute;
  top: 80%;
  font-size: 16px;
  left: 10%;
}

.item-value {
  transition: color 2s cubic-bezier(0.445, 0.050, 0.550, 0.950);
  position: absolute;
  top: -5%;
  right: 5%;
  font-size: 16px;
  text-align: center;
  color: #111827;
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
  transition: background-color 3s cubic-bezier(0.445, 0.050, 0.550, 0.950);
  margin: 20px auto;
  box-sizing: content-box;
  position: relative;
  display: block;
  height: 160px;
  width: 160px;
  text-align: center;
  border-radius: 10%;
  padding: 20px;
  background-color: #eee;
  /*box-shadow: 0 0 12px 2px rgba(231, 227, 171, 0.5);*/
  /*border: 1px solid #ddd;*/
}

.dBoard-item-wrapper {
  display: block;
  /*position: relative;*/
  width: 100%;
  box-sizing: border-box;
}

.no-select{
  user-select: none;
}

.pointer-cursor:hover{
  cursor: pointer;
}

/* import customize fonts(.otf file) */
@font-face {
  font-family: 'Semibold'; /* 自定义字体的名称 */
  src: url('src/assets/fonts/SF Pro - Semibold.otf') format('opentype'); /* 字体文件路径 */
}

@font-face {
  font-family: 'Semibold Rails'; /* 自定义字体的名称 */
  src: url('src/assets/fonts/SF Pro - Semibold Rails.otf') format('opentype'); /* 字体文件路径 */
}

@font-face {
  font-family: 'Semibold Rounded'; /* 自定义字体的名称 */
  src: url('src/assets/fonts/SF Pro - Semibold Rounded.otf') format('opentype'); /* 字体文件路径 */
}

@font-face {
  font-family: 'Semibold Soft'; /* 自定义字体的名称 */
  src: url('src/assets/fonts/SF Pro - Semibold Soft.otf') format('opentype'); /* 字体文件路径 */
}

@font-face {
  font-family: 'Semibold Stencil'; /* 自定义字体的名称 */
  src: url('src/assets/fonts/SF Pro - Semibold Stencil.otf') format('opentype'); /* 字体文件路径 */
}
</style>
<style></style>
