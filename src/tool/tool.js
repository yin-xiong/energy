
import api from './api'

const showWriteMsg = str=> {
    uni.showModal({
        title: '温馨提示',
        content: str,
        showCancel:false,
        success: function (res) {
            if (res.confirm) return ;
        }
    });
};

const resetPhone = (phone) =>{
    var str = String(phone),len = str.length;
    if (len >= 7) {
        var reg = str.slice(-7, -3);
        return str.replace(reg, "****")
    } else if (len < 7 && len >= 6) {
        //1234567
        var reg = str.slice(-4, -2);
        return str.replace(reg, "**")
    }
};

const formatDateTime = (timeStamp)=> {
    var date = new Date();
    date.setTime(timeStamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
};

const getOrderNum = ()=>{
    let now = new Date();
    let yy = now.getFullYear();      //年
    let mm = now.getMonth() + 1;     //月
    let dd = now.getDate();          //日
    let hh = now.getHours();         //时
    let ii = now.getMinutes();       //分
    let ss = now.getSeconds();       //秒
    let outTradeNo = `${yy}${mm}${dd}${hh}${ii}${ss}${uni.getStorageSync('userNo')}`
    return outTradeNo
};


const  gobuyVip = async ()=>{
    let data = {
            openid: uni.getStorageSync('openid'),
            "spbillCreateIp": "123.12.12.123",
            "body": "研能量会员",
            "notifyUrl": "https://hwww.qingdaohaitian.cn:8080/api/pay/notify/order",
            "outTradeNo": getOrderNum(),
            "totalFee": 1,
            "tradeType": "JSAPI",
        },
        orderRep = await api.createOrder(data);
    if(orderRep.code == 200){
        let orderInfo = orderRep.result
        uni.requestPayment({
            nonceStr: orderInfo.nonceStr,　　
            package: orderInfo.packageValue,　　　　　　
            paySign: orderInfo.paySign,　　　　　　　
            signType: orderInfo.signType,　　　　　　
            timeStamp: orderInfo.timeStamp,　　　　
            success: async (res) =>{
                if(res.errMsg == 'requestPayment:ok'){
                    // 支付成功，更改用户vip状态
                    let data = {userId : uni.getStorageSync('openid')},
                        resp = await api.selectUser(data);
                    uni.setStorage({key: 'isVip', data: resp.result.isVip});
                }
            },
            fail:  (err) =>{
                console.log(err);
            }
        });
    }
};

export default {
    showWriteMsg,
    resetPhone,
    formatDateTime,
    gobuyVip
};
