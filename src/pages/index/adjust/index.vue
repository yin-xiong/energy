<template>
    <view class="adjust body">
        <view class="adjust-title" @click="toAdjustList">院校调剂公告（实时更新）</view>
        <view class="adjust-content">
            <view class="flex">
                <img src="../../../static/image/icon/user.png" alt="">
                <text>考研调剂保录服务</text>
            </view>
            <view class="adjust-content-ext">
                <view>本服务为需要调剂的考生提供保录服务，本服务为付费项目，想要确保调剂录取的同学需填写申请，会有专业的调剂咨询顾问与您联系。</view>
                <view>本产品采取线上签约，不过退费的形式，切实保证您的利益。</view>
                <view class="adjust-content-ext-btn"><button class="lg" @click="toApplytable">点击申请</button></view>
            </view>
        </view>
        <hans-tabber :isActive="1" />
    </view>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        onShareAppMessage: function () {},
        methods:{
            // 前往院校调剂公告列表
            toAdjustList(){
                uni.navigateTo({
                    url:'/pages/index/adjust/list'
                })
            },
            // 前往院校调剂申请表格
            toApplytable(){
                uni.navigateTo({
                    url:'/pages/index/adjust/applytable'
                })
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .adjust{
        .adjust-title{
            border: 1px solid #000;
            margin: 20upx 10upx;
            padding: 10upx;
            font-size: 32upx;
            font-weight: bold;
        }
        .adjust-content{
            margin:0 10upx;
            padding: 10upx;
            border: 1px solid #000;
            .flex{
                flex-wrap: nowrap;
                align-items: center;
                font-size: 36upx;
                font-weight: bold;
                img{
                    width: 100upx;
                    height: 100upx;
                    margin-right: 20upx;
                }
            }
            .adjust-content-ext{
                text-align: justify;
                font-weight: bold;
                font-size: 32upx;
                margin-top: 20upx;
                .adjust-content-ext-btn{
                    text-align: right;
                    button{
                        font-size: 30upx;
                        font-weight: inherit;
                        display: inline-block;
                        margin: 0;
                        width: 200upx;
                        line-height: 2;
                        color: #fff;
                        background-color: #5f96e8;
                        border-radius: 0;
                    }
                }
            }
        }
    }
</style>
