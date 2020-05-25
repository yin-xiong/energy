<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
    @import "../colorui/main.css";
    @import "../colorui/icon.css";
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
</style>
