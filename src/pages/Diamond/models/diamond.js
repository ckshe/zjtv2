import { accountList, consumeList, deductList, incomeStatistics } from '@/services/api';

function accountListForm(params) {
  var buffer = { page_size: 10, page: 1 };
  typeof (params.page_size) != 'undefined' ? buffer.page_size = params.page_size : '';
  typeof (params.page) != 'undefined' ? buffer.page = params.page : '';
  typeof (params.username) != 'undefined' ? buffer.username = params.username : '';
  typeof (params.nickname) != 'undefined' ? buffer.nickname = params.nickname : '';
  typeof (params.operation) != 'undefined' ? buffer.operation = params.operation : '';
  typeof (params.type) != 'undefined' ? buffer.type = params.type : '';
  typeof (params.export) != 'undefined' ? buffer.export = params.export : '';
  typeof (params.date) != 'undefined' ? buffer.start_date = params.date[0].format('L') : '';
  typeof (params.date) != 'undefined' ? buffer.end_date = params.date[1].format('L') : '';
  return buffer;
}
function consumeListForm(params) {
  var buffer = { page_size: 10, page: 1 };
  typeof (params.page_size) != 'undefined' ? buffer.page_size = params.page_size : '';
  typeof (params.page) != 'undefined' ? buffer.page = params.page : '';
  typeof (params.key) != 'undefined' ? buffer.key = params.key : '';
  typeof (params.number) != 'undefined' ? buffer.number = params.number : '';
  typeof (params.expert_id) != 'undefined' ? buffer.expert_id = params.expert_id : '';
  typeof (params.plat) != 'undefined' ? buffer.plat = params.plat : '';
  typeof (params.home_team) != 'undefined' ? buffer.home_team = params.home_team : '';
  typeof (params.away_team) != 'undefined' ? buffer.away_team = params.away_team : '';
  typeof (params.match_time) != 'undefined' ? buffer.match_time = params.match_time.format('L') : '';
  typeof (params.recommend_type) != 'undefined' ? buffer.recommend_type = params.recommend_type : '';
  typeof (params.export) != 'undefined' ? buffer.export = params.export : '';
  typeof (params.date) != 'undefined' ? buffer.start_date = params.date[0].format('L') : '';
  typeof (params.date) != 'undefined' ? buffer.end_date = params.date[1].format('L') : '';
  return buffer;
}
function deductListForm(params) {
  var buffer = { page_size: 10, page: 1 };
  typeof (params.page_size) != 'undefined' ? buffer.page_size = params.page_size : '';
  typeof (params.page) != 'undefined' ? buffer.page = params.page : '';
  typeof (params.username) != 'undefined' ? buffer.username = params.username : '';
  typeof (params.nickname) != 'undefined' ? buffer.nickname = params.nickname : '';
  typeof (params.level) != 'undefined' ? buffer.level = params.level : '';
  typeof (params.export) != 'undefined' ? buffer.export = params.export : '';
  typeof (params.date) != 'undefined' ? buffer.start_date = params.date[0].format('L') : '';
  typeof (params.date) != 'undefined' ? buffer.end_date = params.date[1].format('L') : '';
  return buffer;
}
function incomeStatisticsForm(params) {
  var buffer = { page_size: 10, page: 1 };
  // typeof (params.page_size) != 'undefined' ? buffer.page_size = params.page_size : '';
  // typeof (params.page) != 'undefined' ? buffer.page = params.page : '';
  // typeof (params.username) != 'undefined' ? buffer.username = params.username : '';
  // typeof (params.nickname) != 'undefined' ? buffer.nickname = params.nickname : '';
  // typeof (params.level) != 'undefined' ? buffer.level = params.level : '';
  // typeof (params.export) != 'undefined' ? buffer.export = params.export : '';
  typeof (params.date) != 'undefined' ? buffer.start_date = params.date[0].format('L') : '';
  typeof (params.date) != 'undefined' ? buffer.end_date = params.date[1].format('L') : '';
  return buffer;
}
export default {
  namespace: 'diamond',

  state: {
    data: {
      list: [],
      header: {},
      pagination: {
        current: 1,
        page_size: 10,
        total: 0,
      },
    },
    incomeStatisticsData:{
      list: [],
      header: {},
    }
  },

  effects: {
    *accountList({ payload }, { call, put }) {
      const buffer = accountListForm(payload)
      const response = yield call(accountList, buffer);
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
    *consumeList({ payload }, { call, put }) {
      const buffer = consumeListForm(payload)
      const response = yield call(consumeList, buffer);
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
    *deductList({ payload }, { call, put }) {
      const buffer = deductListForm(payload)
      const response = yield call(deductList, buffer);
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
    *incomeStatistics({ payload }, { call, put }) {
      const buffer = incomeStatisticsForm(payload)
      const response = yield call(incomeStatistics, buffer);
      // 如果是导出Excel表格则不需要获取数据  直接在api那边下载Excel
      if (buffer.export != 1) {
        if (response.status == 200) {
          yield put({
            type: 'saveIncomeStatistics',
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
    saveIncomeStatistics(state, action) {
      return {
        ...state,
        incomeStatisticsData: action.payload,
      };
    },
  },
};
