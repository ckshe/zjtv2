import { stringify } from 'qs';
import request from '@/utils/request';
import host from '@/utils/host';
import { paramsForm } from '@/utils/paramsForm';

function addMode(params) {
  const mode = {
    mode: 'backstage'
  }
  return { ...params, ...mode }
}

// TODO addMode(params)添加公共参数 POST需要转formData GET不用
// 用户登录
export async function login(params) {
  const formData = paramsForm(addMode(params))
  return request(`${host()}/user/login`, {
    method: 'POST',
    body: formData,
  });
}
// 用户注销
export async function logoutLogin(params) {
  const formData = paramsForm(addMode(params))
  return request(`${host()}/user/logout`, {
    method: 'POST',
    body: formData,
  });
}
// 获取充值记录列表
export async function rechargeList(params) {
  const data = addMode(params)
  if (data.export == 1) {
    console.log(`${host()}/strikeBalance/list?${stringify(data)}`)
    window.location.href = `${host()}/recharge/list?${stringify(data)}`
  } else {
    return request(`${host()}/recharge/list?${stringify(data)}`);
  }
}
// 获取充值记录详情
export async function getRechargeDetails(params) {
  const data = addMode(params)
  return request(`${host()}/recharge/detail?${stringify(data)}`);
}
// 充值记录编辑
export async function editRechargeDetails(params) {
  const formData = paramsForm(addMode(params))
  return request(`${host()}/recharge/update`, {
    method: 'POST',
    body: formData,
  });
}
// 获取冲账列表
export async function strikeBalanceList(params) {
  const data = addMode(params)
  if (data.export == 1) {
    window.location.href = `${host()}/strikeBalance/list?${stringify(data)}`
  } else {
    return request(`${host()}/strikeBalance/list?${stringify(data)}`);
  }
}
// 添加冲账记录
export async function strikeBalanceAdd(params) {
  const formData = paramsForm(addMode(params))
  return request(`${host()}/strikeBalance/add`, {
    method: 'POST',
    body: formData,
  });
}
// 冲账审核
export async function strikeBalanceReview(params) {
  const formData = paramsForm(addMode(params))
  return request(`${host()}/strikeBalance/review`, {
    method: 'POST',
    body: formData,
  });
}
// 账单核对列表
export async function billCheckList(params) {
  const formData = paramsForm(addMode(params))
  return request(`${host()}/order/billCheckList`, {
    method: 'POST',
    body: formData,
  });
}
// iOS账单核对
export async function iOSList(params) {
  const formData = paramsForm(addMode(params))
  return request(`${host()}/order/billAppStoreCheckList`, {
    method: 'POST',
    body: formData,
  });
}
// 订单操作记录
export async function OrderOperationLog(params) {
  const data = addMode(params)
  if (data.export == 1) {
    window.location.href = `${host()}/orderOperationLog/list?${stringify(data)}`
  } else {
    return request(`${host()}/orderOperationLog/list?${stringify(data)}`);
  }
}
// M钻流水
export async function accountList(params) {
  const data = addMode(params)
  if (data.export == 1) {
    window.location.href = `${host()}/score/diamondAccountList?${stringify(data)}`
  } else {
    return request(`${host()}/score/diamondAccountList?${stringify(data)}`);
  }
}
// M钻消费
export async function consumeList(params) {
  const data = addMode(params)
  if (data.export == 1) {
    console.log(`${host()}/score/diamondConsumeByRecommend?${stringify(data)}`)
    window.location.href = `${host()}/score/diamondConsumeByRecommend?${stringify(data)}`
  } else {
    return request(`${host()}/score/diamondConsumeByRecommend?${stringify(data)}`);
  }
}
// 专家扣钻记录
export async function deductList(params) {
  const data = addMode(params)
  if (data.export == 1) {
    window.location.href = `${host()}/score/diamondDeductList?${stringify(data)}`
  } else {
    return request(`${host()}/score/diamondDeductList?${stringify(data)}`);
  }
}
// 收益统计
export async function incomeStatistics(params) {
  const data = addMode(params)
  if (data.export == 1) {
    window.location.href = `${host()}/score/incomeStatistics?${stringify(data)}`
  } else {
    return request(`${host()}/score/incomeStatistics?${stringify(data)}`);
  }
}

// 推介列表
export async function recommendList(params) {
  const data = addMode(params)
  return request(`${host()}/recommend/list?${stringify(data)}`);
}
// 推介详情
export async function recommendDetails(params) {
   const data = addMode(params)
   return request(`${host()}/recommend/detail?${stringify(data)}`);
 }
 //更改推介内容
 export async function updateContent(params) {
     console.log("updateContent",params)
   const formData = paramsForm(addMode(params))
   console.log("updateContent",formData)
   return request(`${host()}/recommend/updateContent`, {
     method: 'POST',
     body: formData,
   });
 }
 //撤销推介
 export async function setReason(params) {
     console.log("setReason",params)
   const formData = paramsForm(addMode(params))
   console.log("setReason",formData)
   return request(`${host()}/recommend/cancel`, {
     method: 'POST',
     body: formData,
   });
 }
 // 撤销推介记录列表
 export async function cancelList(params) {
   const data = addMode(params)
   return request(`${host()}/recommend/cancelList?${stringify(data)}`);
 }
 //推送配置
 export async function pushConfig(params) {
  const data = addMode(params)
  return request(`${host()}/recommend/pushConfig?${stringify(data)}`);
}

 //更新推送配置
 export async function updatePushConfig(params) {
     console.log("updatePushConfig",params)
   const formData = paramsForm(addMode(params))
   console.log("updatePushConfig",formData)
   return request(`${host()}/recommend/updatePushConfig`, {
     method: 'POST',
     body: formData,
   })
 }
// export async function removeFakeList(params) {
//   const { count = 5, ...restParams } = params;
//   return request(`/api/fake_list?count=${count}`, {
//     method: 'POST',
//     body: {
//       ...restParams,
//       method: 'delete',
//     },
//   });
// }

// export async function addFakeList(params) {
//   const { count = 5, ...restParams } = params;
//   return request(`/api/fake_list?count=${count}`, {
//     method: 'POST',
//     body: {
//       ...restParams,
//       method: 'post',
//     },
//   });
// }

// export async function updateFakeList(params) {
//   const { count = 5, ...restParams } = params;
//   return request(`/api/fake_list?count=${count}`, {
//     method: 'POST',
//     body: {
//       ...restParams,
//       method: 'update',
//     },
//   });
// }

