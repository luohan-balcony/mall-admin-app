<template>
  <div class="home">
    <LeftMenu :key="key"/>
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed}">
     <SlideNav />
     <router-view></router-view>
    </div>
  </div>
</template>
<script>
import LeftMenu from './components/Menu.vue';
import SlideNav from './components/SlideNav.vue';

export default {
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  components: {
    LeftMenu,
    SlideNav,
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
};
</script>
<style lang="less">
@import url("~@/assets/css/home.less");
</style>
