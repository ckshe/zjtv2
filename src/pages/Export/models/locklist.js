import { lockList,updateLockStatus } from '@/services/api';
function consumeListForm(params) {
  var buffer = { page_size: 10, page: 1 };
  typeof (params.page_size) != 'undefined' ? buffer.page_size = params.page_size : '';
  typeof (params.page) != 'undefined' ? buffer.page = params.page : '';
  typeof (params.source) != 'undefined' ? buffer.source = params.source : '';
  typeof (params.nickname) != 'undefined' ? buffer.nickname = params.nickname : '';
  typeof (params.date) != 'undefined' ? buffer.start_date = params.date[0].format('L') : '';
  typeof (params.date) != 'undefined' ? buffer.end_date = params.date[1].format('L') : '';
  return buffer;
}
export default {
  namespace: 'locklist',

  state: {
    data: {
      list: [],
      header: {},
      pagination: {
        page_size: 10,
        current: 1,
        total: 0
      },
    },
    review:'',
  },

  effects: {
    *getLockList({ payload }, { call, put }) {
      console.log("payload", payload)
      const buffer = consumeListForm(payload)
      const response = yield call(lockList, buffer);
      console.log(response)
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *updateLockStatus({ payload }, { call, put }) {
      const response = yield call(updateLockStatus, payload);
      console.log(response)
      if (response.status == 200) {
        yield put({
          type: 'save',
          payload: 'review',
        });
      }
    },
  },

  reducers: {
    save(state, action) {
    	if(action.payload=="review"){
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
