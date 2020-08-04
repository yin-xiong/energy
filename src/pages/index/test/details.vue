<template>
    <view class="check-details">
        <view class="searchfor-item" v-for=" ( item,index) in list " :key="item.composeCode"
              @click="checkToDetails( item.composeCode )">
            <view class="searchfor-item-title flex justify-between align-center">
                <view class="searchfor-item-title-left">{{item.majorName}}</view>
                <view class="icon"><text class="cuIcon-attention"></text>{{item.reading}}</view>
            </view>
            <view><text>门类类别:</text>{{item.categoryCode}}-{{item.categoryName}}</view>
            <view><text>专业类别:</text><text v-if='item.type == 1'>学术学位</text><text v-else>专业学位</text></view>
            <view class="flex searchfor-item-imgs align-center">
                <view class="cu-avatar-group">
                    <view
                            class="cu-avatar round sm"
                            v-for="(citem,cindex) in item.schools"
                            :key="cindex"
                            :style=" 'background-image:url('+ citem.avatar+');' "
                    ></view>
                </view>
                <view><text>{{item.schoolCount}}所高校开设此专业</text></view>
            </view>
        </view>
    </view>
</template>
<script>
    export default {
        data(){
            return{
                list:[]
            }
        },
        onShareAppMessage: function () {},
        async onLoad(options) {
            uni.showLoading({title:'加载中'})
            let data = JSON.parse(options.data); // 字符串转对象
            let res = await this.$api.testQuestionSubmit(data);
            if( res.code == 200 && res.rows.length > 0 ){
                uni.hideLoading()
                this.list = res.rows
                console.log(data)
                console.log(this.list)
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .check-details{
        margin: 20rpx;
        .searchfor-item{
            border-radius: 10upx;
            border: 1upx solid #eee;
            margin-bottom: 20upx;
            box-sizing:border-box;
            padding: 20upx;
            >view{
                color: #999;
                font-size: 26upx;
                margin-bottom: 10upx;
            }
            .searchfor-item-title{
                .searchfor-item-title-left{
                    color: #333;
                    font-size: 30upx;
                    font-weight: bold;
                }
                .icon{
                    color: #999;
                    font-size: 24upx;
                    .cuIcon-attention{
                        margin-right: 10upx;
                    }
                }

            }
            .searchfor-item-imgs{
                text{
                    color: #999;
                    font-size: 26upx;
                }
                .cu-avatar-group{
                    padding-left: 20upx;
                }
            }
        }
    }
</style>
