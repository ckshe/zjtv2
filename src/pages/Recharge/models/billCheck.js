import { billCheckList, iOSList } from '@/services/api';

function paramsListForm(params) {
    var buffer = {};
    typeof (params.pay_type) != 'undefined' ? buffer.pay_type = params.pay_type : '';
    typeof (params.bill) != 'undefined' ? buffer.bill = params.bill["file"] : '';
    typeof (params.show_error) != 'undefined' ? buffer.show_error = (params.show_error ? '1' : '0') : '';
    typeof (params.export) != 'undefined' ? buffer.export = params.export : '';
    typeof (params.date) != 'undefined' ? buffer.start_date = params.date[0].format('L') : '';
    typeof (params.date) != 'undefined' ? buffer.end_date = params.date[1].format('L') : '';
    return buffer;
}

export default {
    namespace: 'billCheck',

    state: {
        defaultData: {
            list: [],
            header: {},
            pagination: {},
        },
        iOSData: {
            list: [],
            header: {},
            pagination: {},
        },
    },

    effects: {
        *defaultList({ payload }, { call, put }) {
            const buffer = paramsListForm(payload)
            const response = yield call(billCheckList, buffer);
            // 如果是导出Excel表格则不需要获取数据  直接在api那边下载Excel
            if (response.status == 200) {
                if (buffer.export != 1) {
                    yield put({
                        type: 'saveDetails',
                        payload: response.data,
                    });
                }else{
                    window.location.href = response.data.file
                }
            }
        },
        *iOSList({ payload }, { call, put }) {
            const buffer = paramsListForm(payload)
            const response = yield call(iOSList, buffer);
            // 如果是导出Excel表格则不需要获取数据  直接在api那边下载Excel
            if (response.status == 200) {
                if (buffer.export != 1) {
                    yield put({
                        type: 'saveIOS',
                        payload: response.data,
                    });
                }else{
                    window.location.href = response.data.file
                }
            }
        },
    },

    reducers: {
        saveDetails(state, action) {
            return {
                ...state,
                defaultData: action.payload,
            };
        },
        saveIOS(state, action) {
            return {
                ...state,
                iOSData: action.payload,
            };
        },
    },
};
