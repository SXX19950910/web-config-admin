<template>
  <a-modal class="column-edit-dialog" title="列配置" :visible="visible" width="80%" @cancel="handleCancel">
    <a-form-model ref="form" :model="form" :rules="rules" size="small" label-align="left" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
      <a-form-model-item label="列className" prop="className">
        <a-input v-model="form.className" placeholder="class名称"></a-input>
      </a-form-model-item>
      <a-alert class="tip" message="对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮" banner></a-alert>
      <a-form-model-item label="类型" prop="type">
        <a-radio-group v-model="form.type">
          <a-radio value="default">默认</a-radio>
          <a-radio value="index">索引</a-radio>
          <a-radio value="expand">展开按钮</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="显示字段">
        <a-switch v-model="form.visible" :disabled="form.isDefault"></a-switch>
      </a-form-model-item>
      <a-alert class="tip" message="是否为默认字段，默认字段不可取消显示" banner></a-alert>
      <a-form-model-item label="默认字段">
        <a-switch v-model="form.isDefault" @change="onDefaultChange"></a-switch>
      </a-form-model-item>
      <a-form-model-item label="标题(label)" prop="label">
        <a-input v-model="form.label" placeholder="显示标题"></a-input>
      </a-form-model-item>
      <a-alert class="tip" message="对应列内容的字段名，也可以使用 property 属性" banner></a-alert>
      <a-form-model-item label="属性名(prop)" prop="prop">
        <a-input v-model="form.prop" placeholder="数据对象的属性名称"></a-input>
      </a-form-model-item>
      <a-form-model-item label="列宽(width)" prop="width">
        <a-input v-model="form.width" placeholder="列宽度"></a-input>
      </a-form-model-item>
      <a-alert class="tip" message="对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列" banner></a-alert>
      <a-form-model-item label="最小宽度" prop="minWidth">
        <a-input v-model="form.minWidth" placeholder="最小宽度"></a-input>
      </a-form-model-item>
      <a-alert class="tip" message="列是否固定在左侧或者右侧，true 表示固定在左侧" banner></a-alert>
      <a-form-model-item label="固定列" prop="fixed">
        <a-radio-group v-model="form.fixed">
          <a-radio value="none">不固定</a-radio>
          <a-radio value="left">左侧</a-radio>
          <a-radio value="right">右侧</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="对齐方式" prop="align">
        <a-radio-group v-model="form.align">
          <a-radio value="left">左</a-radio>
          <a-radio value="center">中</a-radio>
          <a-radio value="right">右</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="溢出显示" prop="showOverflowTooltip">
        <a-switch v-model="form.showOverflowTooltip"></a-switch>
      </a-form-model-item>
      <a-alert class="tip" message="对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）" banner></a-alert>
      <a-form-model-item label="可拖拽宽度" prop="resizable">
        <a-switch v-model="form.resizable"></a-switch>
      </a-form-model-item>
      <a-alert class="tip" message="column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件" banner></a-alert>
      <a-form-model-item label="列key" prop="columnKey">
        <a-input v-model="form.columnKey" placeholder="列key"></a-input>
      </a-form-model-item>
      <a-alert class="tip" message="自定义渲染，使用jsx语法返回一个render函数，为空则使用默认渲染方式" banner></a-alert>
      <a-form-model-item label="自定义列标题" prop="headerJsx">
        <vue-monaco-cdn class="editor" v-model="form.headerJsx" :url="editorUrl" language="javascript" theme="vs-dark" />
      </a-form-model-item>
      <a-form-model-item v-if="form.type === 'expand'" label="自定义展开列" prop="expandJsx">
        <vue-monaco-cdn class="editor" v-model="form.expandJsx" :url="editorUrl" language="javascript" theme="vs-dark" />
      </a-form-model-item>
      <a-form-model-item v-else label="自定义列" prop="contentJsx">
        <vue-monaco-cdn class="editor" v-model="form.contentJsx" :url="editorUrl" language="javascript" theme="vs-dark" />
      </a-form-model-item>
    </a-form-model>
    <div slot="footer" class="dialog-footer">
      <a-button type="primary" @click="handleSubmit">确认</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </div>
  </a-modal>
</template>

<script>
import VueMonacoCdn from 'vue-monaco-cdn'
import { v4 as uuidv4 } from 'uuid';
import _ from 'loadsh/lang'
export default {
  components: {
    VueMonacoCdn
  },
  data() {
    return {
      visible: false,
      headerJsxVisible: false,
      editorUrl: 'https://unpkg.com/monaco-editor@0.20.0/min',
      form: {
        uid: '',
        type: 'default',
        columnKey: '',
        align: '',
        prop: '',
        label: '',
        minWidth: '',
        width: '',
        fixed: 'none',
        headerJsx: '',
        contentJsx: '',
        expandJsx: '',
        renderContent: '',
        renderHeader: '',
        renderExpand: '',
        showOverflowTooltip: false,
        resizable: true,
        className: '',
        sortIndex: 0,
        visible: true,
        systemName: '',
        systemId: '',
        tableKey: '',
        isDefault: false
      },
      rules: {
        label: [
          { required: true, message: '请输入列标题', trigger: 'change' }
        ],
        prop: [
          { required: true, message: '请输入属性名', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    init(column) {
      this.visible = true
      this.$nextTick(() => {
        this.form.uid = uuidv4()
        this.$refs.form.resetFields()
        column && this.initColumn(column)
      })
    },
    initColumn(row) {
      for (const key in row) {
        if (Object.prototype.hasOwnProperty.call(row, key)) {
          this.form[key] = row[key]
        }
      }
    },
    validator() {
      return new Promise((resolve) => {
        this.$refs.form.validate(valid => {
          !valid && this.$message.error('列配置校验失败，请修改后重新提交！')
          resolve(valid)
        })
      })
    },
    async handleSubmit() {
      const valid = await this.validator()
      if (valid) {
        this.$emit('submit', _.cloneDeep(this.form))
        this.handleCancel()
      }
    },
    handleCancel() {
      this.visible = false
    },
    onDefaultChange(checked) {
      if (checked) {
        this.form.visible = true
      }
    }
  }
}
</script>

<style lang="scss">
.column-edit-dialog {
  .editor {
    width: 100%;
    height: 300px;
  }
  .tip {
    margin-bottom: 20px;
  }
}
</style>
