import { accountList } from '@/services/api';

export default {
  namespace: 'diamond',

  state: {
    data: {
      list: [],
      header: {},
      pagination: {
        "current": 1,
        "page_size": 10,
        "total": 0
      },
    },
  },

  effects: {
    *accountList({ payload }, { call, put }) {
      const response = yield call(accountList, payload);
      console.log(response)
      yield put({
        type: 'save',
        payload: response,
      });
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
