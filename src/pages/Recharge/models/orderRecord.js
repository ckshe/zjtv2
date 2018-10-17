import { OrderOperationLog } from '@/services/api';

function paramsListForm(params) {
    var buffer = { page_size: 10, page: 1 };
    typeof (params.page_size) != 'undefined' ? buffer.page_size = params.page_size : '';
    typeof (params.page) != 'undefined' ? buffer.page = params.page : '';
    typeof (params.operator) != 'undefined' ? buffer.operator = params.operator : '';
    typeof (params.type) != 'undefined' ? buffer.type = params.type : '';
    typeof (params.export) != 'undefined' ? buffer.export = params.export : '';
    typeof (params.date) != 'undefined' ? buffer.start_date = params.date[0].format('L') : '';
    typeof (params.date) != 'undefined' ? buffer.end_date = params.date[1].format('L') : '';
    return buffer;
}

export default {
    namespace: 'orderOperationLog',

    state: {
        data: {
            list: [],
            header: {},
            pagination: {},
        },
    },

    effects: {
        *list({ payload }, { call, put }) {
            const buffer = paramsListForm(payload)
            console.log(buffer)
            const response = yield call(OrderOperationLog, buffer);
            // 如果是导出Excel表格则不需要获取数据  直接在api那边下载Excel
            if (buffer.export != 1) {
                if (response.status == 200) {
                    yield put({
                        type: 'save',
                        payload: response.data,
                    });
                }
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
