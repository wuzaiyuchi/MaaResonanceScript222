import request from '@/utils/request'

let maaApi = {};
maaApi.login = function (data) {
    return request({
        url: '/queryAppHost',
        data,
        method: 'post'
    })
}

export default maaApi
