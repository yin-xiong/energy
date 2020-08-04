<template>
    <view class="material body">
        <view class="material-head flex">
            <input type="text" placeholder="请输入专业名称搜索:" v-model="reqData.majorName">
            <button class="cu-btn bg-blue" @click="searchList">搜索</button>
        </view>
        <view class="material-content" v-if="list.length > 0">
            <view class="material-content-list" v-for=" ( item,index ) in list " :key="index" @click="toDetails(item)">
                <view class="material-content-list-title">{{item.majorName}}</view>
                <view class="material-content-list-desc">
                    门类类别:
                    {{item.categoryCode}}{{item.categoryName}}-{{item.subjectCode}}{{item.subjectName}}
                </view>
                <view class="material-content-list-desc">
                    专业类别:
                    <text v-if="item.type == 1">学术学位</text>
                    <text v-else>专业学位</text>
                </view>
            </view>
        </view>
        <nodata v-else />
        <hans-tabber :isActive="1" />
    </view>
</template>
<script>
    export default {
        data(){
            return{
                list:[],
                reqData:{
                    pageNum: 1,
                    pageSize: 20,
                    majorName:'',
                    orderByColumn: 'code',
                    isAsc: 'asc',
                }
            }
        },
        onShareAppMessage: function () {},
        onLoad(){
            this.reqData.page = 1
            this.getMajors(this.reqData)
        },
        // 上拉加载更多
        async onReachBottom(){
            this.reqData.page ++
            let res = await this.$api.getMajors(data)
            if(res.code == 200){
                console.log(res);
                this.list = [...this.list,...res.rows]
            }
        },
        methods:{
            // 获取列表
            async getMajors(data){
                let res = await this.$api.getMajors(data)
                if(res.code == 200){
                    console.log(res);
                    this.list = res.rows
                }
            },
            // 搜索
            searchList(){
                this.getMajors(this.reqData)
            },
            // 前往详情
            toDetails(val){
                console.log(val);
                console.log(val.composeCode);
                uni.navigateTo({
                    url:`/pages/index/searchfor/professional/index?composeCode=${val.composeCode}&nobook=5`
                })
            },
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .material{
        min-height: 100vh;
        background-color: #f8f8f8;
        .material-head{
            margin: 20upx;
            border-radius: 10upx;
            justify-content: space-between;
            align-items: center;
            border: 1upx solid #ccc;
            input{
                width: 70%;
                height: 70upx;
                box-sizing: border-box;
                padding: 0 10upx;
            }
            button{
                height: 70upx;
                border-radius: 10upx;
            }
        }
        .material-content{
            overflow: hidden;
            margin: 20upx;
            .material-content-list{
                border-radius: 10upx;
                border: 1upx solid #ccc;
                background-color: #fff;
                padding: 20upx;
                margin-bottom: 20upx;
                view{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #8b93a6;
                    line-height: 50upx;
                    &.material-content-list-title{
                        color:#000;
                        font-size: 32upx;
                        margin-bottom: 20upx;
                    }
                }
            }
        }
    }
</style>
