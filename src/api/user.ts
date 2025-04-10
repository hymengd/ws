import axios from "axios";
export const login = (account: string, password: string) => {
  return axios.post('/user/login', {
    account: account,
    password: password,
  }).then(res => {
    return res
  });
}
export const setUserOnline = (user_id: number) => {
  return axios.post('/user/setUserOnline', user_id, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res
  });
}

export const setUserOffline = (user_id: number) => {
  return axios.post('/user/setUserOffline', user_id, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res
  });
}
