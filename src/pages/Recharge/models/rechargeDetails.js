import { getRechargeDetails,editRechargeDetails } from '@/services/api';
import router from 'umi/router';
import { message } from 'antd';

export default {
    namespace: 'reachargDetails',

    state: {
        data: {},
        operationkey:'detail'
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getRechargeDetails, payload);
            yield put({
                type: 'save',
                payload: response.data,
            });
        },
        *edit({ payload }, { call, put }) {
          const response = yield call(editRechargeDetails, payload);
          if(response.status == 200){
            message.success(response.message,1,function(){
                router.replace(`/recharge/record/order-details/details?id=${payload.id}`);
            });
          }else{
            message.error(response.message);
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

