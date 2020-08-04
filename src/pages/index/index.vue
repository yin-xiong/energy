<template>
    <view class="content">
        <view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper
                            :autoplay="autoplay"
                            :circular="circular"
                            :duration="duration"
                            :indicator-dots="indicatorDots"
                            indicator-active-color="#fff"
                            :interval="interval"
                            class="swiper"
                    >
                        <swiper-item>
                            <view class="swiper-item">
                                <img src="../../static/image/list/banner.png" mode="widthfix" />
                            </view>
                        </swiper-item>
                        <swiper-item :key="index" v-for="(item,index) in swiperList">
                            <view class="swiper-item"><img :src="item.imgUrl" mode="widthfix" /></view>
                        </swiper-item>

                    </swiper>
                </view>
            </view>
        </view>
        <view v-if="false" class="system" @click="toAdjust">
            <img alt="" src="../../static/image/icon/tiaojibaolu.png">
        </view>
        <view class="search-content">
            <view class="search-header">
                <view class="flex align-center">
                    <text class="cuIcon-search"></text>
                    <input placeholder="请输入搜索学校" type="text" v-model="searchContent" @blur="toSearch" />
                </view>
            </view>
            <view class=" search-direction flex">
                <view v-for="(item,index) in searchfors" :key="index" @click="toSearchfors(item.id)">
                    <img :src="item.src" />
                    <text>{{item.title}}</text>
                </view>
            </view>
        </view>
        <view class="recommend"  @click="testSchool(4)"><img src="../../static/image/icon/aituijian.png" /></view>
        <view class="tools-item">
            <view class="test-list">
                <view class="test-list-title"><text>研测试 | 测测你与梦想的距离！</text></view>
                <view class="test-list-content">
                    <view class="text-item flex align-center"  @click="testSchool(1)">
                        <text>择校测试 | 你选对学校了吗？</text>
                        <text>开始测试</text>
                        <img src="../../static/image/icon/ceshi2.png" alt="">
                    </view>
                    <view class="text-item flex align-center"  @click="testSchool(2)">
                        <text>能力测试 | 你离国家线有多远？</text>
                        <text>开始测试</text>
                        <img src="../../static/image/icon/ceshi2.png" alt="" />
                    </view>
                    <view class="text-item flex align-center"  @click="testSchool(3)">
                        <text>专业测试 | 你适合读什么专业？</text>
                        <text>开始测试</text>
                        <img src="../../static/image/icon/ceshi3.png" alt="" />
                    </view>
                </view>
            </view>
            <view class="test-list">
                <view class="test-list-title"><text>考研工具箱</text></view>
                <view class="tools-list flex">
                    <button v-for="( item,index) in tools" :key="item.index" @click="tourl(item)">
                        <view><img :src="item.src" alt=""></view>
                        <text style="white-space: nowrap;">{{item.title}}</text>
                    </button>
                </view>
            </view>
            <view class="test-list">
                <view class="test-list-title"><text>学习充电站</text></view>
                <view class="study-list flex">
<!--                    <view class="learning-list" v-for="( item,index ) in test" :key="index" @click="goWebview(item.url)">-->
                    <view class="learning-list" v-for="( item,index ) in test" :key="index" @click="goOtherWechat(item)">
                        <img :src="item.src" mode="widthFix" />
                    </view>
                </view>
            </view>
            <view class="test-list">
                <view class="test-list-title"><text>研刷题系统</text></view>
                <view class="study-list flex">
                    <view class="learning-list" v-for="( item,index ) in test1" :key="index" @click="goShuati(item)">
                        <img style="width:120upx;height:120upx;margin-bottom: 10upx;" :src="item.src" mode="widthFix" />
                        <view style="width: 100%;font-size: 24upx;color: #333;text-align: center;">
                            {{item.title}}
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 登陆的模态框 -->
        <view :class="modalFlag ? 'cu-modal show' : 'cu-modal'  ">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">温馨提示</view>
                </view>
                <view class="padding-xl" style="text-align: justify;">您还未授权登陆，部分功能将不能使用，是否同意授权？</view>
                <view class="cu-bar bg-white justify-end">
                    <view class="action">
                        <button class="cu-btn bg-green margin-left" open-type="getUserInfo" @click="getUserInfo">确定</button>
                    </view>
                </view>
            </view>
        </view>
        <!-- 获取用户手机号码的模态框 -->
        <view :class="phoneFlag ? 'cu-modal show' : 'cu-modal'  ">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">温馨提示</view>
                </view>
                <view class="padding-xl" style="text-align: justify;">使用此功能需要获取您的电话号码，是否同意授权？</view>
                <view class="cu-bar bg-white justify-end">
                    <view class="action">
                        <!--                        <button class="cu-btn line-green text-green" @click="this.modalFlag = false">取消</button>-->
                        <button class="cu-btn bg-green margin-left" open-type="getPhoneNumber" @getphonenumber="getUserPhone">确定</button>
                    </view>
                </view>
            </view>
        </view>
        <!-- 用户购买会员的悬浮框 -->
        <view class="member" @click="buyMember"><text>购买会员</text></view>
        <view :class="buyVip ? 'cu-modal show' : 'cu-modal'  ">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">温馨提示</view>
                </view>
                <view class="buyvip">
                    确定购买会员？
                </view>
                <view class="cu-bar bg-white justify-end">
                    <view class="action">
                        <button class="cu-btn line-green text-green" @click="this.buyVip = false">取消</button>
                        <button class="cu-btn bg-green margin-left" @click="gobuyVip">确定</button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>

    export default {
        data() {
            return {
                indicatorDots: true,
                autoplay: true,
                interval: 3000,
                duration: 800,
                circular: true,
                swiperList: [],
                searchContent:'',// 搜索内容
                searchfors:[
                    { id:1,title:'按分数检索', src:'../../static/image/icon/i1.png',},
                    { id:2,title:'按专业检索', src:'../../static/image/icon/i2.png',},
                    { id:3,title:'按研究方向检索',src:'../../static/image/icon/i3.png',},
                ],
                // 学习充电站
                test:[
                    { index:0,src:'../../static/image/list/t1.png',
                        url:'https://app5X1FzVWh1665.h5.xiaoeknow.com/content_page/eyJ0eXBlIjozLCJyZXNvdXJjZV90eXBlIjo4LCJyZXNvdXJjZV9pZCI6IiIsInByb2R1Y3RfaWQiOiJwXzVlODZiYmUwYzgzNjlfWUdTZVNnVG8iLCJhcHBfaWQiOiJhcHA1WDFGelZXaDE2NjUifQ'
                    },
                    { index:1,src:'../../static/image/list/t2.png',
                        url:'https://app5X1FzVWh1665.h5.xiaoeknow.com/content_page/eyJ0eXBlIjozLCJyZXNvdXJjZV90eXBlIjo4LCJyZXNvdXJjZV9pZCI6IiIsInByb2R1Y3RfaWQiOiJwXzVlODZjZjM4YmZhODVfNjBLT0h1bWwiLCJhcHBfaWQiOiJhcHA1WDFGelZXaDE2NjUifQ'
                    },
                    { index:2,src:'../../static/image/list/t3.png',
                        url:'https://app5X1FzVWh1665.h5.xiaoeknow.com/content_page/eyJ0eXBlIjozLCJyZXNvdXJjZV90eXBlIjo4LCJyZXNvdXJjZV9pZCI6IiIsInByb2R1Y3RfaWQiOiJwXzVlODZhNDIyZDBkZGNfSWhmelBZYUwiLCJhcHBfaWQiOiJhcHA1WDFGelZXaDE2NjUifQ'
                    },
                    { index:3,src:'../../static/image/list/t4.png',
                        url:'https://app5X1FzVWh1665.h5.xiaoeknow.com/content_page/eyJ0eXBlIjozLCJyZXNvdXJjZV90eXBlIjo4LCJyZXNvdXJjZV9pZCI6IiIsInByb2R1Y3RfaWQiOiJwXzVlODZhYjA5MmNmYmRfZFg0bHZGeVYiLCJhcHBfaWQiOiJhcHA1WDFGelZXaDE2NjUifQ'
                    },
                    { index:4,src:'../../static/image/list/t5.png',
                    url:'https://app5X1FzVWh1665.h5.xiaoeknow.com/content_page/eyJ0eXBlIjozLCJyZXNvdXJjZV90eXBlIjo4LCJyZXNvdXJjZV9pZCI6IiIsInByb2R1Y3RfaWQiOiJwXzVlODZhNThjOTMwNGVfVzRBVnJ3aFYiLCJhcHBfaWQiOiJhcHA1WDFGelZXaDE2NjUifQ'
                    },
                    { index:5,src:'../../static/image/list/t6.png',
                    url:'https://app5X1FzVWh1665.h5.xiaoeknow.com/mp/eyJpZCI6MTAwOTcxMX0'
                    },
                ],
                // 研刷题系统
                test1:[
                    { index:0,src:'../../static/image/shuati/i1.png',title:'基础知识',
                        url:'https://app5X1FzVWh1665.h5.xiaoeknow.com/content_page/eyJ0eXBlIjozLCJyZXNvdXJjZV90eXBlIjo4LCJyZXNvdXJjZV9pZCI6IiIsInByb2R1Y3RfaWQiOiJwXzVlODZiYmUwYzgzNjlfWUdTZVNnVG8iLCJhcHBfaWQiOiJhcHA1WDFGelZXaDE2NjUifQ'
                    },
                    { index:1,src:'../../static/image/shuati/i2.png',title:'我的收藏',
                        url:'https://app5X1FzVWh1665.h5.xiaoeknow.com/content_page/eyJ0eXBlIjozLCJyZXNvdXJjZV90eXBlIjo4LCJyZXNvdXJjZV9pZCI6IiIsInByb2R1Y3RfaWQiOiJwXzVlODZjZjM4YmZhODVfNjBLT0h1bWwiLCJhcHBfaWQiOiJhcHA1WDFGelZXaDE2NjUifQ'
                    },
                    { index:2,src:'../../static/image/shuati/i3.png',title:'冲刺必备',
                        url:'https://app5X1FzVWh1665.h5.xiaoeknow.com/content_page/eyJ0eXBlIjozLCJyZXNvdXJjZV90eXBlIjo4LCJyZXNvdXJjZV9pZCI6IiIsInByb2R1Y3RfaWQiOiJwXzVlODZhNDIyZDBkZGNfSWhmelBZYUwiLCJhcHBfaWQiOiJhcHA1WDFGelZXaDE2NjUifQ'
                    },
                    { index:3,src:'../../static/image/shuati/i4.png',title:'模拟考试',
                        url:'https://app5X1FzVWh1665.h5.xiaoeknow.com/content_page/eyJ0eXBlIjozLCJyZXNvdXJjZV90eXBlIjo4LCJyZXNvdXJjZV9pZCI6IiIsInByb2R1Y3RfaWQiOiJwXzVlODZhYjA5MmNmYmRfZFg0bHZGeVYiLCJhcHBfaWQiOiJhcHA1WDFGelZXaDE2NjUifQ'
                    },
                    { index:4,src:'../../static/image/shuati/i5.png',title:'专项刷题',
                        url:'https://app5X1FzVWh1665.h5.xiaoeknow.com/content_page/eyJ0eXBlIjozLCJyZXNvdXJjZV90eXBlIjo4LCJyZXNvdXJjZV9pZCI6IiIsInByb2R1Y3RfaWQiOiJwXzVlODZhNThjOTMwNGVfVzRBVnJ3aFYiLCJhcHBfaWQiOiJhcHA1WDFGelZXaDE2NjUifQ'
                    },
                ],
                modalFlag:false,// 用户信息模态框的显示隐藏
                phoneFlag:false,// 电话号码模态框的显示隐藏
                tools:[
                    { index:0,url:'/pages/index/toolbox/material',src:'../../static/image/icon/t1.png',title:'专业课资料' },
                    { index:1,url:'/pages/index/toolbox/questionbank',src:'../../static/image/icon/t2.png',title:'公共课真题' },
                    { index:2,url:'/pages/index/toolbox/plan',src:'../../static/image/icon/t3.png',title:'全程复习规划' },
                    { index:3,url:'/pages/index/toolbox/library',src:'../../static/image/icon/t4.png',title:'专业库' },
                    { index:4,url:'/pages/index/toolbox/markline',src:'../../static/image/icon/t5.png',title:'历年分数线' },
                    { index:5,url:'/pages/index/toolbox/commonsense',src:'../../static/image/icon/t6.png',title:'考研常识包' },
                ],
                buyVip:false,
                isVip:false, // 用户是不是VIP
            };
        },
        onShareAppMessage: function () {},
        onShow() {
            // 判断用户是否登陆
            if(!uni.getStorageSync('token')) this.modalFlag = true;
            // 获取轮播图
            this.getBanner()
        },
        methods: {
            // 获取轮播图片
            async getBanner(){
                let res = await this.$api.getBanners()
                console.log(res);
                this.swiperList = res.rows
            },
            // 前往搜索
            toSearch(){
                uni.navigateTo({url:'/pages/index/search/index?search='+this.searchContent})
            },
            // 前往保录系统
            toAdjust(){
                uni.navigateTo({
                    url:'/pages/index/adjust/index'
                })
            },
            // 前往检索页面
            toSearchfors(id){
                uni.navigateTo({
                    url:'/pages/index/searchfor/index?id='+id
                })
            },
            // 前往择校测试
            testSchool(index){
                console.log(index);
                if(index == 1){
                    uni.showToast({
                        title:'正在开发中...',
                        icon:'none'
                    })
                    return
                }else{
                    uni.navigateTo({
                        url:'/pages/index/test/choseSchool?status='+index
                    })
                }

            },
            // 前往外部链接
            goWebview(url){
                uni.navigateTo({
                    url:`/pages/components/webview/webview?url=${url}`
                })
            },
            // 学习充电站
            goOtherWechat(item){
                wx.navigateToMiniProgram({
                    appId: 'wx2864bc500c102133',
                })
            },
            // 研刷题系统
            goShuati(item){
                wx.navigateToMiniProgram({
                    appId: 'wx56bb8d1ca3bbf306',
                })
            },

            // 工具箱前往其他链接
            async tourl(item){
                console.log(item);
                // 查询用户电话号码
                let data = {userId : uni.getStorageSync('openid')},resp = await this.$api.selectUser(data)
                console.log(resp);
                if(resp.result.phone){
                    uni.setStorage({key: 'phone', data: resp.result.phone});
                    uni.navigateTo({url:item.url})
                }else{
                    this.phoneFlag = true;
                }
            },
            // 用户登陆
            getUserInfo(){
                uni.login({
                    success:async res=>{
                        let data = {
                                code : res.code
                            },
                            respCode = await this.$api.getOpenId(data);
                        console.log(respCode);
                        this.modalFlag = false
                        uni.setStorage({key: 'openid', data: respCode.openid});
                        uni.setStorage({key: 'session_key', data: respCode.session_key});
                        uni.showLoading({title:'登陆中，请稍后……',mask:true,})
                        uni.setStorage({key: 'token', data: res.code,success:()=>{uni.hideLoading()}});
                    }
                });

            },
            // 获取用户手机号码
            async getUserPhone(e){
                console.log(e);
                this.phoneFlag = false
                uni.login({
                    success:async res=>{
                        let data = {code : res.code}, respCode = await this.$api.getOpenId(data);
                        uni.setStorage({key: 'openid', data: respCode.openid});
                        uni.setStorage({key: 'session_key', data: respCode.session_key});
                        uni.setStorage({key: 'token', data: res.code,success:()=>{uni.hideLoading()}});
                        if(e.detail.errMsg == 'getPhoneNumber:ok'){
                            let data = {
                                    ivData: e.detail.iv,
                                    encrypData: e.detail.encryptedData,
                                    sessionKey: uni.getStorageSync('session_key'),
                                    openId: uni.getStorageSync('openid'),
                                },
                                resp = await this.$api.decrypt(data);
                            console.log(resp);
                            if(resp.code == 200){
                                uni.setStorage({key: 'phone', data: resp.result});
                            }
                        }
                    }
                });
            },
            // 用户购买会员,弹出框提示
            buyMember(){
                // if( uni.getStorageSync('isVip') == false){
                //     this.buyVip = true
                // }else{
                //     uni.showModal({
                //         title:'温馨提示',
                //         content:'您已经是会员了',
                //         showCancel:false
                //     })
                // }
                uni.navigateTo({
                    url : '/pages/index/buy/index'
                })

            },
            // 用户下单
            async gobuyVip(){
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
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    .content {
        .uni-padding-wrap {
            width: 100%;
            position: relative;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;

            .swiper {
                height: 350upx;
                .swiper-item{
                    height: 100%;
                    img{
                        height: 100%;
                    }
                }

            }
        }
        .system{
            box-sizing: border-box;
            height: 100upx;
            overflow: hidden;
            margin: 30upx 50upx;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .search-content{
            box-sizing: border-box;
            padding: 0 45upx;
            overflow: hidden;
            margin: 20upx auto 30upx auto ;
            .search-header{
                width: 100%;    
                height: 70upx;
                background-color: #cbd8d5;
                border-radius: 10upx;
                padding: 0 20upx;
                margin-bottom:30upx;
                .flex{
                    height: 100%;
                    text{
                        font-size: 30upx;
                        color: #8C8C8C;
                        margin-right: 10upx;
                    }
                    input{
                        color: #8C8C8C;
                        font-size: 24upx;
                        width: 100%;
                    }
                }
            }
            .search-direction{
                text-align: center;
                flex:1;
                view{
                    box-sizing: border-box;
                    width: 33.33%;
                    height: 100%;
                    font-size: 26upx;
                    img{
                        width: 120upx;
                        height: 120upx;
                        display: block;
                        margin: 0 auto 20upx auto;
                    }
                    text{
                        color: #000;
                        font-size: 24upx;
                    }
                }
            }
        }
        .recommend{
            overflow: hidden;
            margin: 10upx 45upx 30upx 45upx;
            img{
                width: 100%;
                height: 80upx;
            }
        }
        .tools-item{
            box-sizing: border-box;
            padding: 0 30upx;
            .test-list{
                margin-top: 20upx;
                .test-list-title{
                    position: relative;
                    text{
                        font-size: 32upx;
                        font-weight: 600;
                        color: #000;
                        padding-left: 14upx;
                    }
                    &:after{
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        z-index: 9;
                        width: 6upx;
                        height: 34upx;
                        background-color: #1AD3CD;
                    }
                }
            }
            .test-list-content{
                .text-item{
                    position: relative;
                    height: 90upx;
                    margin-bottom: 20upx;
                    background-repeat: no-repeat;
                    background-size: cover;
                    justify-content: space-between;
                    padding: 0 66upx 0 38upx;
                    >img{
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: -1;
                        width: 100%;
                        height: 100%;
                    }
                    &:first-child{
                        margin-top: 20upx;
                    }
                    text{
                        color: #000;
                        font-size: 26upx;
                        &:first-child{
                            color: #fff;
                        }
                    }
                }
            }
            .tools-list{
                box-sizing: border-box;
                justify-content: space-between;
                align-content: center;
                flex-wrap: wrap;
                text-align: center;
                button{
                    width: 30%;
                    margin-top: 30upx;
                    background-color: transparent;
                    border: none;
                    line-height: 1.5;
                    view{
                        background-color: transparent;
                        font-size: 0;
                        img{
                            width: 110upx;
                            height: 110upx;
                        }
                    }
                    text{
                        font-size: 24upx;
                    }
                    &:after{
                        display: none;
                    }
                }
                navigator{
                    width: 30%;
                    margin-top: 30upx;
                    background-color: transparent;
                    view{
                        background-color: transparent;
                        img{
                            width: 110upx;
                            height: 110upx;
                        }
                        text{
                            font-weight: bold;
                            font-size: 24upx;
                        }
                    }

                }
            }
            .study-list{
                margin-top: 20upx;
                box-sizing: border-box;
                align-content: center;
                flex-wrap: wrap;
                text-align: center;
                view{
                    width: 33.3%;
                    margin-bottom: 30upx;
                    background-color: transparent;
                    box-sizing: border-box;
                    padding: 0 20rpx;
                    font-size: 0;
                    img{
                        margin: 0 auto;
                        height: auto;
                    }
                }
            }
        }
        .member{
            position: fixed;
            right: 40upx;
            bottom:40upx;
            width: 100upx;
            height: 100upx;
            border-radius: 50%;
            display: flex;
            align-items: center;
            overflow: hidden;
            z-index: 99;
            background-color: #eee;
            text-align: center;
            text{
                display: block;
                width: 70%;
                margin: 0 auto;
                font-size: 24upx;
            }
        }
    }
</style>

