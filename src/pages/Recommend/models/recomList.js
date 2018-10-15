import { recommendList } from '@/services/api';

export default {
  namespace: 'recommendlist',

  state: {
    data: {
      list: [],
      header: {},
      pagination: {
      },
    },
  },

  effects: {
    *getRelist({ payload }, { call, put }) {
   	console.log("payload",payload)
      const response = yield call(recommendList, payload);
      console.log(response)
      yield put({
        type: 'save',
        payload: response.data,
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
