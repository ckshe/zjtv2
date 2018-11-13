import { getExpertDtail } from '@/services/api';
export default {
  namespace: 'setexport',

  state: {
    data: {
    },
  },

  effects: {
    *getExpertDtail({ payload }, { call, put }) {
   	console.log("payload====",payload)
      const response = yield call(getExpertDtail, payload);
      console.log("response=========",response)
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *expertUpdate({ payload }, { call, put }) {
   	console.log("payload",payload)
      const response = yield call(expertUpdate, payload);
      console.log(response)
      yield put({
        type: 'save',
      });
    },
  },

  reducers: {
    save(state, action) {
    	if(action.payload=="review"){
    		return {
    		  ...state,
    		};
    	}else{
    		return {
    		  ...state,
    		  data: action.payload,
    		};
    		
    	}
    },
  },
};
