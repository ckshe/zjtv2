import { routerRedux } from 'dva/router';
import { login, logoutLogin } from '@/services/api';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      // try主要做延迟  避免在存储用户信息还没存储完就直接页面跳转导致页面报错
      try {
        if (response.status == 200) {
          localStorage.setItem('user_info', JSON.stringify(response.data.user_info));
        }
      } finally {
        if (response.status == 200) {
          yield put(routerRedux.replace('/'));
        }
      }
    },

    *logout(payload, { call, put }) {
      const response = yield call(logoutLogin, payload);
      localStorage.setItem('user_info','')
      yield put(routerRedux.push({ pathname: '/user/login' }));
    },
  },

  reducers: {},
};
