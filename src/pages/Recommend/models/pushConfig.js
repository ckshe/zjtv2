import { pushConfig, updatePushConfig } from '@/services/api';

export default {
  namespace: 'pushConfigModel',

  state: {
      list: [],
      pagination: {},
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
      if(response.status == 200){
        const resData = yield call(pushConfig);
        console.log("resData===",resData)
        yield put({
          type: 'save',
          payload: resData,
        });
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
