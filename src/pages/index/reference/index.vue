<template>
    <view class="searchDetail body">

        <schoolHeader :result="result"></schoolHeader>
        <view class="searchDetail-menuInfo">

            <view class="settings">
                <view v-for="(item,index) in settings" :class=" item.flag ? 'item-setting' : 'item-setting active' " :key="index">
                    <view @click="showItemSetting(index,item.composeCode,item.schCode)" class="flex align-center justify-between">
                        <text>{{item.collegeName}}</text>
                        <text class="icon"><text class="cuIcon-right"></text></text>
                    </view>
                    <view class="item-setting-info">
                        <view
                                class="flex align-center justify-between"
                                v-for="(citem,cindex) in settingsItems"
                                :key="cindex"
                                @click="toMajor(citem.composeCode,citem.code)"
                        >
                            <text>{{citem.code + '  ' + citem.majorName}}</text>
                            <text class="cuIcon-right"></text>
                        </view>
                    </view>
                </view>
            </view>

        </view>

        <hans-tabber :isActive="1" />
    </view>
</template>
<script>

    import schoolHeader from "../../components/schoolHeader";

    export default {
        data(){
            return{
                code:'',
                result:[],// 学校详情
                settings:[],
                settingsItems:[],
            }
        },
        onShareAppMessage: function () {},
        onLoad ( option ) {
            this.code = option.code
            console.log(option);
            this.getDetails(option.code)
            this.getCollegeList(option.code)
        },
        components:{
            schoolHeader,
        },
        methods:{
            // 获取学校详情
            async getDetails(code){
                let data = {code},
                    res = await this.$api.getSchoolDetails(data);
                if(res.code == 200){
                    console.log(res);
                    this.result = res.result
                }else{
                    uni.showModal({
                        title:'温馨提示',
                        content:'获取资料失败，请查看其他学校',
                        showCancel:false,
                        success:res=>{
                            uni.navigateTo()
                        }
                    })
                }
            },
            // 获取院系设置的列表
            async getCollegeList(code){
                let data = {
                        code
                    },
                    res = await this.$api.getCollegeList(data)
                console.log(res);
                if(res.code == 200){
                    res.rows = res.rows.map( item=>{
                        item.flag = true
                        return item
                    } )
                    this.settings = res.rows
                }
                console.log(this.settings);
            },
            // 院系设置的显示隐藏
            async showItemSetting(index,composeCode,schCode){
                if(this.settings[index].flag){
                    this.settings[index].flag = false
                    // 获取每个学院下的列表，点击前往详情
                    let data = {
                            schCode: schCode,
                            collegeCode: composeCode
                        },
                        res = await this.$api.getMajorsBySchCode(data);
                    console.log(res);
                    this.settingsItems = res.rows
                }else{
                    this.settings[index].flag = true
                    this.settingsItems = []
                }

            },
            // 点击查看前往专业详情
            toMajor(composeCode,majorCode){
                console.log(composeCode);
                let data = {
                    composeCode,
                    schCode:this.code,
                    majorCode,
                }
                uni.navigateTo({
                    url:'/pages/index/searchDetail/details?data=' + JSON.stringify(data)
                })
            },
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    page{
        background-color: #f8f8f8;
    }
    .searchDetail{
        min-height: 100vh;
        overflow: hidden;
        .searchDetail-head{
            margin-top: 20upx;
            position: relative;
            >img{
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
            &:after{
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 1px;
                background-color: #000;
                z-index: 1;
            }
            .searchDetail-head-one{
                padding:20upx 60upx 30upx 60upx;
                .icon{
                    color: #999;
                    font-size: 26upx;
                    text{
                        padding-top: 10upx;
                    }
                }
            }
            .searchDetail-head-two{
                box-sizing: border-box;
                padding: 0 60upx 0 60upx;
                button{
                    background-color: #fc3810;
                    color: #fff;
                    line-height: 1.75;
                    font-size: 30upx;
                    margin: 0;
                }
            }
        }
        .searchDetail-tags{
            box-sizing: border-box;
            padding:0 80upx;
            margin-top: 40upx;
            .flex{
                margin-top: 20upx;
                text{
                    margin: 0 10upx;
                    box-sizing: border-box;
                    overflow: hidden;
                    font-size: 24upx;
                    width: 23%;
                    height: 36upx;
                    line-height: 36upx;
                    text-align: center;
                    background-color: #d9d9d9;
                    &:first-child{
                        margin-left: -10upx;
                    }
                    &:last-child{
                        margin-right: -10upx;
                    }
                }
            }
        }
        .searchDetail-menuInfo{
            margin: 20upx;
            .item-setting{
                margin-top: 20upx;
                border: 1upx solid #ccc;
                border-radius: 10upx;
                background-color: #fff;
                overflow: hidden;
                &.active{
                    .flex{
                        .icon{
                            transform: rotate(90deg);
                        }
                    }
                    .item-setting-info,.enrollment-major-check{
                        height: auto;
                    }
                }
                .flex{
                    background-color: #fff;
                    box-sizing: border-box;
                    padding:20upx;
                    .icon{
                        transition: all .4s;
                    }
                }
            }
            .item-setting-info{
                height: 0;
                overflow: hidden;
                box-sizing: border-box;
                margin: 0 20upx;
                .flex{
                    border-bottom: 1upx solid #ccc;
                    &:last-child{
                        border-bottom: 0;
                    }
                }
            }
        }
        .cu-modal .cu-dialog{
            height: 70vh;
            overflow-y: scroll;
        }
        .wishContent{
            padding: 30upx;
            .wishContent-title{
                text-align: justify;
                font-size: 24upx;
            }
            .wishContent-form{
                form{
                    text-align: start;
                    input,button,label{
                        font-size: 24upx;
                    }
                    .cu-form-group{
                        height: 80upx;
                        min-height: 80upx;
                    }
                    .title{
                        font-size: 24upx;
                        white-space: nowrap;
                        width: 30%;
                    }
                    .subBtn{
                        width: 40%;
                        margin: 0 auto;
                        text-align: center;
                        button{
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>
