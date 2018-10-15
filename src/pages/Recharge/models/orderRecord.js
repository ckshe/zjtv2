import { getRechargeDetails } from '@/services/api';

export default {
    namespace: 'orderRecord',

    state: {
        data: {},
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getRechargeDetails, payload);
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
