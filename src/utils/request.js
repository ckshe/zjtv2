import fetch from 'dva/fetch';
import { notification } from 'antd';
import router from 'umi/router';
import { paramsForm } from '@/utils/paramsForm';
import hash from 'hash.js';
import { isAntdPro } from './utils';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '参数错误。',
  401: 'TOKEN错误或失效',
  403: '请求被拒绝',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器或数据库错误',
};
const serverMessage = {
  "SERVER_REJECT(Password Different)": "两次输入密码不相同",
  "SERVER_REJECT(Invalid VerifyCode)": "随机验证码错误或失效",
  "SERVER_REJECT(No Permission)": "没有权限",
  "SERVER REJECT(Type Not Allow)": "上传图片类型不允许",
  "SERVER_REJECT(Exceeded The Maximum)": "上传图片超过最大限制",
  "SERVER_REJECT(Not Exist User)": "用户不存在",
  "SERVER_REJECT(Password Not Match)": "密码不匹配",
  "SERVER_REJECT(Error Role)": "角色错误",
  "SERVER_REJECT(Empty Purview)": "暂无权限",
  "SERVER_REJECT(Empty Third Party Id)": "第三方id为空",
  "SERVER_REJECT(Error User)": "暂无此用户",
  "SERVER_REJECT(Error Balance Info)": "无此冲账记录",
  "SERVER_REJECT(Repeat Operation)": "重复操作",
  "SERVER_REJECT(Error Import Excel)": "导入excel错误",
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url,options) {
  var newOptions = { ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData 
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  const returnData = fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
  .catch(e => {
    const status = e.name;
    if (status === 401) {
      router.push('/user/login');
      return;
    }
    if (status === 403) {
      router.push('/exception/403');
      return;
    }
    if (status <= 504 && status >= 500) {
      notification.error({
        message: `请求异常`,
        description: codeMessage[status],
      });
      return;
    }
  });
  // 当状态200或者其他 后台返回其他状态码进行提示或跳转
  returnData.then(function (result){
    if(typeof(result)!='undefined'){
      if(typeof(result.status)!='undefined'){
        if(result.status === 400){
          notification.error({
            message: codeMessage[result.status]
          });
        }else if (result.status === 401) {
          router.push('/user/login');
          return;
        }else if(result.status === 403) {
          notification.error({
            message: codeMessage[result.status],
            description: serverMessage[result.message],
          });
        }else if(result.status === 500) {
          notification.error({
            message: codeMessage[result.status],
          });
        }
      }
    }else{
      notification.error({
        message: `服务器异常`,
        description: `接口格式异常，请联系开发人员。`,
      });
      return;
    }
  })
  return returnData;
}
