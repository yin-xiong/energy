<template>
    <view class="userContent">
        我的
        <view class="flex userContent-head">
            <view class="userContent-head-img"><img src="../../static/image/icon/tool.png" alt=""></view>
            <view>
                <view>昵称:<text>xxx</text></view>
                <view>个性签名:<text>xxxxxxxxxx</text></view>
            </view>
        </view>
        <view>
            <view>
                <view>
                    <text>喔的院校心愿单</text>
                    <text class="border"><text class="cuIcon-usefullfill"></text></text>
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
    }
</style>
