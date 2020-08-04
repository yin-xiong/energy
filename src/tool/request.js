import baseUrl from './config';
const httpRequest = ( url,method,data ) => {
    let httpDefaultOpts = {
        url: baseUrl + url, data, method,
        header: method == 'GET' ?
            { 'X-Requested-With': 'XMLHttpRequest', "Accept": "application/json", "Content-Type": "text/html; charset=UTF-8",'token': uni.getStorageSync('token'), }
            :
            { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','token': uni.getStorageSync('token'), },
        dataType: 'json',
    }
    return new Promise( (resolve, reject) => {
        uni.request(httpDefaultOpts)
            .then((res) => {
                resolve(res[1].data);
            })
            .catch((response) => {reject(response);});
    });
};
//带Token请求
const httpTokenRequest = ( url,method , data={} ) => {
//此token是登录成功后后台返回保存在storage中的
    let httpDefaultOpts = {
        url: baseUrl + url,
        data: data,
        method: method,
        header: method == 'GET' ? {
            'token': uni.getStorageSync('token'),
            'X-Requested-With': 'XMLHttpRequest',
            "Accept": "application/json",
            "Content-Type": "text/html; charset=UTF-8",
            'device-type':3,
        } : {
            'token': uni.getStorageSync('token'),
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        dataType: 'json',
    };
    return new Promise( (resolve, reject) => {
        uni.request(httpDefaultOpts)
            .then((res) => {
                return resolve(res[1].data);
            })
            .catch((response) => {reject(response);});
    });
};
const httpQuestion = ( url,method , data={} ) => {
//此token是登录成功后后台返回保存在storage中的
    let httpDefaultOpts = {
        url: baseUrl + url,
        data: data,
        method: method,
        header: method == 'GET' ? {
            'token': uni.getStorageSync('token'),
            'X-Requested-With': 'XMLHttpRequest',
            "Accept": "application/json",
            "Content-Type": "text/html; charset=UTF-8"
        } : {
            'token': uni.getStorageSync('token'),
            'X-Requested-With': 'XMLHttpRequest'
        },
    };
    return new Promise( (resolve, reject) => {
        uni.request(httpDefaultOpts)
            .then((res) => {
                return resolve(res[1].data);
            })
            .catch((response) => {reject(response);});
    });
};
export default {
    httpRequest,
    httpTokenRequest,
    httpQuestion,
};

