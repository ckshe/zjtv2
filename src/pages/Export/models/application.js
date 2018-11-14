import { applicationList } from '@/services/api';
function consumeListForm(params) {
  var buffer = { page_size: 10, page: 1 };
  typeof (params.page_size) != 'undefined' ? buffer.page_size = params.page_size : '';
  typeof (params.page) != 'undefined' ? buffer.page = params.page : '';
  typeof (params.username) != 'undefined' ? buffer.username = params.username : '';
  typeof (params.name) != 'undefined' ? buffer.name = params.name : '';
  typeof (params.id_card_no) != 'undefined' ? buffer.id_card_no = params.id_card_no : '';
  typeof (params.nickname) != 'undefined' ? buffer.nickname = params.nickname : '';
  typeof (params.status) != 'undefined' ? buffer.status = params.status : '';
  typeof (params.date) != 'undefined' ? buffer.start_date = params.date[0].format('L') : '';
  typeof (params.date) != 'undefined' ? buffer.end_date = params.date[1].format('L') : '';
  return buffer;
}
export default {
  namespace: 'application',

  state: {
    data: {
      list: [],
      header: {},
      pagination: {
        page_size: 10,
        current: 1,
        total: 0
      },
    },
  },

  effects: {
    *getApplicationList({ payload }, { call, put }) {
      console.log("payload", payload)
      const buffer = consumeListForm(payload)
      const response = yield call(applicationList, buffer);
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
