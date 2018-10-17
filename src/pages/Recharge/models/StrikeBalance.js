import { strikeBalanceList, strikeBalanceAdd,strikeBalanceReview } from '@/services/api';
import { router } from 'umi/router';
import { message } from 'antd';

function paramsListForm(params) {
  var buffer = { page_size: 10, page: 1 };
  typeof (params.page_size) != 'undefined' ? buffer.page_size = params.page_size : '';
  typeof (params.page) != 'undefined' ? buffer.page = params.page : '';
  typeof (params.key) != 'undefined' ? buffer.key = params.key : '';
  typeof (params.pay_type) != 'undefined' ? buffer.pay_type = params.pay_type : '';
  typeof (params.nickname) != 'undefined' ? buffer.nickname = params.nickname : '';
  typeof (params.recharge_id) != 'undefined' ? buffer.recharge_id = params.recharge_id : '';
  typeof (params.export) != 'undefined' ? buffer.export = params.export : '';
  typeof (params.date) != 'undefined' ? buffer.start_date = params.date[0].format('L') : '';
  typeof (params.date) != 'undefined' ? buffer.end_date = params.date[1].format('L') : '';
  return buffer;
}

export default {
  namespace: 'strikeBalance',

  state: {
    data: {
      list: [],
      header: {},
      pagination: {},
    },
    review:''
  },

  effects: {
    *list({ payload }, { call, put }) {
      const buffer = paramsListForm(payload)
      const response = yield call(strikeBalanceList, buffer);
      // 如果是导出Excel表格则不需要获取数据  直接在api那边下载Excel
      if (buffer.export != 1) {
        if (response.status == 200) {
          yield put({
            type: 'save',
            payload: response.data,
          });
        }
      }
    },
    *review({ payload }, { call,put }) {
      const response = yield call(strikeBalanceReview, payload);
      if (response.status == 200) {
        message.success(response.message,1);
        yield put({
          type: 'save',
          payload: 'review',
        });
      } else {
        message.error(response.message);
      }
    },
    *add({ payload }, { call }) {
      const response = yield call(strikeBalanceAdd, payload);
      if (response.status == 200) {
        message.success(response.message,1,function(){
          router.replace(`/recharge/strike-balance`)
        });
      } else {
        message.error(response.message);
      }
    }
  },

  reducers: {
    save(state, action) {
      if(action.payload == 'review'){
        return {
          ...state,
          review: action.payload,
        };
      }else{
        return {
          ...state,
          data: action.payload,
          review:''
        };
      }
    },
  },
};
