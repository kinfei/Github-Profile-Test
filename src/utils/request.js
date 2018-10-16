import axios from 'axios';
import {notification, message} from 'antd';
import NProgress from 'nprogress';
import store from 'store2';
import app from 'src/index';

console.log({app});
NProgress.configure({showSpinner: false});

axios.interceptors.request.use(
  config => {
    const token = store.get('jwt');
    const isLoginUrl = config.url.includes('login');
    const newConfig = {...config};
    if (token && !isLoginUrl) {
      newConfig.headers.Authorization = `bearer ${token}`;
    }

    return newConfig;
  },
  err => Promise.reject(err)
);

const codeMessage = {
  200: 'Success.',
  201: 'New added or modified success.',
  202: 'Request running.',
  204: 'Deleted success.',
  400: 'Bad request.',
  401: 'Unauthorized request.',
  403: 'Forbidden request.',
  404: 'Not found.',
  406: 'Not Acceptable.',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: 'Server error',
  502: 'Bad Gateway server error.',
  503: 'Service Unavailable.',
  504: 'Gateway Timeout error.',
};

const checkStatus = response => {  
  if (response.status === 204 && !response.data) {
    return {data: true};
  }

  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  NProgress.start();

  const newOptions = {...options};

  if (newOptions.params) {
    Object.keys(newOptions.params).forEach(item => {
      if (newOptions.params[item] === '') {
        delete newOptions.params[item];
      }

      if (typeof newOptions.params[item] === 'string') {
        newOptions.params[item] = newOptions.params[item].trim();
      }
    });
  }

  if (newOptions.data) {
    Object.keys(newOptions.data).forEach(item => {
      if (newOptions.data[item] === '') {
        delete newOptions.data[item];
      }

      if (typeof newOptions.data[item] === 'string') {
        newOptions.data[item] = newOptions.data[item].trim();
      }
    });
  }

  return axios({url, ...newOptions})
    .then(checkStatus)
    .then(({data}) => data)
    .catch(e => {
      console.log({app});
      const {dispatch} = app;
      const {status, data, statusText} = e.response;

      if (status === 400) {
        message.error(data.message);
        return;
      }

      if (status === 401 || status === 403) {       
        setTimeout(() => {
          dispatch({
            type: 'login/logout',
          });
        }, 800);
        return;
      }

      const errorText = codeMessage[status] || statusText;
      notification.error({
        message: `Request error ${status}: ${url}`,
        description: errorText,
      });
    })
    .finally(NProgress.done);
}
