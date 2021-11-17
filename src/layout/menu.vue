<template>
  <a-menu theme="light" mode="inline" :default-selected-keys="defaultSelectedKeys">
    <a-menu-item key="/table" @click="handleMenuClick">
      <a-icon type="table" />
      <span>列表配置</span>
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      defaultSelectedKeys: ['/table']
    }
  },
  methods: {
    handleMenuClick({ key }) {
      this.$route.path !== key && this.$router.push({ path: key })
    }
  }
};
</script>

<style lang="scss">

</style>
