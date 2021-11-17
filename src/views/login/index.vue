<template>
  <div class="login-wrap"></div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const isDev = process.env.NODE_ENV === 'development'
      const url = isDev ? 'http://10.0.11.194:8086/config/table' : 'http://jk.www.huishoubao.com/config/table'
      window.open('http://api-amc.huishoubao.com.cn/login?system_id=44&jump_url=' + url, '_self')
    }
  }
};
</script>

<style scoped>

</style>
