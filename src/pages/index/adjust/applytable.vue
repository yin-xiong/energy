<template>
    <view class="apply-table body">
        <view class="apply-table-title">调剂申请表</view>
        <form action="">
            <view class="cu-form-group borderBom">
                <view class="title">姓名</view>
                <input placeholder="请输入姓名" v-model="reqData.name" />
            </view>
            <radio-group class="block borderBom" @change="choseSex">
                <view class="cu-form-group">
                    <view class="title">性别</view>
                    <view style="width: 80%;" class="flex justify-between align-center">
                        <label class="radio"><radio class="blue radio" value="1" /> 男</label>
                        <label class="radio"><radio class="blue radio" value="2" /> 女</label>
                    </view>
                </view>
            </radio-group>
            <view class="cu-form-group">
                <view class="title">本科院校</view>
                <input placeholder="请输入本科院校：" v-model="reqData.majorCode" />
            </view>
            <view class="cu-form-group">
                <view class="title">本科专业</view>
                <input placeholder="请输入本科专业：" v-model="reqData.schoolCode" />
            </view>

            <view class="cu-form-group">
                <view class="title">一志愿校</view>
                <input placeholder="请输入一志愿校：" v-model="reqData.firstChoice" />
            </view>
            <view class="cu-form-group">
                <view class="title">初试总分</view>
                <input placeholder="请输入初试总分：" v-model="reqData.preliminaryScore" />
            </view>
            <view class="cu-form-group">
                <view class="title">政治/管综分数</view>
                <input placeholder="请输入政治/管综分数：" v-model="reqData.politicsManagementScore" />
            </view>
            <view class="cu-form-group">
                <view class="title">英语分数</view>
                <input placeholder="请输入英语分数：" v-model="reqData.englishScore" />
            </view>
            <view class="cu-form-group">
                <view class="title">业务科一</view>
                <input placeholder="请输入业务科一：" v-model="reqData.subject1" />
            </view>
            <view class="cu-form-group">
                <view class="title">业务科二</view>
                <input placeholder="请输入业务科二：" v-model="reqData.subject2" />
            </view>
            <view class="cu-form-group">
                <view class="title">调剂目标院校</view>
                <input placeholder="请输入调剂目标院校：" v-model="reqData.dispensingCollege" />
            </view>

            <view class="cu-form-group">
                <view class="title">联系电话</view>
                <input type="number" minlength="11" maxlength="11" placeholder="请输入联系电话：" v-model="reqData.phone" />
            </view>

<!--
            <view class="cu-form-group borderBom">
                <view class="title">验证码</view>
                <input type="tel" placeholder="请输入验证码:"></input>
                <button class="cu-btn bg-green shadow">获取验证码</button>
            </view>
-->
            <view class="subBtn">
                <button class="cu-btn shadow" @click="adjustAdd">提交</button>
            </view>
        </form>
        <hans-tabber :isActive="1" />
    </view>
</template>
<script>
    export default {
        data(){
            return{
                reqData:{
                    name :'' , // 姓名
                    gender :'' , // 性别 1男 ，2女，0未知
                    schoolCode :'' , // 本科院校
                    majorCode:'' , // 本科专业
                    firstChoice:'' , // 一志愿学校
                    preliminaryScore:'' , // 初试总分
                    politicsManagementScore:'' , // 政治/管综分数
                    englishScore:'' , // 英语分数
                    subject1:'' , // 业务科一
                    subject2:'' , // 业务科二
                    dispensingCollege:'' , // 调剂目标院校
                    phone:'' , // 联系电话
                }
            }
        },
        onShareAppMessage: function () {},
        methods:{
            // 选择性别
            choseSex(e){
                this.reqData.gender = e.detail.value
            },
            // 增加调剂保录
            async adjustAdd(){
                console.log(this.reqData);
                if(!this.reqData.name){
                    uni.showModal({title:'温馨提示', content:'请填写姓名', showCancel:false})
                }else if(!this.reqData.gender){
                    uni.showModal({title:'温馨提示', content:'请选择性别', showCancel:false})
                }else if(!this.reqData.schoolCode){
                    uni.showModal({title:'温馨提示', content:'请填写本科院校', showCancel:false})
                }else if(!this.reqData.majorCode){
                    uni.showModal({title:'温馨提示', content:'请填写本科专业', showCancel:false})
                }else if(!this.reqData.firstChoice){
                    uni.showModal({title:'温馨提示', content:'请填写一志愿学校', showCancel:false})
                }else if(!this.reqData.preliminaryScore){
                    uni.showModal({title:'温馨提示', content:'请填写初试总分', showCancel:false})
                }else if(!this.reqData.politicsManagementScore){
                    uni.showModal({title:'温馨提示', content:'请填写政治/管综分数', showCancel:false})
                }else if(!this.reqData.englishScore){
                    uni.showModal({title:'温馨提示', content:'请填写英语分数', showCancel:false})
                }else if(!this.reqData.subject1){
                    uni.showModal({title:'温馨提示', content:'请填写业务科一', showCancel:false})
                }else if(!this.reqData.subject2){
                    uni.showModal({title:'温馨提示', content:'请填写业务科二', showCancel:false})
                }else if(!this.reqData.dispensingCollege){
                    uni.showModal({title:'温馨提示', content:'请填写调剂目标院校', showCancel:false})
                }else if( !(/^1[3456789]\d{9}$/.test(this.reqData.phone))){
                    uni.showModal({title:'温馨提示', content:'请填写正确的联系电话', showCancel:false})
                }else{
                    console.log(this.reqData)
                    let res = await this.$api.adjustAdd(this.reqData)
                    console.log(res);
                    if(res.code == 0){
                        uni.showLoading({
                            title:'提交成功',
                            success:resp=>{
                                uni.navigateBack()
                            }
                        })
                    }
                }
            },
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .apply-table{
        .apply-table-title{
            text-align: center;
            color: #fff;
            margin: 20upx auto;
            font-size: 32upx;
            background-color: #5f96e8;
            width: 40%;
            line-height: 2;
        }
        form{
            display: block;
            box-sizing: border-box;
            padding: 0 20upx;
            width: 100%;
            height: auto;
            overflow: hidden;
            margin-bottom: 30upx;
            input,button,label{
                font-size: 26upx;
            }
            .title{
                width: 34%;
                font-size: 26upx;
            }
            .subBtn{
                width: 40%;
                margin: 40upx auto 0 auto;
                button{
                    width: 100%;
                    color: #fff;
                    border-radius: 10upx;
                    background-color: #5f96e8;
                }
            }
        }
        .borderBom{
            border-bottom: 1upx solid #eee;
        }
    }
</style>
