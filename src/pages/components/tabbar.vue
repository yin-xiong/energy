<template>
    <view class="tabBar">
        <view class="flex align-center justify-between">
            <view
                    v-for="(item, index) in list"
                    :class=" item.id == isActive ? 'active' : '' "
                    :key="index"
                    @click="tabChange(item.id,item.url)"
            >
                <img :src=" item.id == isActive ? item.srcActive : item.src " />
                <text>{{ item.text }}</text>
            </view>
        </view>
    </view>

</template>

<script>
    export default {
        data() {
            return {
                list: [
                    {
                        id:1,
                        url:'/pages/index/index',
                        src:'../../static/image/icon/tab/home.png',
                        srcActive:'../../static/image/icon/tab/home1.png',
                        "text": "首页",
                    },
                    {
                        id:2,
                        url:'/pages/recommend/index',
                        src:'../../static/image/icon/tab/admin.png',
                        srcActive:'../../static/image/icon/tab/admin1.png',
                        "text": "研究生自荐",
                    },
                    {
                        id:3,
                        url:'/pages/user/index',
                        src:'../../static/image/icon/tab/me.png',
                        srcActive:'../../static/image/icon/tab/me1.png',
                        "text": "我的",
                    },
                    // {
                    //     id:3,
                    //     url:'/pages/admin/index',
                    //     "text": "管理员入口",
                    // },
 
                ],
            };
        },
        props:{
            isActive:Number
        },
        methods: {
            tabChange(id,url) {
                console.log(id);
                uni.switchTab({
                    url
                })
            }
        }
    };
</script>

<style lang="scss" scoped >
    .tabBar{
        position: fixed;
        z-index: 9999;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100upx;
        background-color: #fff;
        .flex{
            position: relative;
            z-index: 9999;
            view{
                flex: 1;
                text-align: center;
                img{
                    display: block;
                    margin: 10upx auto;
                    width: 40upx;
                    height: 40upx;
                }
                text{
                    font-size: 24upx;
                }
                &.active{
                    color: #1AD3CD;
                }
            }

        }
    }

</style>
