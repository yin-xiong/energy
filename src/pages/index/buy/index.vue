<template>
    <view class="pageContent flex align-center justify-center">
        <view>
            <view class="cu-btn round bg-blue" @click="gobuyVip">付费购买</view>
            <view class="cu-btn round bg-blue" @click="activationCode">激活码开通</view>
            <view class="cu-btn round bg-blue" @click="applyCode">申请激活码</view>
        </view>

        <view class="cu-modal" :class="isActive?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">激活码开通</view>
                    <view class="action" @click="isActive = false">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class="padding-xl subCodeContent">
                    <view>
                        <input class="subCode" type="text" placeholder="请输入激活码:" v-model="code" />
                    </view>
                </view>
                <view class="cu-bar bg-white justify-end">
                    <view class="action">
                        <button class="cu-btn line-green text-green" @click="isActive = false">取消</button>
                        <button style="margin-left: 20px;" class="cu-btn bg-green" @click="subCode">确定</button>
                    </view>
                </view>
            </view>
        </view>
        <view class="cu-modal" :class="isActive2?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">激活码开通</view>
                    <view class="action" @click="isActive2 = false">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class="padding-xl subCodeContent">
                    <view class="cu-form-group">
                        <view class="title">姓名</view>
                        <input placeholder="请输入姓名:" v-model="reqData.name" />
                    </view>
                    <view class="cu-form-group">
                        <view class="title">电话</view>
                        <input placeholder="请输入电话:" v-model="reqData.tel" maxlength="11" />
                    </view>
                    <view class="cu-form-group">
                        <view class="title">学校</view>
                        <input placeholder="请输入学校:" v-model="reqData.school" />
                    </view>
                    <view class="cu-form-group">
                        <view class="title">专业</view>
                        <input placeholder="请输入专业:" v-model="reqData.major" />
                    </view>
                    <view class="cu-form-group">
                        <view class="title">微信</view>
                        <input placeholder="请输入微信:" v-model="reqData.wechat" />
                    </view>
                    <view class="cu-form-group">
                        <view class="title">考研意向</view>
                        <input placeholder="请输入考研意向:" v-model="reqData.intention" />
                    </view>
                </view>
                <view class="cu-bar bg-white justify-end">
                    <view class="action">
                        <button class="cu-btn line-green text-green" @click="isActive2 = false">取消</button>
                        <button style="margin-left: 20px;" class="cu-btn bg-green" @click="subApply">确定</button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    export default {
        data(){
            return{
                isActive:false, // 激活码开通的模态框
                isActive2:false, // 申请激活码的模态框
                code:'', // 激活码
                reqData:{
                    name:'' , //姓名
                    tel: '' ,// 电话
                    school: '' ,// 学校
                    major: '' ,// 专业
                    wechat: '' ,// 微信
                    intention: '' ,// 考研意向
                },
            }
        },
        onShareAppMessage: function () {},
        methods:{
            // 用户购买
            async gobuyVip(){
                if( uni.getStorageSync('isVip') == false){
                    let data = {
                            openid: uni.getStorageSync('openid'),
                            "spbillCreateIp": "123.12.12.123",
                            "body": "研能量会员",
                            "notifyUrl": "https://hwww.qingdaohaitian.cn:8080/api/pay/notify/order",
                            "outTradeNo": this.getOrderNum(),
                            "totalFee": 1,
                            "tradeType": "JSAPI",
                        },
                        orderRep = await this.$api.createOrder(data);
                    console.log(orderRep);
                    if(orderRep.code == 200){
                        let orderInfo = orderRep.result
                        console.log(orderInfo);
                        this.buyVip = false
                        uni.requestPayment({
                            nonceStr: orderInfo.nonceStr,
                            package: orderInfo.packageValue,
                            paySign: orderInfo.paySign,
                            signType: orderInfo.signType,
                            timeStamp: orderInfo.timeStamp,
                            success: async (res) =>{
                                console.log( res.errMsg == 'requestPayment:ok' );
                                if(res.errMsg == 'requestPayment:ok'){
                                    // 支付成功，更改用户vip状态
                                    let data = {userId : uni.getStorageSync('openid')},
                                        resp = await this.$api.selectUser(data);
                                    console.log(resp);
                                    uni.setStorage({key: 'isVip', data: resp.result.isVip});
                                }
                            },
                            fail:  (err) =>{
                                console.log(err);
                            }
                        });
                    }
                }else{
                    uni.showModal({
                        title:'温馨提示',
                        content:'您已经是会员了',
                        showCancel:false
                    })
                }
            },
            // 获取订单号
            getOrderNum(){
                let now = new Date();
                let yy = now.getFullYear();      //年
                let mm = now.getMonth() + 1;     //月
                let dd = now.getDate();          //日
                let hh = now.getHours();         //时
                let ii = now.getMinutes();       //分
                let ss = now.getSeconds();       //秒
                let outTradeNo = `${yy}${mm}${dd}${hh}${ii}${ss}${uni.getStorageSync('userNo')}`
                return outTradeNo
            },

            // 开通激活码
            activationCode(){
                this.code = '';
                this.isActive = true
            },
            // 提交激活码
            async subCode(){
                console.log(this.code);
                if(this.code){
                    let data = {cdkey : this.code}, res = await this.$api.openMemberByCDKEY(data)
                    console.log(res);
                    if(res.code == 0){
                        this.code = '';
                        this.isActive = false
                        uni.showToast({
                            title:'开通成功',
                            icon:'success'
                        })
                    }else{
                        this.code = '';
                        uni.showToast({
                            title:'密钥错误，请重新输入',
                            icon:'none'
                        })
                    }
                }
            },
            // 申请激活码
            applyCode(){
                this.isActive2 = true
            },
            // 提交申请激活码
            async subApply(){
                if(!this.reqData.name){uni.showModal({title:'温馨提示:', content:'请填写姓名', showCancel:false})}
                else if(!this.reqData.tel){uni.showModal({title:'温馨提示:', content:'请填写电话', showCancel:false})}
                else if(!this.reqData.school){uni.showModal({title:'温馨提示:', content:'请填写学校', showCancel:false})}
                else if(!this.reqData.major){uni.showModal({title:'温馨提示:', content:'请填写专业', showCancel:false})}
                else if(!this.reqData.wechat){uni.showModal({title:'温馨提示:', content:'请填写微信', showCancel:false})}
                else if(!this.reqData.intention){uni.showModal({title:'温馨提示:', content:'请填写考研意向', showCancel:false})}
                else{
                    console.log('填写完毕')
                    let data = {
                        name : this.reqData.name,
                        tel : this.reqData.tel,
                        school : this.reqData.school,
                        major : this.reqData.major,
                        im : this.reqData.wechat,
                        intentionMajor : this.reqData.intention,
                    },res = await this.$api.applyCDKEY(data)
                    console.log(res);
                    if(res.code == 0){
                        this.code = '';
                        this.isActive2 = false
                        this.reqData.name = ''
                        this.reqData.tel = ''
                        this.reqData.school = ''
                        this.reqData.major = ''
                        this.reqData.wechat = ''
                        this.reqData.intention = ''
                        uni.showToast({
                            title:'开通成功',
                            icon:'success'
                        })
                    }else{
                        this.code = '';
                        uni.showToast({
                            title:'密钥错误，请重新输入',
                            icon:'none'
                        })
                    }
                }
            },
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .pageContent{
        width: 100%;
        height: 100vh;
        overflow: hidden;
        >view{
            width: 100%;
            height: auto;
            overflow: hidden;
        }
        .cu-btn{
            display: block;
            width: 50%;
            height: 60upx;
            line-height: 60upx;
            margin: 40upx auto;
        }
        .subCodeContent{
            min-height: 200upx;
            >view{
                overflow: hidden;
            }
            .subCode{
                text-align: left;
                width: 100%;
                height: 80upx;
                border: 1upx solid #eee;
                border-radius: 10upx;
                font-size: 28upx;
                color: #262626;
                padding: 0 10upx;
            }
        }
        .cu-form-group{
            input{
                text-align: left;
            }
        }
   
    }
</style>
