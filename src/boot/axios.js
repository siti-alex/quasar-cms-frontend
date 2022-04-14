import { boot } from 'quasar/wrappers'
import axios from 'axios'

// const url = 'http://localhost:8080'
//  const url = 'https://cms.lit.bgpu.ru'
 const url = 'https://192.168.202.115:8004'


// const api = axios.create({ baseURL: `${url}` })
const baseURL = `${url}`;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Set-Cookie'] = 'SameSite=None';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With';
// axios.defaults.baseURL = `${url}`;

const API = axios.create({
  baseURL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    "Accept": "application/json",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    "Set-Cookie": "SameSite=None;"
  }

});

export default {
  url,
  getSections(){
    return API.get('/section/tree',{
      headers: {
        // 'Authorization': 'Basic ' + btoa('test:test')
      }
    });
  },
  auth(auth) {
    try {
      const data = new FormData();
      // data.append('username', auth.username)
      data.append('login', auth.username)
      // data.append('password', auth.password)
      data.append('passwd', auth.password)
      // const response = API.post('/section/auth', {
      const response = API.post('/auth', data, {
        // credentials: 'same-origin',
        // auth,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          // 'Access-Control-Allow-Origin': 'https://192.168.202.115:8004',
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'SameSite': 'None'
        },
        withCredentials: true,
        // headers: {
        //   //             // 'Authorization': Basic YWRtaW46YWRtaW4=
        //   "Accept": "application/json",
        //   "Content-Type": "application/json",
        //   "Set-Cookie": "SameSite=None;",
        //   'Authorization': 'Basic ' + btoa(`${auth.username}:${auth.password}`)
        // }
      })
      //console.log(response);
      return response;

    } catch (e) {
      // console.log(e.response);
      return e;
    }
  },
  getSectionByXz(id) {
    return API.get(`/section/get/${id}`);
  },
}


// api.interceptors.response.use((data) => data
//   , (error) => {
//     if (error.response && error.response.status === 403 || (error.response && error.response.status === 401)) {
//       // router.replace({
//       //   name: 'auth',
//       //   query: {redirect: router.currentRoute.fullPath},
//       // })
//       location.href = `/auth`;
//     }
//   });


// export default boot(({ app }) => {
//   // for use inside Vue files (Options API) through this.$axios and this.$api
//
//   app.config.globalProperties.$axios = axios
//   // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
//   //       so you won't necessarily have to import axios in each vue file
//
//   app.config.globalProperties.$api = api
//   // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
//   //       so you can easily perform requests against your app's API
//
// })
//
//
// export { axios, api }
