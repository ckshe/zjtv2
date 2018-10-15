import { recommendList } from '@/services/api';

export default {
  namespace: 'recommend',

  state: {
    data: {
      list: [],
      header:{},
      pagination: {},
    },
  },

  effects: {
    *recommendList({ payload }, { call, put }) {
      const response = yield call(recommendList, payload);
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
