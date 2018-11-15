import { applicationDetail,updateState,updateLockStatus } from '@/services/api';
import router from 'umi/router';
import { message } from 'antd';
export default {
  namespace: 'exportdetail',
  state: {
    data: {
      list: [],
      header: {},
    },
  },

  effects: {
    *getApplicationDetail({ payload }, { call, put }) {
   	console.log("payload",payload)
      const response = yield call(applicationDetail, payload);
      console.log(response)
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *exportUpdateState({ payload }, { call, put }) {
   	console.log("payload",payload)
      const response = yield call(updateState, payload);
      if (response.status == "200") {
        message.success("审核通过", 1, () => {
          router.push({
            pathname: "/export/application"
          })
        })
      } else {
        message.error("审核失败", 1, () => {
        })
      }
    },
    *updateLockStatus({ payload }, { call, put }) {
      const response = yield call(updateLockStatus, payload);
      console.log(response)
      if (response.status == "200") {
        message.success("封号成功", 1, () => {
          router.push({
            pathname: "/export/application"
          })
        })
      } else {
        message.error("封号失败", 1, () => {
        })
      }
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
