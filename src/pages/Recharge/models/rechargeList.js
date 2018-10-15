import { rechargeList } from '@/services/api';

function paramsListForm(params) {
  var buffer = { page_size: 10, page: 1 };
  typeof (params.page_size) != 'undefined' ? buffer.page_size = params.page_size : '';
  typeof (params.page) != 'undefined' ? buffer.page = params.page : '';
  typeof (params.key) != 'undefined' ? buffer.key = params.key : '';
  typeof (params.shoplist_id) != 'undefined' ? buffer.shoplist_id = params.shoplist_id : '';
  typeof (params.is_first) != 'undefined' ? buffer.is_first = params.is_first : '';
  typeof (params.status) != 'undefined' ? buffer.status = params.status : '';
  typeof (params.is_test) != 'undefined' ? buffer.is_test = params.is_test : '';
  typeof (params.plat) != 'undefined' ? buffer.plat = params.plat : '';
  typeof (params.export) != 'undefined' ? buffer.export = params.export : '';
  typeof (params.date) != 'undefined' ? buffer.start_date = params.date[0].format('L') : '';
  typeof (params.date) != 'undefined' ? buffer.end_date = params.date[1].format('L') : '';
  return buffer;
}

export default {
  namespace: 'rechargeList',

  state: {
    data: {
      list: [],
      header: {},
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const buffer = paramsListForm(payload)
      const response = yield call(rechargeList, buffer);
      // 如果是导出Excel表格则不需要获取数据  直接在api那边下载Excel
      if (buffer.export != 1) {
        if(response.status == 200){
          yield put({
            type: 'save',
            payload: response.data,
          });
        }
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
