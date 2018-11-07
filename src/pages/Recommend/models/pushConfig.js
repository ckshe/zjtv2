import { pushConfig, updatePushConfig } from '@/services/api';

export default {
  namespace: 'pushConfigModel',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *pushConfigList({ payload }, { call, put }) {
      const response = yield call(pushConfig, payload);
      console.log("response",response)
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *updatePushConfig({ payload }, { call, put }) {
      const response = yield call(updatePushConfig, payload);
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
