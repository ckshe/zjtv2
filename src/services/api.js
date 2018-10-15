import { stringify } from 'qs';
import request from '@/utils/request';
import host from '@/utils/host';
import { paramsForm } from '@/utils/paramsForm';

function addMode (params){
  const mode = {
    mode:'backstage'
  }
  return {...params,...mode}
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
// iOS账单核对
export async function iOSList(params) {
  return request(`/order/billAppStoreCheckList?${stringify(params)}`);
}
// 订单操作记录
export async function orderRecord(params) {
  return request(`/orderOperationLog/list?${stringify(params)}`);
}
// M钻流水
export async function accountList(params) {
  return request(`/score/diamondAccountList?${stringify(params)}`);
}

// 推介列表
export async function recommendList(params) {
  const data = addMode(params)
  return request(`${host()}/recommend/list?${stringify(data)}`);
}
// 推介详情
export async function recommendDetails(params) {
  return request(`/recommend/detail?${stringify(params)}`);
}
//更新推送配置
export async function updatePushConfig(params) {
  const data = addMode(params)
  return request(`${host()}/recommend/updatePushConfig?${stringify(data)}`);
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

