<template>
  <div id="app">
    <router-view v-if="nonLayout"></router-view>
    <layout v-else>
      <router-view />
    </layout>
  </div>
</template>

<script>
import layout from './layout/index'
export default {
  components: {
    layout
  },
  computed: {
    nonLayout() {
      return ['/login'].includes(this.$route.path)
    }
  }
}
</script>
<style lang="scss">
@import './styles/init';
@import './styles/utils';
@import './styles/reset';
</style>
