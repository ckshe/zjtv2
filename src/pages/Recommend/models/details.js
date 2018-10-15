import { recommendDetails } from '@/services/api';

export default {
  namespace: 'recommendDetails',

  state: {
    data: {
    	game_info:{},
    	user_info:{},
    	view_user_list:{}
    },
  },

  effects: {
    *getReDetail({ payload }, { call, put }) {
   		console.log(payload)
      const response = yield call(recommendDetails, payload);
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
