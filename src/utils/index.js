// 异步加载页面组件
export const importPage = view => () =>
  import(
    /* webpackChunkName: "group-targe" */
    `../views/modules/${view}.vue`
  )