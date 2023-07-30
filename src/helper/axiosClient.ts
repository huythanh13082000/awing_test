import axios, {AxiosResponse} from 'axios'
import {BASE_URL} from '../constants'
import {Route} from '../router/routes'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

export const setTokensAxios = () => {
  const token = localStorage.getItem('accessToken')
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
setTokensAxios()
axiosClient.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('accessToken')
      window.location.href = Route.LOGIN
    } else return Promise.reject(error)
  }
)

export default axiosClient
