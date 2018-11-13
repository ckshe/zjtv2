import { expertList, expertAdd, nameOrNickIsExist } from '@/services/api';
import router from 'umi/router';
import { message } from 'antd';
function consumeListForm(params) {
  var buffer = { page_size: 10, page: 1 };
  typeof (params.page_size) != 'undefined' ? buffer.page_size = params.page_size : '';
  typeof (params.page) != 'undefined' ? buffer.page = params.page : '';
  typeof (params.username) != 'undefined' ? buffer.username = params.username : '';
  typeof (params.nickname) != 'undefined' ? buffer.nickname = params.nickname : '';
  typeof (params.level) != 'undefined' ? buffer.level = params.level : '';
  typeof (params.status) != 'undefined' ? buffer.status = params.status : '';
  typeof (params.home_team) != 'undefined' ? buffer.home_team = params.home_team : '';
  typeof (params.away_team) != 'undefined' ? buffer.away_team = params.away_team : '';
  typeof (params.match_time) != 'undefined' ? buffer.match_time = params.match_time.format('L') : '';
  typeof (params.recommend_type) != 'undefined' ? buffer.recommend_type = params.recommend_type : '';
  typeof (params.export) != 'undefined' ? buffer.export = params.export : '';
  typeof (params.date) != 'undefined' ? buffer.start_date = params.date[0].format('L') : '';
  typeof (params.date) != 'undefined' ? buffer.end_date = params.date[1].format('L') : '';
  typeof (params.sort) != 'undefined' ? buffer.sort = params.sort : '';
  return buffer;
}
export default {
  namespace: 'exportlist',

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
    isExist: {}
  },

  effects: {
    *getExportlist({ payload }, { call, put }) {
      console.log("payload====", payload)
      const buffer = consumeListForm(payload)
      const response = yield call(expertList, buffer);
      console.log("response=========", response)
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *submitExportAdd({ payload }, { call, put }) {
      console.log("expertAdd===========", payload)
      const response = yield call(expertAdd, payload);
      console.log(response)
      if (response.status == "200") {
        message.success("添加专家成功", 1, () => {
          router.push({
            pathname: "/export/export-list"
          })
        })
      } else {
        message.error("添加专家失败", 2, () => {
        })
      }
    },
    *nameOrNickIsExist({ payload }, { call, put }) {
      console.log("nameOrNickIsExist===========", payload)
      const response = yield call(nameOrNickIsExist, payload);
      console.log(response)
      const data = {
        nameOrNickIsExist: false
      }
      if (response.status == "200") {
        data.nameOrNickIsExist = true
      }
      yield put({
        type: 'isExist',
        payload: data.nameOrNickIsExist,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload
      };
    },
    isExist(state, action) {
      return {
        ...state,
        nameOrNickIsExist: action.payload
      }
    }
  },
};
