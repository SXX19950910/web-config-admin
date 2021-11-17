<template>
  <a-modal class="row-dialog" width="60%" title="复制列" :visible.sync="visible" :footer="null" @cancel="handleCancel">
    <div class="content-area">
      <a-form-model label-align="left" layout="inline">
        <a-form-item label="列名称">
          <a-input v-model="form.name" placeholder="请输入关键字查询" allowClear></a-input>
        </a-form-item>
        <a-form-item label="系统类型">
          <a-select v-model="form.systemId" class="w-174p" placeholder="请选择" allowClear>
            <a-select-option v-for="item in systemOptions" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSearch">查询</a-button>
        </a-form-item>
      </a-form-model>
      <div class="table-box mt-20">
        <a-table :columns="columns" :data-source="data" row-key="id" bordered :scroll="{ y: 400 }" :pagination="page" @change="onTableChange">
          <div slot="handle" slot-scope="text, record">
            <a-button class="ml-0" type="link" icon="copy" @click="handleCopy(record)">复制</a-button>
          </div>
        </a-table>
      </div>
    </div>
  </a-modal>
</template>

<script>
import config from '../../../config';
export default {
  name: 'RowDialog',
  data() {
    return {
      visible: false,
      data: [],
      systemOptions: config.systemOptions,
      form: {
        systemId: '',
        name: ''
      },
      page: {
        total: 0,
        pageSize: 1,
        current: 1,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: total => `共有 ${total} 条数据`
      },
      columns: [
        {
          title: '列名称',
          key: 'label',
          dataIndex: 'label'
        },
        {
          title: '系统类型',
          key: 'systemName',
          dataIndex: 'systemName'
        },
        {
          title: '所属列表',
          key: 'tableKey',
          dataIndex: 'tableKey'
        },
        {
          title: '操作',
          key: 'handle',
          dataIndex: 'handle',
          scopedSlots: { customRender: 'handle' }
        }
      ]
    }
  },
  created() {
  },
  methods: {
    async init() {
      await this.getRowList()
      this.visible = true
    },
    resetPage() {
      this.page.current = 1
    },
    handleSearch() {
      this.resetPage()
      this.getRowList()
    },
    onTableChange(data) {
      this.page.pageSize = data.pageSize
      this.page.current = data.current
      this.getRowList()
    },
    async getRowList() {
      const { systemId = '', name } = this.form
      const { pageSize, current } = this.page
      const params = {
        systemId,
        name,
        pageSize,
        current
      }
      const res = await this.$api.table.queryColumn(params)
      if (res && res.data.list) {
        this.data = res.data.list
        this.page.total = res.data.page.total
      }
    },
    handleSubmit() {
      this.visible = false
    },
    handleCopy(data) {
      this.$emit('copy', this.$_.cloneDeep(data))
      this.handleCancel()
    },
    handleCancel() {
      this.visible = false
    }
  }
};
</script>

<style lang="scss">
.row-dialog {
  .table-box {
  }
}
</style>
