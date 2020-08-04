<template>
    <view class="material body">
        <view class="material-top-img">
            <img mode="widthFile" src="../../../static/image/list/zhenti.jpg" alt="">
        </view>
        <view class="material-list">
            <view class="material-list-top">
                <view class="material-title">公共课</view>
                <view class="material-cont flex align-center justify-between">
                    <view class="flex align-center" v-for="( item,index ) in list" :key="index" v-if="index < 6" @click="toDetails(item)">
                        <img src="../../../static/image/icon/folder.png" alt=""><text>{{item.courseName}}</text>
                    </view>
                </view>
            </view>
            <view class="material-list-bom">
                <view class="material-title">统考类专业课</view>
                <view class="material-cont flex align-center justify-between">
                    <view class="flex align-center" v-for="( item,index ) in list" :key="index" v-if="index >= 6" @click="toDetails(item)">
                        <img src="../../../static/image/icon/folder.png" alt=""><text>{{item.courseName}}</text>
                    </view>
                </view>
            </view>
        </view>

        <hans-tabber :isActive="1" />
    </view>
</template>
<script>
    export default {
        data(){
            return{
                list:[]
            }
        },
        onLoad(){
            this.getCourses()
        },
        onShareAppMessage: function () {},
        methods:{
            // 获取公共课列表
            async getCourses(){
                let res = await this.$api.getCourses()
                if(res.code == 200){
                    this.list = res.rows
                }
            },
            // 前往详情
            toDetails(item){
                console.log(item.id);
                uni.navigateTo({
                    url:`/pages/index/toolbox/questionbankdetails?id=${item.id}`
                })
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .material{
        min-height: 100vh;
        background-color: #f8f8f8;
        .material-top-img{
            width: 100%;
            font-size: 0;
            img{
                width: 100%;
                height: 350upx;
            }
        }
        .material-list{
            box-sizing: border-box;
            margin:0 20px;
            .material-title{
                color: #000;
                font-size: 32upx;
                letter-spacing: 2upx;
                margin-top: 20upx;
            }
            .material-cont{
                flex-wrap: wrap;
                view{
                    margin-top: 20upx;
                    width: 48%;
                    height: 100upx;
                    box-sizing: border-box;
                    background-color: #fff;
                    color: #8B93A6;
                    img{
                        width: 80upx;
                        height: 80upx;
                        margin: 0 20upx;
                    }
                    text{
                        width: 50%;
                        display: inline-block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
</style>