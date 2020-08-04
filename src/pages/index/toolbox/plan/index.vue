<template>
    <view>
        <view v-html="content"></view>
    </view>
</template>

<script>
    export default {
        data(){
            return{
                content:''
            }
        },
        onLoad(option){
            let desc ;
            desc = JSON.parse(decodeURIComponent(option.jsonData))
            this.content = desc.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
        },
        onShareAppMessage: function () {},
    }
</script>

<style scoped>

</style>