import axios from 'axios'
import { message } from 'ant-design-vue'
const base = {
    baseURL: process.env.VUE_APP_DEV_URL,
    timeout: 1000 * 60,
    method: 'POST'
}

const instance = axios.create(base);


instance.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use( response => {
    if (response.data && response.data.success) {
        return response.data
    } else {
        message.error(response.data.message)
        return Promise.reject(response.data.message)
    }
}, function (err) {
    message.error('系统服务错误');
    return  Promise.reject(err)
});

export default instance
