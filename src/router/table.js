export default [
  {
    name: 'Table',
    path: '/table',
    component: () => import('../views/table/index.vue'),
    meta: {
      title: 'Table-配置列表'
    }
  },
  {
    name: 'TableEdit',
    path: '/table/edit',
    component: () => import('../views/table/edit.vue'),
    meta: {
      title: '修改列表配置'
    }
  }
]
