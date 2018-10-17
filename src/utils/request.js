import axios from 'axios';
import {notification, message} from 'antd';
import NProgress from 'nprogress';
import store from 'store2';

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
      const {status, data, statusText} = e.response;

      if (status === 400) {
        message.error(data.message);
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
