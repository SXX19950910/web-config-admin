<template>
  <a-modal class="config-dialog" title="快速配置" width="60%" :visible="visible" @cancel="handleCancel" :footer="null">
    <div class="content-area">
      <a-table :columns="columns" row-key="_id" :data-source="data" bordered :scroll="{ y: 400 }" :pagination="page" @change="onTableChange">
        <div slot="handle" slot-scope="text, record">
          <a-button type="link" icon="import" @click="handleApply(record)">应用</a-button>
        </div>
      </a-table>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'ConfigDialog',
  data() {
    return {
      visible: false,
      columns: [
        {
          title: '配置名称',
          key: 'tableKey',
          dataIndex: 'tableKey'
        },
        {
          title: '系统类型',
          key: 'systemName',
          dataIndex: 'systemName'
        },
        {
          title: '操作',
          key: 'handle',
          scopedSlots: { customRender: 'handle' }
        }
      ],
      page: {
        total: 0,
        pageSize: 20,
        current: 1,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: total => `共有 ${total} 条数据`
      },
      data: []
    }
  },
  created() {
    //
  },
  methods: {
    async queryList() {
      const params = {
        current: this.page.current - 1,
        pageSize: this.page.pageSize
      }
      const res = await this.$api.table.query(params)
      if (res && res.data.list) {
        this.data = res.data.list
        this.page.total = res.data.page.total
      }
    },
    async init() {
      await this.queryList()
      this.visible = true
    },
    onTableChange(data) {
      this.page.pageSize = data.pageSize
      this.page.current = data.current
      this.queryList()
    },
    handleApply(data) {
      const that = this
      this.$confirm({
        title: '确定要应用该列表配置吗？注意！此操作将会覆盖原有配置',
        content: '点击确定进行应用，或点击取消',
        cancelText: '取消',
        okText: '确定',
        onOk() {
          that.$emit('apply', that.$_.cloneDeep(data))
          that.handleCancel()
        }
      })
    },
    handleCancel() {
      this.visible = false
    }
  }
};
</script>

<style lang="scss">
.config-dialog {

}
</style>
