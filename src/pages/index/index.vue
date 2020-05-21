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
                            :interval="interval"
                            class="swiper"
                    >
                        <swiper-item :key="item.id" v-for="(item,index) in swiperList">
                            <view class="swiper-item"><img :src="item.url" alt="" mode="aspectFill"></view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
        <view class="search-content">
            <view class="ml30">院校库</view>
            <view class="flex">
                <view class="flex">
                    <input placeholder="请输入学校" type="text">
                    <text class="cuIcon-search"></text>
                </view>
                <button class="cu-btn bg-black lg">搜索</button>
            </view>
            <view class=" search-direction flex">
                <view>按分数检索</view>
                <view>按专业检索</view>
                <view>按研究方向检索</view>
            </view>
        </view>
        <view class="system">
            <img alt="" src="../../static/image/icon/button.png">
            <text>调剂保录系统</text>
        </view>
        <view class="recommend m30 bg-red">
            <text>输入你的需求AI一键推荐</text>
            <button class="cu-btn">智能推荐</button>
        </view>
        <view class="test-list">
            <view class="test-list-title">研测试 | 测测你与梦想的距离！</view>
            <view class="recommend m30 bg-blue">
                <text>择校测试 | 你选对学校了吗？</text>
                <button class="cu-btn">开始测试</button>
            </view>
            <view class="recommend m30 bg-blue">
                <text>能力测试 | 你离国家线有多远？</text>
                <button class="cu-btn">开始测试</button>
            </view>
            <view class="recommend m30 bg-blue">
                <text>专业测试 | 你适合读什么专业？</text>
                <button class="cu-btn">开始测试</button>
            </view>
        </view>
        <view class="tools">
            <view class="tools-title">考研工具箱</view>
            <view class="tools-list flex">
                <navigator hover-class="none" url="/pages/index/index">
                    <view><img src="../../static/image/icon/tool.png" alt=""></view>
                    <text>专业课资料</text>
                </navigator>
                <navigator hover-class="none" url="/pages/index/index">
                    <view><img src="../../static/image/icon/tool.png" alt=""></view>
                    <text>公共课真题</text>
                </navigator>
                <navigator hover-class="none" url="/pages/index/index">
                    <view><img src="../../static/image/icon/tool.png" alt=""></view>
                    <text>全程复习规划</text>
                </navigator>
                <navigator hover-class="none" url="/pages/index/index">
                    <view><img src="../../static/image/icon/tool.png" alt=""></view>
                    <text>专业库</text>
                </navigator>
                <navigator hover-class="none" url="/pages/index/index">
                    <view><img src="../../static/image/icon/tool.png" alt=""></view>
                    <text>历年分数线</text>
                </navigator>
                <navigator hover-class="none" url="/pages/index/index">
                    <view><img src="../../static/image/icon/tool.png" alt=""></view>
                    <text>考研常识包</text>
                </navigator>
            </view>
        </view>
        <view class="tools learning">
            <view class="tools-title">学习充电站</view>
            <view class="tools-list flex">
                <navigator hover-class="none" url="/pages/index/index">
                    <view><img src="../../static/image/icon/t1.png" alt=""></view>
                </navigator>
                <navigator hover-class="none" url="/pages/index/index">
                    <view><img src="../../static/image/icon/t1.png" alt=""></view>
                </navigator>
                <navigator hover-class="none" url="/pages/index/index">
                    <view><img src="../../static/image/icon/t1.png" alt=""></view>
                </navigator>
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
                swiperList: [
                    {
                        id: 0,
                        type: 'image',
                        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
                    }, {
                        id: 1,
                        type: 'image',
                        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
                    }, {
                        id: 2,
                        type: 'image',
                        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
                    }, {
                        id: 3,
                        type: 'image',
                        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
                    }, {
                        id: 4,
                        type: 'image',
                        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
                    }, {
                        id: 5,
                        type: 'image',
                        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
                    }, {
                        id: 6,
                        type: 'image',
                        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
                    }
                ],
            };
        },
        onLoad() {
        },
        methods: {}
    };
</script>

<style lang="scss" type="text/scss" scoped>
    .content {
        padding-bottom: 50upx;
        .uni-padding-wrap {
            width: 100%;
            height: 350upx;
            .swiper {
                height: 350upx;
                img{
                    max-width: 100%;
                    height: 350upx;
                }
            }
        }
        .search-content{
            box-sizing: border-box;
            padding: 0 30upx;
            overflow: hidden;
            margin-top: 10upx;
            .flex{
                margin: 10upx 0;
                justify-content: space-between;
                align-items: center;
                flex-wrap: nowrap;
                .flex{
                    width: 70%;
                    box-sizing: border-box;
                    padding: 0 20upx;
                    height: 60upx;
                    justify-content: flex-start;
                    align-items: center;
                    border-radius: 10upx;
                    border: 2px solid #000;
                    input{
                        width: 100%;
                    }
                }
                .cu-btn{
                    height: 52upx;
                    font-size: 28upx;
                }
            }
            .search-direction{
                border-bottom: 2px solid #000;
                height: 60upx;
                line-height: 60upx;
                text-align: center;
                flex:1;
                view{
                    box-sizing: border-box;
                    width: 33.33%;
                    height: 100%;
                    font-size: 26upx;
                    border-left: 2px solid #000;
                    &:first-child{
                        border-left: 0;
                    }
                }
            }
        }
        .system{
            margin-top: 20upx;
            position: relative;
            z-index: 9;
            width: 100%;
            height: 140upx;
            line-height: 140upx;
            text-align: center;
            font-size: 50upx;
            img{
                width: 80%;
                height: 140upx;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                z-index: 1;
            }
            text{
                position: relative;
                z-index: 9;
            }
            &:after{
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                background-color: #000;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                z-index: -1;
            }
        }
        .recommend{
            overflow: hidden;
            position: relative;
            text-align: justify;
            height: 80upx;
            line-height: 80upx;
            button{
                float: right;
                height: 80upx;
                line-height: 80upx;
                border-radius: 10upx;
            }
        }
        .test-list{
            border: 2px dashed #ccc;
            .test-list-title{
                margin-top: 30upx;
                padding: 0 40upx;
                font-size: 28upx;
                font-weight: bold;
            }
        }
        .tools{
            .tools-title{
                height: 70upx;
                line-height: 70upx;
                box-sizing: border-box;
                border: 2px solid #444;
                text-align: center;
                margin: 30upx;
                font-size: 30upx;
                font-weight: bold;
                border-radius: 14upx;
                box-shadow:0px 0px 20px #1565fc inset,0px 0px 20px #1565fc;
            }
            .tools-list{
                position: relative;
                padding-bottom: 40upx;
                overflow: hidden;
                box-sizing: border-box;
                justify-content: space-between;
                align-content: center;
                flex-wrap: wrap;
                text-align: center;
                background-color: #b7d0f6;
                &:after{
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    width: 100%;
                    height: 200%;
                    background-color: #fff;
                    border-radius: 50%;
                    box-shadow:0px 0px 60upx #b7d0f6 inset,0px 0px 60upx #b7d0f6;
                }
                navigator{
                    position: relative;
                    z-index: 9;
                    width: 30%;
                    margin-top: 40upx;
                    background-color: transparent;
                    view{
                        background-color: transparent;
                        img{
                            width: 60upx;
                            height: 80upx;
                            margin-bottom: 20upx;
                        }
                        text{
                            font-weight: bold;
                            font-size: 28upx;
                        }
                    }

                }
            }
            &.learning{
                box-sizing: border-box;
                padding: 0 30upx;
                .tools-title{
                    box-shadow:0px 0px 20px #a7eecc inset,0px 0px 20px #a7eecc;
                }
                .tools-list{
                    background-color: #fff;
                    &:after{
                        display: none;
                    }
                    view{
                        width: 100%;
                        img{
                            width: 100%;
                            height: 200upx;
                        }
                    }
                }
            }
        }
    }

</style>

