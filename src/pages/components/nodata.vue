<template>
    <view class="nodata">
        <img :src="src" mode="widthFix" />
    </view>
</template>
<script>
    export default {
        data(){
            return{
                src:'../../static/image/icon/nodata.png',
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .nodata{
        overflow: hidden;
        margin: 0 auto;
        text-align: center;
        img{
            display: block;
            width: 30vw;
            margin: 20vh auto 20upx auto;
        }
    }
</style>
