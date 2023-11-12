<script setup>
// import { useTheme } from 'vuetify'
// import upgradeBannerDark from '@images/pro/upgrade-banner-dark.png'
// import upgradeBannerLight from '@images/pro/upgrade-banner-light.png'
import avatar1 from '@images/avatars/avatar-1.png'
// const vuetifyTheme = useTheme()
// const upgradeBanner = computed(() => {
//   return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
// })
</script>

<script>
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'


// Components
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// import APIs
import api from '@/request/api'

// import pinia store
import { mapState, mapActions } from "pinia";
import { useSystemStore } from "@/store/system.js";

// import util methods
import { getDateDaysAgo } from '@/utils/basic'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { VerticalNavLayout, VerticalNavLink, NavbarThemeSwitcher, UserProfile },
  data() {
    //这里存放数据
    return {
      isAdmin: true,
      currentTime: this.getCurrentTimeHHMM()
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapState(useSystemStore, ["currentWeatherData", "historyWeatherData"]),
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
  },
  // 方法集合
  methods: {
    ...mapActions(useSystemStore, ["set_currentWeatherData", "set_historyWeatherData"]),

    // handle table component change theme
    handleClickTheme() {
      const dashboardRoute = "/dashboard-test";
      if (this.$route.path == dashboardRoute) {
        // manual config user list table style for dark mode
        // switch mode by enable next color mode
      }
      console.log(this.$route.path);
    },

    handleHomeBtnClick() {
      window.location.href = "/dashboard";
    },

    handleIndoorBtnClick() {
      console.log("Go to indoor page");
      // window.location.href = "/indoor";
    },

    handleOutdoorBtnClick() {
      console.log("Go to outdoor page");
      window.localStorage.href = "/outdoor";
    },

    async initWeatherData() {
      let startDate = getDateDaysAgo(7);
      let endDate = getDateDaysAgo(1);
      this.set_currentWeatherData(await api.weatherAPI.getCurrentWeather(undefined, true));
      this.set_historyWeatherData(await api.weatherAPI.getCityHistoryWeather(undefined, startDate, endDate));
    },

    getCurrentTimeHHMM() {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      const currentTime = hours + ':' + minutes;
      return currentTime;
    },
  }, // 生命周期 - 创建完成（可以访问当前this实例）
  beforeCreate() {
    const that = this;
    setInterval(function () {
      that.currentTime = that.getCurrentTimeHHMM();
    }, 1000);
  }, // 生命周期 - 创建之前
  async created() {
    await this.initWeatherData();
  }, // 生命周期 - 挂载完成（可以访问DOM元素）
  beforeMount() {
  }, // 生命周期 - 挂载之前
  mounted() {

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

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="bx-menu" />
        </IconBtn>

        <!-- 👉 Search -->
        <div class="d-flex align-center time" style="user-select: none;">
          {{ currentTime }}
        </div>
        
        <VChip color="primary" style="margin-left: 2%;">
           Last Update at 19:50
          </VChip>
          <IconBtn icon="mdi-cached">
          </IconBtn>
        <VSpacer />

        <!-- Will change this link to repo link -->
        <!-- <IconBtn class="me-2" href="https://github.com/themeselection/sneat-vuetify-vuejs-admin-template-free"
          target="_blank" rel="noopener noreferrer">
          <VIcon icon="bxl-github" />
        </IconBtn>

        <IconBtn class="me-2" to="/recommendation-test">
          <VIcon icon="bx-bell" />
        </IconBtn> -->

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink :item="{
        title: 'Dashboard',
        icon: 'mdi-view-dashboard-outline',
        // icon: 'bx-home',
        to: '/dashboard',
      }" />
      <VerticalNavLink :item="{
        title: 'Indoor',
        icon: 'material-symbols:aq-indoor',
        to: '/indoor-stats',
      }" />
      <VerticalNavLink :item="{
        title: 'Outdoor',
        icon: 'icon-park-outline:outdoor',
        to: '/outdoor-stats',
      }" />
      <VerticalNavLink :item="{
        title: 'Profile',
        icon: 'mdi-account-cog-outline',
        to: '/profile',
      }" />
      <!-- <VerticalNavLink
        :item="{
          title: 'Profiles',
          icon: 'mdi-account-cog-outline',
          to: '/profiles',
        }"
      /> -->
      <VerticalNavLink v-if="isAdmin" :item="{
        title: 'Management',
        icon: 'mdi-account-group-outline',
        to: '/settings',
      }" />
      <VerticalNavLink v-if="isAdmin" :item="{
        title: 'Parameters',
        icon: 'mdi-code-braces',
        to: '/parameters',
      }" />
      <!-- <VerticalNavLink :item="{
        title: 'Dash-ori',
        icon: 'mdi-account-cog-outline',
        to: '/dashboard-test',
      }" />
      <VerticalNavLink :item="{
        title: 'Recommd-test',
        icon: 'mdi-info-outline',
        to: '/recommendation-test',
      }" />
      <VerticalNavLink :item="{
        title: 'test',
        icon: 'mdi-account-cog-outline',
        to: '/test',
      }" /> -->


      <!-- 👉 Pages -->
      <!-- <VerticalNavSectionTitle
        :item="{
          heading: 'Pages',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Login',
          icon: 'bx-log-in',
          to: '/login',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Register',
          icon: 'bx-user-plus',
          to: '/register',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Error',
          icon: 'bx-info-circle',
          to: '/no-existence',
        }"
      /> -->

      <!-- 👉 User Interface -->
      <!-- <VerticalNavSectionTitle
        :item="{
          heading: 'User Interface',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Typography',
          icon: 'mdi-alpha-t-box-outline',
          to: '/typography',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Icons',
          icon: 'bx-show',
          to: '/icons',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Cards',
          icon: 'bx-credit-card',
          to: '/cards',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Tables',
          icon: 'bx-table',
          to: '/tables',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Form Layouts',
          icon: 'mdi-form-select',
          to: '/form-layouts',
        }"
      /> -->
    </template>

    <template #after-vertical-nav-items>
      <!-- 👉 illustration -->
      <a href="/profile" target="_self" rel="noopener noreferrer" style="margin-left: 7px;">

        <VCard class="ma-2" style="text-align: center;">
          <VCardItem class="pa-0 pt-4">
            <VAvatar class="cursor-pointer" color="primary" variant="tonal" size="x-large">
              <VImg :src="avatar1" />
            </VAvatar>
          </VCardItem>
          <VCardItem class="pa-2 username text-contract-text">
            <span>John Doe</span>
          </VCardItem>
          <VCardItem class="pa-0 pb-4 userid">
            <span>john@123.com</span>
          </VCardItem>
        </VCard>
      </a>
    </template>

    <!-- 👉 Pages -->
    <!-- Insert page content here -->
    <slot />

    <!-- 👉 Footer -->
    <!-- <template #footer> -->
    <!-- <Footer /> -->
    <!-- </template> -->
  </VerticalNavLayout>

  <!-- 👉 Home, Indoor, Outdoor Buttons -->
  <!-- <VBtn class="home-btn float-btn" icon="mdi-view-dashboard-outline" variant="outlined" elevation="12" @click="handleHomeBtnClick" ></VBtn>
  <VBtn class="indoor-btn float-btn" icon="material-symbols:aq-indoor" variant="outlined" elevation="12" @click="handleIndoorBtnClick" ></VBtn>
  <VBtn class="outdoor-btn float-btn" icon="icon-park-solid:outdoor" variant="outlined" elevation="12" @click="handleOutdoorBtnClick" ></VBtn> -->
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.float-btn {
  position: fixed;
  // background-color: #fff;

  /* // To keep upgrade to pro button on top of v-layout */
  z-index: 999;
  inset-inline-end: 1.5%;

  width: calc(var(--v-btn-height) + 26px);
  height: calc(var(--v-btn-height) + 26px);
  border-radius: 32px;

  /* .v-application &.v-btn.v-btn--elevated {
    box-shadow: 0 1px 20px 1px rgb(var(--v-theme-error)) !important;

    &:hover {
      box-shadow: none !important;
    }
  } */
}

.home-btn {
  inset-block-start: 37%;
}

.indoor-btn {
  inset-block-start: 50%;
}

.outdoor-btn {
  inset-block-start: 63%;
}

.time {
  font-size: 20px;
  font-family: 'Manrope', sans-serif;
}

.username{
  font-size: 16px;
  font-weight: 500;
}

.userid{
  font-size: 12px;
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Manrope&display=swap');
</style>
