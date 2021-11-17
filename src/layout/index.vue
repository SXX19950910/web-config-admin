<template>
  <a-layout class="app-layout-wrap">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible theme="light">
      <div class="logo">{{ collapsed ? '' : '组件配置中心' }}</div>
      <menus />
    </a-layout-sider>
    <a-layout>
      <headers :collapsed="collapsed" @toggle="onHeaderToggle"/>
      <a-layout-content class="app-content">
        <el-scrollbar class="app-content-scroll">
          <slot />
        </el-scrollbar>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import menus from './menu'
import headers from './header'
export default {
  components: {
    menus,
    headers
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    onHeaderToggle() {
      this.collapsed = !this.collapsed
    }
  }
};
</script>
<style lang="scss">
.app-layout-wrap {
  height: 100vh;
  overflow: hidden;
  .logo {
    margin: 16px;
    color: #001529;
    font-size: 18px;
    text-align: center;
    padding: 10px 0;
  }
  .app-content {
    background-color: white;
    margin: 24px 16px;

    border-radius: 2px;
    //overflow: auto;
    .app-content-scroll {
      height: 100%;
      overflow: hidden;
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }
}
</style>
