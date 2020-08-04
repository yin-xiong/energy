<template>
    <view class="commonsense body">
        <view class="commonsense-list flex" @click="timeAxis">
            <text>考研时间轴</text>
        </view>
        <view class="commonsense-list flex" @click="schoolSelection">
            <text>专业院校选择</text>
        </view>
        <view class="commonsense-list flex" @click="subjectAnalysis">
            <text>十三大学科分析</text>
        </view>
        <hans-tabber :isActive="1" />
    </view>
</template>
<script>
    export default {
        data(){
            return{
                url:'https://www.kudistorage.com/ynl/profile/upload/2020/05/06/1cac35e0be49d5c511b2c4cb0ee69f05.png',
            }
        },
        onShareAppMessage: function () {},
        methods:{
            // 考研时间轴
            timeAxis(){
                uni.navigateTo({
                    url:`/pages/index/toolbox/box/box1?id=5&type=1`
                })
            },
            // 专业院校选择
            schoolSelection(){
                uni.navigateTo({
                    url:`/pages/index/toolbox/box/box2`
                })
            },
            // 十三大学科分析
            subjectAnalysis(){
                uni.navigateTo({
                    url:`/pages/index/toolbox/box/box3?id=5&type=3`
                })
            },
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .commonsense{
        .commonsense-list{
            height: 120upx;
            margin: 20upx;
            background-color: #1AD3CD;
            border-radius: 10upx;
            padding:0 20upx;
            justify-content: space-between;
            align-items: center;
            flex-wrap: nowrap;
            font-size: 32upx;
            color:#fff;
            img{
                width: 110upx;
                height: 70upx;
            }
        }
    }
</style>
