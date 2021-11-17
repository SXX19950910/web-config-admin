<template>
  <a-layout-header class="app-header-wrap" theme="light" style="padding: 0;background-color: white;">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="handleToggle" />
  </a-layout-header>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleToggle() {
      this.$emit('toggle')
    }
  }
};
</script>

<style lang="scss">
.app-header-wrap {
  .trigger {
    color: #001529;
    margin-left: 20px;
    &:hover {
      color: #3a8ee6;
    }
  }
}
</style>
