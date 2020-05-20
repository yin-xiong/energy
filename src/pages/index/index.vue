<template>
    <view class="content">
        <view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper
                            class="swiper"
                            :indicator-dots="indicatorDots"
                            :autoplay="autoplay"
                            :interval="interval"
                            :duration="duration"
                            :circular="circular"
                    >
                        <swiper-item v-for="(item,index) in swiperList" :key="item.id">
                            <view class="swiper-item"><img mode="aspectFill" :src="item.url" alt=""></view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
        <view class="search-content">
            <view class="ml30">院校库</view>
            <view class="flex">
                <view class="flex">
                    <input type="text" placeholder="请输入学校">
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
            <img src="../../static/image/icon/button.png" alt="">
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
        <view>
            <view>考研工具箱</view>
            <view>

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
                swiperList: [{
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
                }],
            };
        },
        onLoad() {
        },
        methods: {}
    };
</script>

<style lang="scss" type="text/scss">
    .content {
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
                height: 120upx;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                z-index: 1;
            }
            text{
                display: block;
                width: 100%;
                height: 100%;
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
    }

</style>

