<template>
    <view class="userContent">
        <view class="flex userContent-head">
            <view class="userContent-head-img"><img src="../../static/image/icon/tool.png" alt=""></view>
            <view>
                <view>昵称:<text>xxx</text></view>
                <view>个性签名:<text>xxxxxxxxxx</text></view>
            </view>
        </view>
        <view class="userContent-list">
            <view class="item-list">
                <view class="item-list-head flex">
                    <text>我的院校心愿单</text>
                    <text class="border"><text class="cuIcon-usefullfill"></text></text>
                </view>
                <view class="item-list-ext">
                    <navigator class="flex" hover-class="none" url="/pages/index/index">
                        <view>兰州大学 0101哲学</view>
                        <text>查看</text>
                    </navigator>
                    <navigator class="flex" hover-class="none" url="/pages/index/index">
                        <view>重庆大学 0101哲学</view>
                        <text class="active">代开通</text>
                    </navigator>
                    <navigator class="flex" hover-class="none" url="/pages/index/index">
                        <view>东北大学 0101哲学</view>
                        <text>查看</text>
                    </navigator>
                    <navigator class="flex" hover-class="none" url="/pages/index/index">
                        <view>清华大学 0101哲学</view>
                        <text>查看</text>
                    </navigator>
                </view>
            </view>
            <view class="item-list">
                <view class="item-list-head flex">
                    <text>我关注代学校</text>
                    <text class="border"><text class="cuIcon-usefullfill"></text></text>
                </view>
                <view class="item-list-ext">
                    <navigator class="flex" hover-class="none" url="/pages/index/index">
                        <view>兰州大学</view>
                        <text>查看</text>
                    </navigator>
                    <navigator class="flex" hover-class="none" url="/pages/index/index">
                        <view>四川大学</view>
                        <text>查看</text>
                    </navigator>
                    <navigator class="flex" hover-class="none" url="/pages/index/index">
                        <view>重庆大学</view>
                        <text>查看</text>
                    </navigator>
                    <navigator class="flex" hover-class="none" url="/pages/index/index">
                        <view>西北政法大学</view>
                        <text>查看</text>
                    </navigator>
                </view>
            </view>
            <view class="item-list">
                <view class="item-list-head flex">
                    <text>我的已购</text>
                    <text class="border"><text class="cuIcon-usefullfill"></text></text>
                </view>
                <view class="item-list-ext">
                    <navigator class="flex" hover-class="none" url="/pages/index/index">
                        <view>英语四级</view>
                        <text>查看</text>
                    </navigator>
                    <navigator class="flex" hover-class="none" url="/pages/index/index">
                        <view>专业课资料010101</view>
                        <text>查看</text>
                    </navigator>
                    <navigator class="flex" hover-class="none" url="/pages/index/index">
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" type="text/scss" scoped>
    .userContent{
        box-sizing: border-box;
        padding: 0 30upx;
        .userContent-head{
            justify-content: flex-start;
            align-items: center;
            flex-wrap: nowrap;
            border-bottom: 1px solid #000;
            padding-bottom: 20upx;
            .userContent-head-img{
                width: 100upx;
                height: 100upx;
                border-radius: 50upx;
                overflow: hidden;
                border: 1px solid #000;
                margin-right: 20upx;
                img{
                    width: 100%;
                }
            }
            view{
                font-size: 28upx;
            }
        }
        .userContent-list{
            .item-list{
                .item-list-head{
                    box-sizing: border-box;
                    padding: 2upx 14upx;
                    margin-top: 16upx;
                    font-size: 32upx;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: nowrap;
                    border: 1upx solid #000;
                    .border{
                        display: inline-block;
                        width: 30upx;
                        height: 30upx;
                        line-height: 30upx;
                        text-align: center;
                        font-size: 20upx;
                        text{
                            position: relative;
                            right: -1px;
                            transform: scale(.7);
                        }
                    }
                }
                .item-list-ext{
                    margin: 12upx auto;
                    overflow: hidden;
                    navigator{
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: nowrap;
                        line-height: 1.75;
                        view{
                            font-size: 30upx;
                        }
                        text{
                            width: 100upx;
                            text-align: center;
                            background-color: #fc3810;
                            color: #fff;
                            font-size: 26upx;
                            &.active{
                                background-color: #a7a7a7;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
