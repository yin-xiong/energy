<template>
    <view class="plan body">
        <view class="plan-list" v-for="(item,index) in list1" :key="index" @click="towebView(item.content)">
            <text>{{item.title}}</text>
        </view>
        <view class="plan-list" v-for="(item,index) in list2" :key="index" @click="towebView(item.content)">
            <text>{{item.title}}</text>
        </view>
        <hans-tabber :isActive="1" />
    </view>
</template>
<script>
    export default {
        data(){
            return{
                list1:[],
                list2:[],
            }
        },
        async onLoad(){
            this.getTool1(1)
            this.getTool2(2)
        },
        onShareAppMessage: function () {},
        methods:{
            // 前往外部链接
            towebView(content){
                console.log(content);
                let data = {
                    content
                };
                let jsonData = JSON.stringify(data)
                uni.navigateTo({
                    url:'/pages/index/toolbox/plan/index?jsonData=' + encodeURIComponent(JSON.stringify(content))
                })
            },
            async getTool1(type){
                let data = {type},res;
                 res = await this.$api.getTool(data)
                console.log(res);
                 this.list1 = res.rows
            },
            async getTool2(type){
                let data = {type},res;
                res = await this.$api.getTool(data)
                console.log(res);
                this.list2 = res.rows
            },
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .plan{
        width: 100vw;
        height: 100vh;
        background-color: #f8f8f8;
        box-sizing: border-box;
        padding: 20upx;
        .plan-list{
            height: 120upx;
            line-height: 120upx;
            border-radius: 10upx;
            background-color: #fff;
            border: 1px solid #eee;
            margin-bottom: 20upx;
            padding: 0 20upx;
        }
    }
</style>
