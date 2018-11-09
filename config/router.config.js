export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      // { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    // authority: ['admin', 'user'],
    // Routes: ['src/pages/Authorized'],
    routes: [
      // recharge 充值管理
      {
        path: '/recharge',
        name: 'recharge',
        icon: 'dashboard',
        routes: [
          { path: '/', redirect: '/recharge/record' },
          // 充值记录
          {
            path: '/recharge/record',
            name: 'rechargerecord',
            component: './Recharge/Record',
          },
          // 查看详情
          {
            path: '/recharge/record/order-details',
            hideInMenu: true,
            name: 'orderdetails',
            component: './Recharge/OrderDetails/index',
            routes: [
              {
                path: '/recharge/record/order-details',
                redirect: '/recharge/record/order-details/details',
              },
              {
                path: '/recharge/record/order-details/details',
                name: 'rechargeDetails',
                component: './Recharge/OrderDetails/details',
              },
              {
                path: '/recharge/record/order-details/edit',
                name: 'rechargeEdit',
                component: './Recharge/OrderDetails/edit',
              },
            ]
          },
          // 冲账列表
          {
            path: '/recharge/strike-balance',
            name: 'strikebalance',
            component: './Recharge/StrikeBalance',
          },
          // 冲账充值
          {
            path: '/recharge/strike-balance/recharge-from',
            hideInMenu: true,
            name: 'rechargeform',
            component: './Recharge/RechargeForm',
          },
          // 冲账审核
          {
            path: '/recharge/bill-check/index',
            name: 'billcheck',
            component: './Recharge/BillCheck/index',
            routes: [
              {
                path: '/recharge/bill-check/index',
                redirect: '/recharge/bill-check/index/details-list',
              },
              {
                // hideInMenu:true,
                path: '/recharge/bill-check/index/details-list',
                name: 'detailslist',
                component: './Recharge/BillCheck/DefaultList',
              },
              {
                // hideInMenu:true,
                path: '/recharge/bill-check/index/ios-list',
                name: 'ioslist',
                component: './Recharge/BillCheck/IosList',
              },
            ]
          },
          // 订单操作记录
          {
            path: '/recharge/order-record',
            name: 'orderrecord',
            component: './Recharge/OrderRecord',
          },
        ],
      },
      // diamond M钻管理
      {
        path: '/diamond',
        name: 'diamond',
        icon: 'red-envelope',
        routes: [
          {
            path: '/diamond/Account',
            name: 'account',
            component: './Diamond/Account',
          },
          {
            path: '/diamond/consume',
            name: 'consume',
            component: './Diamond/Consume',
          },
          {
            path: '/diamond/deduct-list',
            name: 'deductlist',
            component: './Diamond/DeductList',
          },
          {
            path: '/diamond/statistics',
            name: 'statistics',
            component: './Diamond/Statistics',
          },
        ],
      },
      // recommend 推介管理
      {
        path: '/recommend',
        name: 'recommend',
        icon: 'deployment-unit',
        routes: [
          {
            path: '/recommend/recommend-list',
            name: 'recommendlist',
            component: './Recommend/RecomList',
          },
          // 查看详情
          {
            path: '/recommend/recommend-list/list-details',
            hideInMenu: true,
            name: 'recommenddetails',
            component: './Recommend/Details',
          },
          {
            path: '/recommend/cancel-list',
            name: 'cancellist',
            component: './Recommend/CancelList',
          },
          {
            path: '/recommend/push-config',
            name: 'pushconfig',
            component: './Recommend/PushConfig',
          },
        ],
      },
      // recommend 专家管理
      {
        path: '/export',
        name: 'export',
        icon: 'user',
        routes: [
          //专家列表
          {
            path: '/export/export-list',
            name: 'exportList',
            component: './Export/ExportList',
          },
          // 专家设置
          {
            path: '/export/export-list/export-update',
            hideInMenu: true,
            name: 'exportUpdate',
            component: './Export/SetExport',
          },
          // 添加专家
          {
            path: '/export/export-list/export-add',
            hideInMenu: true,
            name: 'exportAdd',
            component: './Export/ExportAdd',
          },
          //专家申请审核列表
          {
            path: '/export/application-list',
            name: 'applicationList',
            component: './Export/ApplicationList',
          },
          // 专家审核查看详情
          {
            path: '/export/application-list/application-detail',
            hideInMenu: true,
            name: 'applicationDetail',
            component: './Export/ApplicationDetail',
          },
          //专家统计
          {
            path: '/export/statistics-list',
            name: 'statisticsList',
            component: './Export/StatisticsList',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        hideInMenu: true,
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
