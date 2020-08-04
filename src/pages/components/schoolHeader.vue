<template>
    <view>
        <view class="searchDetail-head">
            <img :src="result.avatar" alt/>
            <view class="searchDetail-head-one align-center justify-between flex">
                <text>{{result.universityName}}</text>
                <text class="icon">
                    <text class="cuIcon-attention"></text>
                    {{result.reading}}
                </text>
            </view>
            <view class="searchDetail-head-two align-center justify-between flex">
                <button @click="follow" :class="followFlag? 'active' : ''">
                    <text v-if="followFlag">+ 关注</text>
                    <text v-else>取消关注</text>
                </button>
                <button @click="wantTest">+ 想考</button>
            </view>


            <!--   院校心愿单     -->
            <view :class=" wishFlag?'cu-modal show' : 'cu-modal' " style="height: 60vh;">
                <view class="cu-dialog">
                    <view class="cu-bar bg-white justify-end">
                        <view class="content">院校心愿单</view>
                        <view class="action" bindtap="hideModal" @click="wishFlag = false">
                            <text class="cuIcon-close text-red"></text>
                        </view>
                    </view>
                    <view class="padding-xl wishContent">
                        <view
                                class="wishContent-title"
                        >说明：填写本心愿单，考研顾问将为您准备您想报考学校的信息，包括专业分数、招生情况、专业课资料等。匹配完成后（24小时内）将通知您查看信息。为确保为您匹配的数据和资料精准无误，请详细填写相关信息！
                        </view>
                        <view class="wishContent-form">
                            <form action>
                                <view class="cu-form-group">
                                    <view class="title">姓名</view>
                                    <input placeholder="请输入姓名：" v-model="wishData.userName"/>
                                </view>
                                <radio-group class="block" @change="sexChange">
                                    <view class="cu-form-group">
                                        <view class="title">性别</view>
                                        <view style="width: 80%;" class="flex align-center">
                                            <label
                                                    class="radio"
                                                    v-for="(item,index) in sex"
                                                    :key="index"
                                                    style="margin-right: 100upx;"
                                            >
                                                <radio
                                                        class="blue radio"
                                                        :value="item.val"
                                                        :checked="item.val == wishData.gender"
                                                />
                                                <text>{{item.name}}</text>
                                            </label>
                                        </view>
                                    </view>
                                </radio-group>
                                <view class="cu-form-group">
                                    <view class="title">本科学校</view>
                                    <input placeholder="请输入本科学校" v-model="wishData.undergraduateCollege"/>
                                </view>
                                <view class="cu-form-group">
                                    <view class="title">本科专业</view>
                                    <input placeholder="请输入本科专业" v-model="wishData.undergraduateMajor"/>
                                </view>
                                <view class="cu-form-group">
                                    <view class="title">意向专业</view>
                                    <input placeholder="请输入意向专业" v-model="wishData.majorCode"/>
                                </view>
                                <radio-group class="block" @change="englishChange">
                                    <view class="cu-form-group">
                                        <view class="title">英语水平</view>
                                        <view style="width: 70%;" class="flex justify-between align-center">
                                            <label class="radio" v-for="(item,index) in english" :key="index">
                                                <radio
                                                        class="blue radio"
                                                        :value="item.val"
                                                        :checked="item.val == wishData.englishLevel"
                                                />
                                                <text>{{item.name}}</text>
                                            </label>
                                        </view>
                                    </view>
                                </radio-group>
                                <view class="cu-form-group">
                                    <view class="title">毕业年份</view>
                                    <input placeholder="请输入毕业年份" v-model="wishData.graduationYear"/>
                                </view>
                                <view class="cu-form-group">
                                    <view class="title">数学水平</view>
                                    <input placeholder="请输入数学水平" v-model="wishData.mathematicsLevel"/>
                                </view>
                                <!--
                                              <view class="cu-form-group">
                                                  <view class="title">电话</view>
                                                  <input placeholder="请输入电话" />
                                                  <button class="cu-btn bg-green shadow">获取验证码</button>
                                              </view>
                                              <view class="cu-form-group">
                                                  <view class="title">验证码 </view>
                                                  <input placeholder="请输入验证码 ：" />
                                              </view>
                                -->
                                <view class="subBtn">
                                    <button @click="subWishInfo" class="cu-btn bg-red margin-tb-sm lg">提交</button>
                                </view>
                            </form>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="searchDetail-tags">
            <view class="flex align-center" v-if="result.proSchoolState">
                <text v-for="item in result.proSchoolState" :key="index">{{item}}</text>
            </view>
            <view class="flex align-center">
                <text v-if="result.province">{{result.province}}</text>
                <text v-if="result.universityType">{{result.universityType}}</text>
                <text v-if="result.subjection">{{result.subjection}}</text>
            </view>
        </view>
    </view>

</template>

<script>
    export default {
        name: "schoolHeader",
        data() {
            return {
                code: "", // 前面学校列表传过来的code
                followFlag: true, // 关注
                wishFlag: false, // 院校心愿单的显示隐藏
                sex: [
                    {name: "男", val: 1},
                    {name: "女", val: 2}
                ],
                english: [
                    {name: "四级", val: 1},
                    {name: "六级", val: 2},
                    {name: "均未过", val: 3}
                ],
                wishData: {
                    userId: uni.getStorageSync("token"), // 用户ID
                    type: 1, // 类型（1院校心愿 2关注学校）
                    schoolCode: this.code, //院校code
                    userName: "", // 姓名
                    gender: "", // 性别(1.男，2.女，0.未知)
                    undergraduateCollege: "", // 本科学校
                    undergraduateMajor: "", // 本科专业
                    majorCode: "", // 意向专业
                    englishLevel: "", // 英语水平（1四级，2六级，3均未过）
                    graduationYear: "", // 毕业年份
                    mathematicsLevel: "" // 数学水平
                }
            }
        },
        props: {
            result: null
        },
        methods: {
            // 点击关注与取消关注
            async follow() {
                if (this.followFlag) {
                    this.followFlag = false;
                    let data = {
                            userId: uni.getStorageSync("token"), // 用户ID
                            type: 2, // 类型（1院校心愿 2关注学校）
                            schoolCode: this.code //院校code
                        },
                        res = await this.$api.add2MyWish(data);
                    console.log(res);
                    if (res.code == 200) {
                        uni.showLoading({title: "关注成功", mask: true});
                        setTimeout(() => {
                            uni.hideLoading();
                        });
                    }
                } else {
                    // cancel2MyWish
                    let data = {
                            userId: uni.getStorageSync("token"), // 用户ID
                            type: 2, // 类型（1院校心愿 2关注学校）
                            schoolCode: this.code //院校code
                        },
                        res = await this.$api.cancel2MyWish(data);
                    console.log(res);
                    this.followFlag = true;
                    if (res.code == 200) {
                        uni.showLoading({title: "取消关注成功", mask: true});
                        setTimeout(() => {
                            uni.hideLoading();
                        });
                    }
                }
            },
            // 用户点击想考
            wantTest() {
                if (uni.getStorageSync("isVip") == false) {
                    uni.showModal({
                        title: "温馨提示",
                        content: "是否需要购买会员？",
                        success: async res => {
                            if (res.confirm) {
                                console.log("用户点击确定,需要购买会员");
                                this.$tool.gobuyVip();
                            } else if (res.cancel) {
                                console.log("用户点击取消");
                                this.wishFlag = true;
                            }
                        }
                    });
                } else {
                    this.wishFlag = true;
                }
            },
            // 用户选择性别
            sexChange(e) {
                for (let i = 0; i < this.sex.length; i++) {
                    if (this.sex[i].val == e.target.value) {
                        this.wishData.gender = e.target.value;
                        break;
                    }
                }
            },
            // 用户选择英语等级
            englishChange(e) {
                for (let i = 0; i < this.english.length; i++) {
                    if (this.english[i].val == e.target.value) {
                        this.wishData.englishLevel = e.target.value;
                        break;
                    }
                }
            },
            // 提交心愿单
            async subWishInfo() {
                if (this.wishData.userName.trim().length == 0) {
                    this.showModals("请填写姓名");
                } else if (!this.wishData.gender) {
                    this.showModals("请选择性别");
                } else if (this.wishData.undergraduateCollege.trim().length == 0) {
                    this.showModals("请填写本科学校");
                } else if (this.wishData.undergraduateMajor.trim().length == 0) {
                    this.showModals("请填写本科专业");
                } else if (this.wishData.majorCode.trim().length == 0) {
                    this.showModals("请填写意向专业");
                } else if (!this.wishData.englishLevel) {
                    this.showModals("请选择英语水平");
                } else if (this.wishData.graduationYear.trim().length == 0) {
                    this.showModals("请填写毕业年份");
                } else if (this.wishData.mathematicsLevel.trim().length == 0) {
                    this.showModals("请填写数学水平");
                } else {
                    let res = await this.$api.add2MyWish(this.wishData);
                    console.log(res);
                    if (res.code == 200) {
                        this.wishFlag = false;
                        uni.showLoading({title: "提交成功"});
                        this.wishData = {
                            userId: uni.getStorageSync("token"), // 用户ID
                            type: 1, // 类型（1院校心愿 2关注学校）
                            schoolCode: this.code, //院校code
                            userName: "", // 姓名
                            gender: "", // 性别(1.男，2.女，0.未知)
                            undergraduateCollege: "", // 本科学校
                            undergraduateMajor: "", // 本科专业
                            IntendingMajor: "", // 意向专业
                            englishLevel: "", // 英语水平（1四级，2六级，3均未过）
                            graduationYear: "", // 毕业年份
                            mathematicsLevel: "" // 数学水平
                        };
                        setTimeout(() => {
                            uni.hideLoading();
                        });
                    } else {
                        this.showModals("提交失败");
                        return;
                    }
                }
            },
            showModals(str) {
                uni.showModal({title: "温馨提示", content: str, showCancel: false});
            },
        },
        mounted() {
            console.log(this.result);
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .searchDetail-head {
        margin-top: 20upx;
        position: relative;
        > img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 150upx;
            height: 150upx;
            border-radius: 50%;
            overflow: hidden;
            z-index: 2;
        }
        &:after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 1px;
            background-color: #000;
            z-index: 1;
        }
        .searchDetail-head-one {
            padding: 20upx 60upx 30upx 60upx;
            .icon {
                color: #999;
                font-size: 26upx;
                text {
                    padding-top: 10upx;
                }
            }
        }
        .searchDetail-head-two {
            box-sizing: border-box;
            padding: 0 60upx 0 60upx;
            button {
                &.active {
                    background-color: #5f96e8;
                }
                background-color: #1ad3cd;
                color: #fff;
                line-height: 1.75;
                font-size: 30upx;
                margin: 0;
            }
        }
    }
    .searchDetail-tags {
        box-sizing: border-box;
        padding: 0 80upx;
        margin-top: 40upx;
        .flex {
            margin-top: 20upx;
            text {
                margin: 0 10upx;
                box-sizing: border-box;
                overflow: hidden;
                font-size: 24upx;
                width: 23%;
                height: 36upx;
                line-height: 36upx;
                text-align: center;
                background-color: #d9d9d9;
                &:first-child {
                    margin-left: -10upx;
                }
                &:last-child {
                    margin-right: -10upx;
                }
            }
        }
    }
</style>