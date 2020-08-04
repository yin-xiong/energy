<template>
    <view class="marklineImg">
        <img :src="src" mode="widthFix" />
    </view>
</template>
<script>
    export default {
        data(){
            return{
                src:''
            }
        },
        onLoad( option ){
            console.log(option.url);
            this.src = option.url
        },
        onShareAppMessage: function () {},
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .marklineImg{
        img{
            width: 100%;
            height: auto;
        }
    }
</style>
