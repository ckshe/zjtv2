import { getExpertDtail, updateLockStatus, expertUpdate} from '@/services/api';
import router from 'umi/router';
import { message } from 'antd';
export default {
  namespace: 'setexport',

  state: {
    data: {
    },
    review:'',
  },

  effects: {
    *getExpertDtail({ payload }, { call, put }) {
      console.log("payload====", payload)
      const response = yield call(getExpertDtail, payload);      yield put({
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
    *expertUpdate({ payload }, { call, put }) {
      console.log("updateState===========", payload)
      const response = yield call(expertUpdate, payload);
      console.log(response)
      if (response.status == "200") {
        message.success("专家设置成功", 2, () => {
          router.push({
            pathname: "/export/export-list"
          })
        })
      } else {
        message.error("专家设置失败", 2, () => {
        })
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
