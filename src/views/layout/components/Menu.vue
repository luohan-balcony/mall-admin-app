<template>
  <div class="menu-list">
      <a-menu
        :default-selected-keys="[defaultSelectkey]"
        :default-open-keys="[defaultOpenkey]"
        mode="inline"
        theme="dark"
        :inline-collapsed="$store.state.collapsed">
        <template v-for="route in $store.state.menuRoutes">
           <a-sub-menu v-if="!route.meta.hidden" :key="route.name">
          <span slot="title" v-if="!route.meta.hidden">
            <a-icon :type="route.meta.icon" /><span>{{route.meta.title}}</span></span>
          <template v-for="child in route.children">
            <a-menu-item v-if="!child.meta.hidden" :key="child.name">
            <router-link :to="{name: child.name}">
              <a-icon :type="child.meta.icon" />{{child.meta.title}}</router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
        </template>
      </a-menu>
    </div>
</template>

<script>
export default {
  computed: {
    defaultSelectkey: {
      get() {
        return this.$router.currentRoute.matched[0].name
          ? this.$router.currentRoute.matched[0].name : '';
      },
    },
    defaultOpenkey: {
      get() {
        return this.$router.currentRoute.matched[0].name;
      },
    },
  },
};
</script>

<style>

</style>
