import { statisticsList } from '@/services/api';
export default {
  namespace: 'statisticslist',

  state: {
    data: {
      list: [],
      header: {},
    },
  },

  effects: {
    *getStatisticsList({ payload }, { call, put }) {
      console.log("payload", payload)
      const response = yield call(statisticsList, payload);
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
      }
  },
};
