<template>
    <view class="study body">
        <img mode src="../../../static/image/list/banner.png" alt="">
        <hans-tabber :isActive="1" />
    </view>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        onShareAppMessage: function () {},
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .study{
        padding: 30upx;
        img{
            display: block;
            margin: 0 auto;
            width: 80vw;
        }
    }
</style>
