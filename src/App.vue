<script>
	export default {
		async onShow (){
            console.log(1);
            if(uni.getStorageSync('openid')){
                let data = {userId : uni.getStorageSync('openid')},
                    resp = await this.$api.selectUser(data);
                console.log(resp.result.phone);
                uni.setStorage({key: 'isVip', data: resp.result.isVip});
                uni.setStorage({key: 'userNo', data: resp.result.userNo});
                if(!resp.result.phone){
                    uni.switchTab({
                        url:'/pages/index/index'
                    })
                }
            }
		},
	}
</script>

<style>
    @import "../colorui/main.css";
    @import "../colorui/icon.css";
    .body{
        padding-bottom: 120upx;
    }
    .flex{
        display: flex;
    }
    .F72C44{
        color: #F72C44;
    }
    .shadow{
        box-shadow:2px 10px 24px 0px rgba(170,170,170,0.2);
    }
    .ml30{
        margin-left: 30upx;
    }
    .m30{
        box-sizing: border-box;
        margin: 30upx;
        padding: 0 0 0 20upx;
        color: #fff;
        border-radius: 10upx;
    }
    .border{
        border: 1px solid #000;
        border-radius: 50%;
    }
    swiper-item{
        overflow-y: scroll;
    }
</style>
