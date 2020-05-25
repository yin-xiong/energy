<template>
    <view class="admin-content">
        <form @submit="formSubmit">
            <view class="admin-content-title">管理员入口</view>
            <view class="cu-form-group">
                <view class="title">账号:</view>
                <input type="text" placeholder="请输入账号"></input>
            </view>
            <view class="cu-form-group">
                <view class="title">密码:</view>
                <input type="password" placeholder="请输入密码"></input>
            </view>
            <view>

                <view class="cu-form-group">
                    <view class="title">身份:</view>
                    <picker @change="bindPickerChange" :value="index" :range="array">
                        <view class="picker">{{array[index]}}</view>
                    </picker>
                </view>

            </view>
            <view class="verification">
                <text>点击验证</text>
            </view>

            <view class="uni-btn-v">
                <button form-type="submit">提交</button>
            </view>
        </form>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                index: 0,
                array: ['校长/管理员', '教务老师', '咨询师', '市场人员','专业课老师','校园代理','代理'],
                selectArr:[
                    { id:1,title:'校长/管理员' },
                    { id:2,title:'教务老师' },
                    { id:3,title:'咨询师' },
                    { id:4,title:'市场人员' },
                    { id:5,title:'专业课老师' },
                    { id:6,title:'校园代理' },
                    { id:7,title:'代理' },
                ]
            }
        },
        methods: {
            bindPickerChange: function(e) {
                console.log('picker发送选择改变，携带值为', e.target.value)
                this.index = e.target.value
            },
            formSubmit: function(e) {
                console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                var formdata = e.detail.value
                uni.showModal({
                    content: '表单数据内容：' + JSON.stringify(formdata),
                    showCancel: false
                });
            },
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .admin-content{
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: #c9cace;
        form{
            width: 80vw;
            height: 55vh;
            box-sizing: border-box;
            padding: 0 30upx;
            background-color: #c0d4f5;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            overflow: hidden;
            .admin-content-title{
                text-align: center;
                font-size: 34upx;
                line-height: 2;
                font-weight: bold;
                margin-top: 20upx;
            }
            view,,input,.uni-btn-v,button{
                background-color: transparent;
                border: none;
            }
            .title{
                color: #666;
            }
            .cu-form-group{
                min-height: 70upx;
                background-color: #fff;
                border: 1px solid #666;
                margin-top: 16upx;
                picker{
                    .picker{
                        line-height:70upx;
                        text-align: left;
                        color: #666;
                    }
                &::after {
                    line-height: 70upx;
                }
                }
            }
            .verification{
                border-radius: 10upx;
                margin-top: 16upx;
                text-align: right;
                font-weight: bold;
                font-size: 24upx;
                border: 1px solid #666;
                line-height: 70upx;
                box-sizing: border-box;
                padding: 0 30upx;
                text{
                    position: relative;
                    &:after{
                        content: '';
                        position: absolute;
                        left: -20upx;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        width: 10upx;
                        height: 10upx;
                        background-color: #fc3810;
                    }
                }
            }
            .uni-btn-v{
                width: 150upx;
                margin: 40upx auto 0 auto;
                background-color: #567ebd;
                button{
                    font-size: 30upx;
                    color: #fff;
                    border-radius: 0;
                    border: 1px solid #999;
                    line-height: 2;
                }
            }
        }
    }
</style>