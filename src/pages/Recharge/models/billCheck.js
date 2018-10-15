import { rechargeList,iOSList } from '@/services/api';

export default {
    namespace: 'billCheck',

    state: {
        data: {
            list: [],
            header: {},
            pagination: {},
        },
    },

    effects: {
        *defaultList({ payload }, { call, put }) {
            const response = yield call(rechargeList, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *iOSList({ payload }, { call, put }) {
            console.log(payload)
            const response = yield call(iOSList, payload);
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
