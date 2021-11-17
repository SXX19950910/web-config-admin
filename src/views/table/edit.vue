<template>
  <a-form-model ref="form" class="table-edit-wrap" size="small" :model="form" :rules="rules" label-align="left" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
    <a-alert class="tip" message="将该配置关联到对应系统上，只有该系统可以调用该配置数据" banner />
    <a-form-model-item label="系统类型" prop="systemId">
      <a-select v-model="form.systemId" placeholder="请选择系统类型">
        <a-select-option v-for="item in systemOptions" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-alert class="tip" message="列表关键key，调用组件时传入该字段，唯一" banner />
    <a-form-model-item label="列表关键key" prop="tableKey">
      <a-input v-model="form.tableKey" :disabled="isEdit" type="text" placeholder="列表关键key，必须是唯一的"></a-input>
    </a-form-model-item>
    <a-alert class="tip" message="接口配置，对应列表数据请求地址" banner />
    <a-form-model-item label="接口地址" prop="api">
      <a-input v-model="form.api" placeholder="例：/service/api"></a-input>
    </a-form-model-item>
    <a-form-model-item label="接口参数" prop="params">
      <a-input v-show="false" v-model="form.params"></a-input>
      <vue-monaco-cdn class="params-editor" v-model="form.params" url="https://unpkg.com/monaco-editor@0.20.0/min" language="json" theme="vs-dark" />
    </a-form-model-item>
    <a-alert class="tip" message="表格的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。" banner />
    <a-form-model-item label="高度">
      <a-input v-model="form.height" placeholder="列表高度"></a-input>
    </a-form-model-item>
    <a-alert class="tip" banner message="表格的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。"></a-alert>
    <a-form-model-item label="最大高度">
      <a-input v-model="form.maxHeight" placeholder="最大高度"></a-input>
    </a-form-model-item>
    <a-form-model-item label="斑马纹">
      <a-switch v-model="form.stripe"></a-switch>
    </a-form-model-item>
    <a-alert class="tip" message="表格行是否添加复选框" banner></a-alert>
    <a-form-model-item label="选择框">
      <a-switch v-model="form.selection"></a-switch>
    </a-form-model-item>
    <a-form-model-item label="边框">
      <a-switch v-model="form.border"></a-switch>
    </a-form-model-item>
    <a-form-model-item label="尺寸">
      <a-radio-group name="radioGroup" v-model="form.size">
        <a-radio value="medium">中</a-radio>
        <a-radio value="small">小</a-radio>
        <a-radio value="mini">迷你</a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="列宽自动撑开">
      <a-switch v-model="form.fit"></a-switch>
    </a-form-model-item>
    <a-form-model-item label="显示表头">
      <a-switch v-model="form.showHeader"></a-switch>
    </a-form-model-item>
    <a-form-model-item label="高亮当前行">
      <a-switch v-model="form.highlightCurrentRow"></a-switch>
    </a-form-model-item>
    <a-form-model-item label="当前行的key">
      <a-input class="w-174p" v-model="form.currentRowKey" placeholder="当前行的key"></a-input>
    </a-form-model-item>
    <a-alert class="tip" message="空数据时显示的文本内容，也可以通过 slot='empty' 设置" banner></a-alert>
    <a-form-model-item label="空文本">
      <a-input v-model="form.emptyText" placeholder="空文本"></a-input>
    </a-form-model-item>
    <a-form-model-item label="tool-tip主题">
      <a-radio-group name="radioGroup" v-model="form.tooltipEffect">
        <a-radio value="dark">暗黑</a-radio>
        <a-radio value="light">白昼</a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="表位合计">
      <a-switch v-model="form.showSummary"></a-switch>
    </a-form-model-item>
    <a-form-model-item label="表格列" prop="columns">
      <vuedraggable v-model="form.columns" :options="{ animation: 200 }" class="column-list">
        <div v-for="(item, index) in form.columns" :key="index" class="item">
          {{ item.label }} <i class="el-icon-edit ml-5 link" @click="handleEditRow(item)"></i><i
            class="el-icon-delete ml-5 link" @click="handleRemoveColumn(item, index)"></i>
        </div>
        <el-link class="mb-15" type="primary" icon="el-icon-plus" @click="handleShowColumn">添加列</el-link>
        <el-link class="mb-15 ml-15" type="danger" icon="el-icon-delete" @click="handleClearColumn">清空列</el-link>
      </vuedraggable>
    </a-form-model-item>
    <a-form-model-item label="分页器">
      <a-switch v-model="form.pagination.enable"></a-switch>
    </a-form-model-item>
    <template v-if="form.pagination.enable">
      <a-form-model-item label="当前页码">
        <a-tag color="orange">参数Key</a-tag>
        <a-input class="w-88p" v-model="form.pagination.currentKey" type="text" placeholder="请输入" />
        <a-tag class="ml-20" color="orange">默认值</a-tag>
        <a-input-number class="w-88p" v-model="form.pagination.current" :min="0" :max="10000" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="分页尺寸">
        <a-tag color="orange">参数Key</a-tag>
        <a-input class="w-88p" v-model="form.pagination.sizeKey" placeholder="请输入" />
        <a-tag class="ml-20" color="orange">默认值</a-tag>
        <a-select class="w-88p" v-model="form.pagination.sizeIndex" placeholder="请选择">
          <a-select-option v-for="(item, index) in form.pagination.sizeOptions" :key="index">{{ item }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="数据总量">
        <a-tag color="orange">参数Key</a-tag><a-input class="w-88p" v-model="form.pagination.totalKey" placeholder="请输入" />
      </a-form-model-item>
    </template>
    <div class="page-area" v-if="form.pagination.enable">
      <vuedraggable v-model="form.pagination.sizeOptions" :options="{ animation: 200 }" tag="span">
        <a-tag v-for="(tag, index) in form.pagination.sizeOptions" :key="index" :closable="true" @close="handleTagClose(tag)">{{ tag }}</a-tag>
      </vuedraggable>
      <a-input class="input-new-tag" v-if="tagVisible" v-model="tagValue" ref="saveTagInput" @keyup.enter.native="handleTagConfirm" @blur.stop="handleTagConfirm">
      </a-input>
      <a-button v-else class="button-new-tag" size="small" @click="handleShowTag">+ 页码</a-button>
    </div>
    <column-dialog ref="column" @submit="onColumnSubmit"/>
    <config-dialog ref="config" @apply="onApplyConfig" />
    <row-dialog ref="row" @copy="onRowCopy" />
    <div class="handle-area">
      <div>
        <a-button class="mr-15" type="primary" @click="handleShowRow">复制列</a-button>
        <a-button type="primary" @click="handleShowConfig">快速配置</a-button>
      </div>
      <a-button type="primary" @click="handleSubmit">提交保存</a-button>
    </div>
  </a-form-model>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import columnDialog from './components/ColumnDialog'
import rowDialog from './components/RowDialog'
import configDialog from './components/ConfigDialog'
import VueMonacoCdn from 'vue-monaco-cdn'
import vuedraggable from 'vuedraggable'
import Transform from './../../utils/transform.js'
import config from '../../config'
import _ from 'loadsh'

export default {
  components: {
    rowDialog,
    columnDialog,
    configDialog,
    VueMonacoCdn,
    vuedraggable
  },
  data() {
    return {
      isEdit: false,
      tagVisible: false,
      tagValue: '',
      editorVisible: false,
      systemOptions: config.systemOptions,
      KEY: 'dO19FqWQacDvV28S',
      form: {
        api: '',
        params: '{}',
        tableKey: '',
        systemName: '',
        systemId: '',
        height: '',
        maxHeight: '',
        stripe: false,
        border: false,
        size: '',
        selection: false,
        fit: true,
        showHeader: true,
        highlightCurrentRow: false,
        currentRowKey: '',
        emptyText: '',
        tooltipEffect: '',
        showSummary: false,
        pagination: {
          enable: true,
          size: 0,
          current: 0,
          sizeOptions: [],
          currentKey: 'current',
          sizeKey: 'size',
          totalKey: 'total',
          sizeIndex: 0
        },
        columns: []
      },
      rules: {
        systemId: [
          { required: true, message: '请选择关联系统', trigger: 'change' }
        ],
        tableKey: [
          { required: true, message: '请输入表格关键key', trigger: 'change' }
        ],
        columns: [
          { required: true, message: '请添加表格列' }
        ],
        api: [
          { required: true, message: '请输入列表数据请求地址', trigger: 'change' }
        ],
        params: [
          { required: true, message: '请输入接口请求参数', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    onRowCopy(data) {
      const current = this.form.columns.find(item => item.label === data.label)
      if (current) {
        this.$message.error(`${current.label}列发现重复，复制失败`)
      } else {
        this.form.columns.push(data)
        this.$message.success('复制成功')
      }
    },
    handleTagConfirm() {
      let value = this.tagValue
      if (value) {
        this.form.pagination.sizeOptions.push(parseFloat(value))
      }
      this.tagVisible = false
      this.tagValue = ''
    },
    handleShowTag() {
      this.tagVisible = true
      this.$nextTick(() => this.$refs.saveTagInput.focus())
    },
    handleTagClose(tag) {
      const findIndex = this.form.pagination.sizeOptions.findIndex(item => item === tag)
      this.form.pagination.sizeOptions.splice(findIndex, 1)
    },
    async getData() {
      const res = await this.$api.table.query({ tableKey: this.$route.query.tableKey })
      if (res && res.data.list.length > 0) {
        const data = res.data.list[0]
        const newData = _.merge(this.form, data)
        for (const key in newData) {
          if (Object.prototype.hasOwnProperty.call(data, key) && Object.prototype.hasOwnProperty.call(this.form, key)) {
            this.form[key] = newData[key]
          }
        }
      }
    },
    init() {
      const tableKey = this.$route.query.tableKey
      this.isEdit = tableKey !== undefined
      if (this.isEdit) {
        this.getData()
      } else {
        document.title = '新增列表配置'
      }
    },
    handleShowRow() {
      this.$refs.row.init()
    },
    handleShowConfig() {
      this.$refs.config.init()
    },
    onColumnSubmit(data) {
      const current = this.form.columns.findIndex(item => item.uid === data.uid)
      current >= 0 ? this.form.columns.splice(current, 1, data) : this.form.columns.push(data)
    },
    onApplyConfig(data) {
      const filterKeys = ['tableKey', '_id', '_v']
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) && Object.prototype.hasOwnProperty.call(this.form, key) && !filterKeys.includes(key)) {
          this.form[key] = data[key]
        }
      }
      this.form.columns.map(item => item.uid = uuidv4())
    },
    validator() {
      return new Promise((resolve) => {
        this.$refs.form.validate(valid => {
          !valid && this.$message.error('表格配置校验失败，请修改后重新提交！')
          resolve(valid)
        })
      })
    },
    handleShowColumn() {
      this.$refs.column.init()
    },
    handleClearColumn() {
      const that = this
      const removeAll = async () => {
        const params = {
          id: that.form.columns.map(item => item.id)
        }
        await this.$api.table.removeColumn(params)
      }
      this.$confirm({
        title: '确定要清空所有列配置吗？',
        content: '点击确定进行删除，或点击取消',
        cancelText: '取消',
        okText: '确定',
        async onOk() {
          await removeAll()
          that.form.columns = []
          that.$message.success('表格列清空成功！')
        }
      })
    },
    handleEditRow(row) {
      this.$refs.column.init(row)
    },
    handleRemoveColumn(item, index) {
      const that = this
      const remove = async () => {
        const params = {
          id: [item.id]
        }
        await this.$api.table.removeColumn(params)
        this.$message.success('列删除成功！')
      }
      this.$confirm({
        title: '确定要删除该列表字段吗？',
        content: '点击确定进行删除，或点击取消',
        cancelText: '取消',
        okText: '确定',
        async onOk() {
          await remove()
          that.form.columns.splice(index, 1)
        }
      })
    },
    async save() {
      const data = this.form
      data.columns.forEach((item, index) => {
        item.renderHeader = new Transform({value: item.headerJsx}).toRender();
        item.renderContent = new Transform({value: item.contentJsx}).toRender();
        item.renderExpand = new Transform({value: item.expandJsx}).toRender()
        item.sortIndex = index
      })
      const params = {...data}
      params.pagination.size = params.pagination.sizeOptions[params.pagination.sizeIndex] || 0
      params.systemName = this.systemOptions.find(item => item.id === params.systemId).name
      const res = await this.$api.table.save(params)
      if (res) {
        this.$message.success('添加成功')
        this.$router.back()
      }
    },
    async update() {
      // AES.encrypt(value, this.KEY).toString();
      const data = this.form
      data.columns.forEach((item, index) => {
        item.renderHeader = new Transform({value: item.headerJsx}).toRender();
        item.renderContent = new Transform({value: item.contentJsx}).toRender()
        item.renderExpand = new Transform({value: item.expandJsx}).toRender()
        item.sortIndex = index
      })
      const params = {...data}
      params.pagination.size = params.pagination.sizeOptions[params.pagination.sizeIndex] || 0
      params.systemName = this.systemOptions.find(item => item.id === params.systemId).name
      await this.$api.table.update(params)
      this.$message.success('更新成功')
      this.init()
    },
    async handleSubmit() {
      const valid = await this.validator()
      if (!valid) {
        return
      }
      this.isEdit ? await this.update() : await this.save()
    }
  }
}
</script>

<style lang="scss">
.table-edit-wrap {
  position: relative;
  height: 100%;
  padding: 20px 20px 80px 20px;
  .handle-area {
    position: fixed;
    bottom: 24px;
    left: 216px;
    width: calc(100% - 234px);
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-top: 1px solid #DCDFE6;
  }

  .params-editor {
    height: 100px;
    border-radius: 4px;
    overflow: hidden;
  }

  .tip {
    margin-bottom: 20px;
    width: fit-content;

    .el-alert__description {
      margin: 0;
    }
  }
  .page-area {
    .ant-tag {
      cursor: move;
    }
    .input-new-tag {
      width: 66px;
    }
  }
  .column-list {
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    align-items: center;

    .item {
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
      border: 1px solid #dedede;
      color: #666666;
      border-radius: 4px;
      margin-right: 15px;
      margin-bottom: 15px;
      font-size: 14px;
      cursor: move;
      &:hover {
        border-color: #409EFF;
        color: #409EFF;
      }
    }
  }
}
</style>
