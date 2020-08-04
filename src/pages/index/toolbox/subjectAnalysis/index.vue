<template>
    <view class="schoolSelection">
        <view class="flex" v-for="(item,index) in list" :key="index" @click="towebView(index)">
            <text>{{item.title}}</text>
        </view>
    </view>
</template>
<script>
    export default {
        data(){
            return{
                list:[
                    { index:0,title:'十三大学科门类概述' ,},
                    { index:1,title:'十三大学科之哲学' ,},
                    { index:2,title:'十三大学科之经济学' ,},
                    { index:2,title:'十三大学科之法学' ,},
                ],
                url:'https://www.kudistorage.com/ynl/profile/upload/2020/04/18/12f49eaa3264ccc32f5f03bfd978c7ce.png'

            }
        },
        onShareAppMessage: function () {},
        methods:{
            // 前往外部链接
            towebView(){
                uni.navigateTo({
                    url:`/pages/components/webview/webview?url=${this.url}`
                })
            },
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .schoolSelection{
        view{
            height: 120upx;
            margin: 20upx;
            background-color: #1AD3CD;
            border-radius: 10upx;
            padding:0 20upx;
            justify-content: space-between;
            align-items: center;
            flex-wrap: nowrap;
            font-size: 32upx;
            text{
                color:#fff;
            }
        }
    }
</style>
