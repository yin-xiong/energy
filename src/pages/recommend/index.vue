<template>
    <view class="recommend">
        <view class="apply-table">
            <view class="apply-table-title">专业课老师自荐表</view>
            <view class="apply-table-desc">
                <view>如果你考研高分过线、如果你是老师的得意门生、如果你愿意帮助更多有志读研的学子成为你的学弟/妹，那么，就来挑战自己，做一名专业课教师吧！发挥你的才能！赚取丰厚的报酬！</view>
                <view :class="isFalg? 'active apply-table-desc-ext':'apply-table-desc-ext' ">本平台不会向你收取任何费用，只要你证明你的实力，我们就给你广阔的天地！</view>
                <view :class="isFalg? 'active apply-table-desc-ext':' apply-table-desc-ext' ">注：填写申请后请留意接听审核电话，我们会对你的资质进行审核，通过后平台会向您派单并网签合同</view>
                <view class="apply-table-desc-btn">
                    <text @click="isFalg = !isFalg">
                        <text v-if="isFalg">点击关闭</text>
                        <text v-else>点击展开</text>
                    </text>
                </view>
            </view>
            <form action="">
                <view class="cu-form-group borderBom">
                    <view class="title">姓名</view>
                    <input placeholder="仅注册用，审核后可更换" v-model="reqData.userName" />
                </view>
                <radio-group class="block borderBom" @change="radioChange">
                    <view class="cu-form-group">
                        <view class="title">性别</view>
                        <view style="width: 80%;" class="flex align-center">
                            <label class="radio" v-for="(item,index) in sex" :key="index" style="margin-right: 100upx;">
                                <radio class="blue radio" :value="item.val" :checked="item.val === reqData.gender" />
                                <text>{{item.name}}</text>
                            </label>
                        </view>
                    </view>
                </radio-group>
                <view class="cu-form-group">
                    <view class="title">就读院校</view>
                    <input placeholder="请输入就读院校：" v-model="reqData.schoolAttendance" />
                </view>
                <view class="cu-form-group">
                    <view class="title">就读专业</view>
                    <input placeholder="请填写代码与专业名称" v-model="reqData.composeCode" />
                </view>
                <view class="cu-form-group">
                    <view class="title">年级</view>
                    <input placeholder="例：研一/研二/研三/博一等" v-model="reqData.grade" />
                </view>

                <view class="cu-form-group" style="flex-wrap: wrap;">
                    <view style="padding-top: 20upx;" class="uploadInfo">
                        <view class="grid col-4 grid-square flex-sub">
                            <view class="bg-img" v-if="reqData.studentImgList.length > 0" v-for=" (item,index) in reqData.studentImgList" :key="index" >
                                <img :src='item' mode='aspectFill' />
                                <view class="cu-tag bg-red" @click="DelStudentImg($event)" :data-index="index">
                                    <text class="cuIcon-close"></text>
                                </view>
                            </view>
                            <view class="solids" @click="ChooseStudentImage($event)"  v-if="reqData.studentImgList.length < 1">
                                <text class="cuIcon-cameraadd"></text>
                            </view>
                            <text class="uploadInfo-text">请上传学生证</text>
                        </view>
                    </view>
                    <view class="uploadInfo">
                        <view class="grid col-4 grid-square flex-sub">
                            <view class="bg-img" v-if="reqData.idCardImgList.length > 0" v-for=" (item,index) in reqData.idCardImgList" :key="index" >
                                <img :src='item' mode='aspectFill' />
                                <view class="cu-tag bg-red" @click="DelIdCardImg($event)" :data-index="index">
                                    <text class="cuIcon-close"></text>
                                </view>
                            </view>
                            <view class="solids" @click="ChooseIdCardImage($event)"  v-if="reqData.idCardImgList.length < 1">
                                <text class="cuIcon-cameraadd"></text>
                            </view>
                            <text class="uploadInfo-text">请上传身份证</text>
                        </view>
                    </view>
                    <view class="uploadInfo">
                        <view class="grid col-4 grid-square flex-sub">
                            <view class="bg-img" v-if="reqData.markImgList.length > 0" v-for=" (item,index) in reqData.markImgList" :key="index" >
                                <img :src='item' mode='aspectFill' />
                                <view class="cu-tag bg-red" @click="DelMarkImg($event)" :data-index="index">
                                    <text class="cuIcon-close"></text>
                                </view>
                            </view>
                            <view class="solids" @click="ChooseMarkImage($event)"  v-if="reqData.markImgList.length < 1">
                                <text class="cuIcon-cameraadd"></text>
                            </view>
                            <text class="uploadInfo-text">请上传考研成绩截图(需可见姓名与身份证号)</text>
                        </view>
                    </view>
                </view>
<!--
                <view class="cu-form-group">
                    <view class="title">联系电话</view>
                    <input placeholder="请输入联系电话"></input>
                    <button class="cu-btn bg-green shadow">发送验证码</button>
                </view>
                <view class="cu-form-group">
                    <view class="title">验证码</view>
                    <input placeholder="请输入验证码：" />
                </view>
 -->
                <view class="cu-form-group marginTop">
                    <text style="text-decoration: underline;">本人保证，本人所填写和上传的所有信息均为本人真实信息，如因本人信息造假导致的法律后果，本人愿意承担相关责任。</text>
                </view>
                <view class="subBtn">
                    <button class="cu-btn shadow" @click="subInfo">提交</button>
                </view>
            </form>
        </view>
    </view>
</template>
<script>
    export default {
        data(){
            return{
                isFalg:false,
                current:1,
                sex:[
                    { name:'男',val:1 },
                    { name:'女',val:2 },
                ],
                reqData:{
                    userName:'', // 用户姓名
                    gender: 1, // 性别(1.男，2.女，0.未知)
                    schoolAttendance:'', // 就读院校
                    composeCode:'', // 就读专业
                    grade:'', // 年级
                    studentImgList : [], // 学生证
                    idCardImgList : [], // 身份证
                    markImgList : [], // 考研成绩证
                },

            }
        },
        onShareAppMessage: function () {},
        methods:{
            // 学生证 照片选择
            ChooseStudentImage(){
                uni.chooseImage({
                    count:1,
                    success: res => {
                        if (this.reqData.studentImgList.length != 0) {
                            this.reqData.studentImgList = this.reqData.studentImgList.concat(res.tempFilePaths)
                        } else {
                            this.reqData.studentImgList = res.tempFilePaths
                        }
                    }
                });
            },
            // 删除 学生证 图片
            DelStudentImg(e) {
                uni.showModal({
                    title: '温馨提示',
                    content: '确定要删除这张图片？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: res => {
                        if (res.confirm) {
                            console.log(e);
                            this.reqData.studentImgList.splice(e.currentTarget.dataset.index, 1);
                        }
                    }
                })
            },
            // 身份证 照片选择
            ChooseIdCardImage(){
                uni.chooseImage({
                    count:1,
                    success: res => {
                        if (this.reqData.idCardImgList.length != 0) {
                            this.reqData.idCardImgList = this.reqData.idCardImgList.concat(res.tempFilePaths)
                        } else {
                            this.reqData.idCardImgList = res.tempFilePaths
                        }
                    }
                });
            },
            // 删除 身份证 图片
            DelIdCardImg(e) {
                uni.showModal({
                    title: '温馨提示',
                    content: '确定要删除这张图片？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: res => {
                        if (res.confirm) {
                            console.log(e);
                            this.reqData.idCardImgList.splice(e.currentTarget.dataset.index, 1);
                        }
                    }
                })
            },
            // 考研成绩证 照片选择
            ChooseMarkImage(){
                uni.chooseImage({
                    count:1,
                    success: res => {
                        if (this.reqData.markImgList.length != 0) {
                            this.reqData.markImgList = this.reqData.markImgList.concat(res.tempFilePaths)
                        } else {
                            this.reqData.markImgList = res.tempFilePaths
                        }
                    }
                });
            },
            // 删除 考研成绩证 图片
            DelMarkImg(e) {
                uni.showModal({
                    title: '温馨提示',
                    content: '确定要删除这张图片？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: res => {
                        if (res.confirm) {
                            console.log(e);
                            this.reqData.markImgList.splice(e.currentTarget.dataset.index, 1);
                        }
                    }
                })
            },

            // 用户选择性别
            radioChange(e){
                for (let i = 0; i < this.sex.length; i++) {
                    if (this.sex[i].val === e.target.value) {
                        this.reqData.englishLevel = e.target.value;
                        break;
                    }
                }
            },
            // 用户提交信息
            async subInfo(){
                // 说明用户同意了
                if( this.reqData.userName.trim().length == 0){
                    this.showModals("请填写姓名")
                } else if(!this.reqData.gender){
                    this.showModals("请选择性别")
                } else if(this.reqData.schoolAttendance.trim().length == 0){
                    this.showModals("请填写就读院校")
                } else if(this.reqData.composeCode.trim().length == 0){
                    this.showModals("请填写就读专业")
                } else if(this.reqData.grade.trim().length == 0){
                    this.showModals("请填写年纪")
                } else if(this.reqData.studentImgList.length == 0){
                    this.showModals("请上传学生证图片")
                } else if(this.reqData.idCardImgList.length == 0){
                    this.showModals("请上传身份证图片")
                } else if(this.reqData.markImgList.length == 0){
                    this.showModals("请上传考研成绩证图片")
                } else{
                    let res = await this.$api.addRecommendSave(this.reqData)
                    if(res.code == 0){
                        this.showModals('资料上传成功，请等待通知')
                        this.reqData = {
                            userName:'', // 用户姓名
                            gender: 1, // 性别(1.男，2.女，0.未知)
                            schoolAttendance:'', // 就读院校
                            composeCode:'', // 就读专业
                            grade:'', // 年级
                            studentImgList : [], // 学生证
                            idCardImgList : [], // 身份证
                            markImgList : [], // 考研成绩证
                        }
                    }
                }
            },
            showModals(str){uni.showModal({title:"温馨提示", content:str, showCancel:false})},
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .recommend{
        .apply-table{
            padding-bottom: 50upx;
            .apply-table-title{
                text-align: center;
                color: #000;
                margin: 20upx auto;
                font-size: 32upx;
                /*background-color: #5f96e8;*/
                width: 40%;
                line-height: 2;
            }
            .apply-table-desc{
                position: relative;
                box-sizing: border-box;
                padding: 20upx 20upx 70upx 20upx;
                margin: 0 10upx;
                text-align: justify;
                border-bottom: 1upx solid #ccc;
                overflow: hidden;
                .apply-table-desc-ext{
                    height: 0;
                    overflow: hidden;
                    transition: height 1s;
                    &.active{
                        height: auto;
                    }
                }

                .apply-table-desc-btn{
                    position: absolute;
                    right: 10upx;
                    bottom: 10upx;
                    background-color: #ccc;
                    border-radius: 10upx;
                    z-index: 99;
                    line-height: 2;
                    width: 140upx;
                    text-align: center;
                    text{font-size: 26upx;}
                }
            }
            form{
                display: block;
                box-sizing: border-box;
                padding: 0 20upx;
                width: 100%;
                height: auto;
                overflow: hidden;
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
        .marginTop{
            overflow: hidden;
            padding-top: 20upx;
            .ensure{
                display: inline;
                font-size: 26upx;
                margin-left: 10upx;
            }
        }
        .uploadInfo{
            display: block;
            width: 100%;
            .grid{
                flex-wrap: nowrap;
            }
            .uploadInfo-text{
                font-size: 24upx;
                display: flex;
                align-items: center;
            }

        }
    }
</style>
