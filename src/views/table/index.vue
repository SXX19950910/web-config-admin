<template>
  <div class="table-index-wrap">
    <div class="handle-area">
      <a-form-model class="left-form" label-align="left" layout="inline">
        <a-form-item label="系统类型">
          <a-select class="w-174p" v-model="form.systemId" placeholder="系统类型">
            <a-select-option v-for="item in systemOptions" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="列表关键字">
          <a-input v-model="form.tableKey" placeholder="列表关键字"></a-input>
        </a-form-item>
      </a-form-model>
      <div class="right-handle f-a-c">
        <a-button class="mr-15" type="primary" @click="handleSearch">查询</a-button>
        <a-button type="primary" @click="handleGoAdd">新增列表</a-button>
      </div>
    </div>
    <fetch-table ref="table" class="mt-30" table-key="配置列表" config-base-url="http://127.0.0.1:6002/configApi" :request-options="requestOptions"></fetch-table>
  </div>
</template>

<script>
import config from '../../config';
export default {
  components: {
  },
  data() {
    return {
      data: [],
      form: {
        systemId: '',
        tableKey: ''
      },
      systemOptions: config.systemOptions,
      requestOptions: {
        baseURL: process.env.VUE_APP_DEV_URL,
        data: {
          pageSize: 100
        }
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleGoAdd() {
      this.$router.push({ name: 'TableEdit' })
    },
    handleSearch() {
      this.$refs.table.getData()
    },
    handleGoEdit(data) {
      this.$router.push({ name: 'TableEdit', query: { tableKey: data.tableKey }})
    },
    handleRemoveItem(data) {
      const submit = async () => {
        const res = await this.$api.table.remove({ id: data.id })
        if (res && res.data) {
          this.$message.success('删除成功')
          await this.$refs.table.init()
        }
      }
      this.$confirm({
        title: '此操作将永久删除该列表数据, 是否继续?',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          submit()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.table-index-wrap {
  padding: 20px;
  .handle-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .left-form {
      width: 100%;
    }
    .right-handle {

    }
  }
}
</style>
