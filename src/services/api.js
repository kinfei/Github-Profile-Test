import request from 'utils/request';
import queryString from 'query-string';

export function loginOAuth(params) {
  return request(`/login/oauth/authorize?${queryString.stringify(params)}`);
}

export function postOAuth(params) {
  return request(`/login/oauth/access_token?${queryString.stringify(params)}`, {
    method: 'post',
  });
}

export function checkOAuth({clientId, accessToken}) {
  return request(`/applications/${clientId}/tokens/${accessToken}`);
}


export function getUser(params) {
  return request(`/user?${queryString.stringify(params)}`);
}

export function getRepoFromUser({user, params}) {
  return request(`/users/${user}/repos?${queryString.stringify(params)}`);
}