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
            this.getInfo(option.id)
        },
        onShareAppMessage: function () {},
        methods:{
            async getInfo(id){
                let data = {
                        type:id
                    },
                    res = await this.$api.getTool(data)
                console.log(res)
                this.content = res.rows[0].content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
            }
        }


    }
</script>

<style scoped>

</style>