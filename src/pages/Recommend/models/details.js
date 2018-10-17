import { recommendDetails,setReason } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'recommendDetails',

  state: {
    data: {
    	game_info:{},
    	user_info:{},
    	view_user_list:[]
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
    *setReason({ payload }, { call, put }) {
   		console.log("撤销推介payload===========",payload)
      const response = yield call(setReason, payload);
      if(response.status == 200){
        message.success("撤销成功",1,function(){});
        console.log(response)
	    	yield put({
	    	  type: 'save',
	    	  payload: 'review',
	    	});
      }else{
        message.error(response.message);
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
