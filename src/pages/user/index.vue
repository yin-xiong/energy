<template>
    <view class="userContent">
        <view class="flex userContent-head">
            <view class="userContent-head-img">
                <img  :src=" userInfo.avatar || userImg " />
            </view>
            <view>
                <view>
                    昵称:<text>{{userInfo.nickname}}</text>
                </view>
                <view>电话:<text>{{userInfo.phone}}</text></view>
            </view>
        </view>
        <view class="userContent-list">
            <view :class=" wishFlag ? 'active item-list' : 'item-list' ">
                <view class="item-list-head flex justify-between align-center" @click="wishFlag = !wishFlag">
                    <text class="item-list-head-left">我的院校心愿单</text>
                    <text class="cuIcon-right"></text>
                </view>
                <view class="item-list-ext" v-if="wish">
                    <navigator
                            v-for="(item,index) in wish" :key="index"
                            v-if="index < 2"
                            class="flex justify-between align-center"
                            hover-class="none"
                            :url="'/pages/index/searchDetail/index?code='+item.schoolCode"
                    >
                        <view>{{item.schoolName}} {{item.schoolCode}}</view>
                        <text>查看</text>
                    </navigator>
                </view>
            </view>

            <view :class=" schoolsFlag ? 'active item-list' : 'item-list' ">
                <view class="item-list-head flex justify-between align-center" @click="schoolsFlag = !schoolsFlag">
                    <text class="item-list-head-left">我关注的学校</text>
                    <text class="cuIcon-right"></text>
                </view>
                <view class="item-list-ext" v-if="schools">
                    <navigator
                            v-for="(item,index) in schools" :key="index"
                            class="flex justify-between align-center"
                            hover-class="none"
                            :url="'/pages/index/searchDetail/index?code='+item.schoolCode"
                    >
                        <view>{{item.schoolName}} {{item.schoolCode}}</view>
                        <text>查看</text>
                    </navigator>
                </view>
            </view>

            <view :class=" buyFlag ? 'active item-list' : 'item-list' " >
                <view class="item-list-head flex justify-between align-center" @click="buyFlag = !buyFlag">
                    <text class="item-list-head-left">我的已购</text>
                    <text class="cuIcon-right"></text>
                </view>
                <view class="item-list-ext" v-if="buys">
                    <navigator
                            v-for="(item,index) in buys" :key="index"
                            class="flex justify-between align-center"
                            hover-class="none"
                            :url="'/pages/index/searchDetail/index?code='+item.schoolCode"
                    >
                        <view>{{item.schoolName}} {{item.schoolCode}}</view>
                        <text v-if="item.type && item.type ==1" :class="item.type ==1?'active':''">代开通</text>
                        <text v-else>查看</text>
                    </navigator>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                userInfo:{},
                userImg:'../../static/image/icon/user.png',
                list: [
                    {
                        index: 0,
                        title: '我的院校心愿单',
                        flag: false,
                        lists: [
                            {index: 0, title: '兰州大学 0101哲学', type: 1},
                            {index: 1, title: '重庆大学 0101哲学'},
                            {index: 2, title: '东北大学 0101哲学'},
                            {index: 3, title: '清华大学 0101哲学'},
                        ]
                    },
                    {
                        index: 1,
                        title: '我关注的学校',
                        flag: false,
                        lists: [
                            {index: 0, title: '兰州大学 0101哲学'},
                            {index: 1, title: '重庆大学 0101哲学'},
                            {index: 2, title: '东北大学 0101哲学'},
                            {index: 3, title: '清华大学 0101哲学'},
                        ]
                    },
                    {
                        index: 2,
                        flag: false,
                        title: '我的已购',
                        lists: [
                            {index: 0, title: '英语四级'},
                            {index: 1, title: '专业课资料010101'},
                        ]
                    },
                ],

                wishFlag:false,// 我的心愿单点击关闭
                wish:[],// 我的心愿单

                schoolsFlag:false,// 我的关注学校单点击关闭
                schools:[],// 我的关注学校

                buyFlag:false,// 我的关注学校单点击关闭
                buys:[],// 我的关注学校
            }
        },
        onLoad(){

        },
        onShareAppMessage: function () {},
        onShow(){
            // 获取用户信息
            this.getUserInfo()
            // 获取用户心愿单
            this.getMyWish()
        },
        methods: {
            // 获取用户信息
            async getUserInfo(){
                let data = {
                    userId : uni.getStorageSync('openid')
                },resp = await this.$api.selectUser(data)
                this.userInfo =  resp.result
            },
            // 获取用户心愿单
            async getMyWish(){
                let data = {userId:uni.getStorageSync('token'),}, res = await this.$api.myWish(data);
                if(res.code == 200){
                    this.wish = res.result['1']
                    console.log(this.wish);
                    this.schools = res.result['2']
                    console.log(this.schools);
                }
            },
            // 展开当前列表
            showItem(index) {
                // 关闭所有展开项
                for( let i of this.list ){i.flag = false}
                // 打开当前项，或者再次点击就关闭当前项
                this.list[index].flag = !this.list[index].flag
                console.log(this.list[index].flag);
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .userContent {
        box-sizing: border-box;
        min-height: 100vh;
        background-color: #fafafa;
        .userContent-head {
            height: 250upx;
            padding: 0 30upx;
            background-image: url('../../static/image/icon/userbg.png');
            background-repeat: no-repeat;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: nowrap;
            .userContent-head-img {
                width: 140upx;
                height: 140upx;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 20upx;
                img {width: 140upx;height: 140upx;}
            }
            view {
                font-size: 28upx;
                text {margin-left: 8upx;font-size: 26upx;}
            }
        }
        .userContent-list {
            padding: 0 30upx;
            .item-list {
                border-bottom: 1upx solid #ccc;
                &.active{
                    .item-list-head{ .cuIcon-right{transform: rotate(90deg);} }
                    .item-list-ext{height: auto;}
                }
                &:last-child {border-bottom: 0;}
                .item-list-head {
                    height: 82upx;
                    box-sizing: border-box;
                    font-size: 32upx;
                    .item-list-head-left {
                        position: relative;
                        text-indent: 20upx;
                        &:after {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 0;
                            bottom: 0;
                            margin: auto;
                            width: 6upx;
                            height: 36upx;
                            background-color: #1AD3CD;
                        }
                    }
                    .cuIcon-right {
                        display: inline-block;
                        transition: all .4s;
                    }
                }
                .item-list-ext {
                    overflow: hidden;
                    height: 0;
                    transition: height 1s;
                    background-color: #fff;
                    border-radius: 10upx;
                    navigator {
                        height: 90upx;
                        border-bottom: 1upx solid #ccc;
                        box-sizing: border-box;
                        margin: 0 20upx;
                        &:last-child {border-bottom: 0;}
                        view {font-size: 30upx;}
                        text {
                            width: 120upx;
                            height: 46upx;
                            line-height: 46upx;
                            text-align: center;
                            background-color: #1AD3CD;
                            color: #fff;
                            font-size: 26upx;
                            border-radius: 10upx;
                            &.active {background-color: #fc3810;}
                        }
                    }
                }
            }
        }
    }
</style>
