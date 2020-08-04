<template>
    <view class="searchContent body">
        <view class="flex align-center searchContentTop justify-between">
            <input type="text"  :placeholder="keyword || '请输入搜索内容' " @blur="getText" />
            <button class="cu-btn bg-blue" @click="getList"><text class="cuIcon-search"></text>搜索</button>
        </view>
        <template v-if="list.length > 0">
            <view class="searchContent-title">{{searchContent}}</view>
            <view class="searchContent-list">
                <view v-for="item in list" :data-code="item.code"
                      @click="toSchoolDetail(item.code)" class="cu-item align-center flex"
                      :key="item.code">
                    <view v-if="item.avatar" class="cu-avatar round "
                          :style=" 'background-image:url('+item.avatar+')'"
                    ></view>
                    <view class="cu-item-content">
                        <view class="cu-item-content-head align-center justify-between flex">
                            <text>{{item.universityName}}</text><text class="icon">
                            <text class="cuIcon-attention"></text>{{item.reading}}</text>
                        </view>
                        <view class="cu-item-content-ext">
                            <view class="flex align-center">
                                <text v-for="titem in item.proSchoolState" :key="index">{{titem}}</text>
                            </view>
                        </view>
                        <view>
                            <text class="cuIcon-location"  style="margin-right: 30upx;">{{item.province}}</text>
                            <text class="cuIcon-cascades">{{item.universityType}}</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="nomore" v-if="nomore">没有更多高校 ···</view>
        </template>
        <nodata v-else />
        <hans-tabber :isActive="1" />
    </view>
</template>

<script>
    export default {
        data(){
            return{
                searchContent:'根据您的条件搜索到以下高校',// 用户传进来的条件
                nomore:false,
                pageNum:1,// 初试页
                keyword:'',// 搜索的关键词
                list:[],
            }
        },
        onLoad(option){
             if(option.search) this.searchContent = `根据您的条件 '${option.search}' 搜索到以下高校`
             this.keyword = option.search
             this.getSchoolList(option.search,1)
        },
        // 下拉刷新
        onPullDownRefresh(){
            this.page = 1
            this.getSchoolList(this.keyword,1)
            uni.stopPullDownRefresh();
        },
        //上拉加载更多
        async onReachBottom(){
            this.pageNum ++;
            let data = {
                universityName:this.keyword,
                pageNum:this.pageNum,
                pageSize:10
            },
                res = await this.$api.getSchoolList(data)
            if (res.code == 200 && res.rows.length > 0){
                this.list = [...this.list,...res.rows]
                this.nomore = false
            }else{
                this.nomore = true
            }
        },
        onShareAppMessage: function () {},
        methods:{
            // 输入框失去焦点
            getText(e){
                this.keyword = e.target.value
            },
            // 用户点击搜索
            getList(){
                this.getSchoolList(this.keyword,1)
                this.searchContent = `根据您的条件 '${this.keyword}' 搜索到以下高校`
                this.keyword = ''
            },
            // 获取查询的列表
            async getSchoolList(search,pageNum){
                let data = {
                    universityName:search,
                    pageNum,
                    pageSize:10
                }
                let res = await this.$api.getSchoolList(data)
                if (res.code == 200){
                    this.list = res.rows
                    this.keyword = ''
                }else{
                    uni.showModal({
                        title:"温馨提示",
                        content:'查询失败，请重新输入条件查询',
                        showCancel:false
                    })
                }
            },
            // 前往学校详情
            toSchoolDetail(code){
                console.log(code);
                uni.navigateTo({
                    url:'/pages/index/searchDetail/index?code='+code
                })
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .searchContent{
        background-color: #f8f8f8;
        min-height: 100vh;
        box-sizing: border-box;
        .searchContentTop{
            margin: 30upx;
            border-radius: 10upx;
            height: 80upx;
            border: 1upx solid #ccc;
            input{
                padding: 0 10upx;
            }
            button{
                height: 100%;
            }
        }
        .searchContent-title{
            border-bottom: 1px solid #000;
            line-height: 2;
            padding:30upx 20upx;
        }
        .searchContent-list{
            .cu-item{
                box-sizing: border-box;
                overflow: hidden;
                border-bottom: 1px solid #000;
                padding: 20upx;
                flex-wrap: nowrap;
                justify-content: space-between;
                .cu-avatar{
                    width: 190upx;
                    height: 190upx;
                }
                .cu-item-content{
                    width: 72%;
                    .cu-item-content-head{
                        .icon{
                            color: #999;
                            font-size: 26upx;
                            .cuIcon-attention{
                                padding-right: 10upx;
                            }
                        }

                    }
                    .cu-item-content-ext{
                        margin: 26upx auto;
                        .flex{
                            flex-wrap: wrap;
                            text{
                                margin: 10upx 10upx 0 10upx;
                                box-sizing: border-box;
                                overflow: hidden;
                                font-size: 24upx;
                                width: 21%;
                                height: 36upx;
                                line-height: 36upx;
                                text-align: center;
                                background-color: #d9d9d9;
                            }
                        }

                    }
                }
            }
        }
        .nomore{
            text-align: center;
            padding: 30upx 0;
            color: #999;
        }
    }
</style>
