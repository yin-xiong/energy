<template>
    <view class="adjust-list body">
        <view v-if="list && list.length > 0">
            <view class="item-adjust" v-for="item in list" :key="item.id" @click="showDetails">{{item.title}}</view>
        </view>
        <nodata v-else :title="notitle"></nodata>
        <!--   详情模态框     -->
        <view :class=" flag ? 'cu-modal show' : 'cu-modal' ">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">列表的标题</view>
                    <view class="action" @click="flag = false">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class="padding-xl">
                     内容。
                </view>
                <view class="cu-bar bg-white justify-end">
                    <view class="action">
                        <button class="cu-btn line-green text-green" @click="flag = false">取消</button>
                        <button class="cu-btn bg-green margin-left" @click="flag = false">确定</button>
                    </view>
                </view>
            </view>
        </view>

        <hans-tabber :isActive="1" />
    </view>
</template>
<script>
    import nodata from '../../components/nodata'

    export default {
        data(){
            return{
                list:[
                    { id:21,title:'2020.4.4更新信息' },
                    { id:22,title:'2020.4.5更新信息' },
                    { id:23,title:'2020.4.6更新信息' },
                    { id:24,title:'2020.4.4更新信息' },
                    { id:25,title:'2020.4.4更新信息' },
                    { id:26,title:'2020.4.4更新信息' },
                    { id:27,title:'2020.4.4更新信息' },
                ],
                flag:false,// 控制模态框显示隐藏
                notitle:'暂无公告资料'
            }
        },
        components:{
            nodata
        },
        onShareAppMessage: function () {},
        methods:{
            // 打开详情模态框
            showDetails(){
                this.flag = true
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .adjust-list{
        view{
            overflow: hidden;
            .item-adjust{
                margin: 0 30upx;
                border-bottom: 1px solid #000;
                height: 70upx;
                line-height: 70upx;
                font-size: 30upx;
                font-weight: bold;
                &:first-child{
                    margin-top: 20upx;
                }
            }
        }

    }
</style>
