<template>
    <view class="searchfor-list">
        <view class="searchfor-item" v-for=" ( item,index) in list " :key="index"
              @click="checkToDetails( item.composeCode )">
            <view class="searchfor-item-title flex justify-between align-center">
                <view class="searchfor-item-title-left">{{item.majorName}}</view>
                <view class="icon">
                    <text class="cuIcon-attention"></text>
                    {{item.reading}}
                </view>
            </view>
            <view>
                <text>门类类别:</text>
                {{item.categoryCode}}-{{item.categoryName}}
            </view>
            <view>
                <text>专业类别:</text>
                <text v-if='item.type == 1'>学术学位</text>
                <text v-else>专业学位</text>
            </view>
            <view class="flex searchfor-item-imgs align-center">
                <view class="cu-avatar-group">
                    <view
                            class="cu-avatar round sm"
                            v-for="(citem,cindex) in item.schools"
                            :key="cindex"
                            :style=" 'background-image:url('+ citem.avatar+');' "
                    ></view>
                </view>
                <view>
                    <text>{{item.schoolCount}}所高校开设此专业</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                list: [], // 分数查询和专业查询的列表
                reqData: {
                    categoryCode: '',
                    subjectCode: '',// 选中的一级学科
                    pageNum: 1,
                    pageSize: 20,
                    orderByColumn: 'code',
                    isAsc: 'asc',
                },
            }
        },
        onLoad(option) {
            this.reqData.categoryCode = option.categoryCode
            this.reqData.subjectCode = option.subjectCode
            console.log(this.isChose);
            this.getMajors(this.reqData)
        },
        onShareAppMessage: function () {},
        //上拉加载更多
        async onReachBottom() {
            this.reqData.pageNum++;
            let res = await this.$api.getMajors(this.reqData);
            if (res.code == 200 && res.rows.length > 0) {
                this.list = [...this.list, ...res.rows]
            } else {
                return
            }
        },
        methods: {
            async getMajors(data) {
                uni.showLoading({
                    title: '加载中……',
                })
                let res = await this.$api.getMajors(data);
                console.log(res);
                if (res.code == 200) {
                    this.list = res.rows
                    uni.hideLoading()
                } else {
                    uni.hideLoading()
                }
            },
            // 用户点击专业列表--前往专业详情页面
            checkToDetails( composeCode ){
                uni.navigateTo({
                    url: '/pages/index/searchfor/professional/index?composeCode='+composeCode
                })
            },
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .searchfor-list {
        margin: 40upx 20upx 0 20upx;
        .searchfor-item {
            border-radius: 10upx;
            border: 1upx solid #eee;
            margin-bottom: 20upx;
            box-sizing: border-box;
            padding: 20upx;
            > view {
                color: #999;
                font-size: 26upx;
                margin-bottom: 10upx;
            }

            .searchfor-item-title {
                .searchfor-item-title-left {
                    color: #333;
                    font-size: 30upx;
                    font-weight: bold;
                }

                .icon {
                    color: #999;
                    font-size: 24upx;

                    .cuIcon-attention {
                        margin-right: 10upx;
                    }
                }

            }

            .searchfor-item-imgs {
                text {
                    color: #999;
                    font-size: 26upx;
                }

                .cu-avatar-group {
                    padding-left: 20upx;
                }
            }
        }
    }
</style>