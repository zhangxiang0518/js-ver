<!--  -->
<template>
  <div class="parameter-body">
    <!--insert components here-->
    <Row>
      <Col :xs=12 :sm=8 :md=6 :lg=6 :xl=6 :xxl=6 v-for="para in parametersList" :key="para.name">
        <div class="dBoard-item-wrapper">
          <div class="item" :style="'height: ' + paraItemH + 'px; width: ' + paraItemW + 'px'">
            <img :src="'../assets/' + para.name + 'Icon.png'" class="parameter-icon"
                 :style="'width: ' + Math.round(paraItemW/1.5) + 'px; height: ' + Math.round(paraItemH/1.5) + 'px'">
            <i-switch v-model="para.value" true-color="#13ce66" false-color="#ff4949" class="parameter-switch"
                    :size="switchSize"/>
            <!--            <el-switch-->
            <!--                v-if="switchRefresh"-->
            <!--                :width="switchWidth"-->
            <!--                v-model="para.value"-->
            <!--                active-color="#13ce66"-->
            <!--                inactive-color="#ff4949"-->
            <!--                class="parameter-switch">-->
            <!--            </el-switch>-->
            <div class="parameter-text-wrapper" :style="'font-size: ' + Math.round(paraItemW/9.375) + 'px'">
              {{ para.name }}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
/**
 * v1.1
 * Template Created by BZx
 * Template Edited by Tyler
 */

// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import {getViewportSize} from '@/utils/basic'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      parametersList: [
        {
          name: "Temperature",
          value: true
        }, {
          name: "Humidity",
          value: true
        }, {
          name: "Light",
          value: true
        }, {
          name: "Light",
          value: true
        }, {
          name: "Light",
          value: true
        }, {
          name: "Light",
          value: true
        }, {
          name: "Light",
          value: true
        }
      ],
      paraItemW: 150,
      paraItemH: 150,
      vw: undefined,
      vh: undefined,
      switchSize: undefined,
    };
  },
  // 监听属性 类似于data概念
  computed: {
    getImgSrc(para){
      return new URL(`../assets/` + para.name + `Icon.png`, import.meta.url).href
    }
  },
  // 从父组件向子组件传递数据
  // 传入的prop放在这里 这里写的变量不用在data中声明
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
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
  },
  // 方法集合
  methods: {
    setItemSize() {
      const [vw, vh] = getViewportSize();
      this.vw = vw;
      this.vh = vh;
      this.switchSize = undefined
      if (this.vw < 576) {
        this.paraItemW = 130;
        this.switchSize = "small"
      } else if (this.vw >= 576 && this.vw < 768) {
        this.paraItemW = 120;
        this.switchSize = "small"
      } else if (this.vw >= 768 && this.vw < 992) {
        this.paraItemW = 140;
      } else if (this.vw >= 992 && this.vw < 1200) {
        this.paraItemW = 170;
      } else if (this.vw >= 1200 && this.vw < 1600) {
        this.paraItemW = 200;
      } else {
        this.paraItemW = 220;
      }
      this.paraItemH = this.paraItemW;
    },
  }, // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {
  }, // 生命周期 - 创建之前
  created() {
  }, // 生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {
  }, // 生命周期 - 挂载之前
  mounted() {
    this.setItemSize();
    window.addEventListener('resize', this.setItemSize);
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
    window.removeEventListener('resize', this.setItemSize);
  }, // 生命周期 - 销毁之前（可以取消订阅、解绑事件）
  destroyed() {
  }, // 生命周期 - 销毁完成
};
</script>
<style scoped>
.parameter-body {
  /* margin: 10% 2vw 0 2vw; */
}

.dBoard-item-wrapper {
  display: block;
  /*position: relative;*/
  width: 100%;
  box-sizing: border-box;
}

.item {
  margin: 20px auto;
  box-sizing: content-box;
  border: 1px solid transparent;
  position: relative;
  display: block;
  height: 160px;
  width: 160px;
  text-align: center;
  border-radius: 10%;
  padding: 20px;
  background-color: rgb(252, 252, 252);
  box-shadow: 0 2px 9px -2px var(--v-shadow-key-umbra-opacity),
    0 4px 9px 1px var(--v-shadow-key-penumbra-opacity),
    0 2px 6px 4px var(--v-shadow-key-ambient-opacity);
}

.parameter-icon {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 25%;
  left: 25%;
  transform: translate(-25%, -25%);
  display: block;
  margin: 0 auto;
}

.parameter-switch {
  position: absolute;
  top: 80%;
  right: 10%;
}

.parameter-text-wrapper {
  position: absolute;
  top: 80%;
  left: 10%;
  font-size: 16px;
  text-align: center;
}

</style>
<style></style>
