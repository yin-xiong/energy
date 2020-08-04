<template>
    <view class="searchDetail body">
        <view class="searchDetail-head flex align-center">
            <img :src="resData.avatar" alt="">
            <view class="searchDetail-head-right" style="width: 70%;">
                <view class="searchDetail-head-right-title">{{resData.universityName}}</view>
                <view class="searchDetail-tags">
                    <view class="flex align-center">
                        <text v-for=" item in resData.proSchoolState" :key="index">{{item}}</text>
                    </view>
                    <view class="flex align-center">
                        <text v-if="resData.province">{{resData.province}}</text>
                        <text v-if="resData.universityType">{{resData.universityType}}</text>
                        <text v-if="resData.subjection">{{resData.subjection}}</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="searchDetail-desc">
            <view class="searchDetail-desc-title flex align-center">
                <view>{{result.subjectCode || ''}}{{result.subjectName || ''}}</view>
                <text class="icon">
                    <text class="cuIcon-attention"></text>
                    {{result.reading || '0'}}
                </text>
            </view>
            <view>招生院系:<text>{{result.colleges[0].collegeName}}</text></view>
            <view>招生人数:<text>25人</text></view>
            <view>
                学位性质:
                <text v-if="result.type == 0">专业学位</text>
                <text v-else>学术学位</text>
            </view>
        </view>
        <view class="searchDetail-menuInfo">

<!--            <scroll-view class="searchDetail-menu" scroll-with-animation scroll-x :scroll-left="scrollLeft">-->
<!--                <view class="flex align-center justify-between">-->
<!--                    <view-->
<!--                            v-for="(item,index) in list"-->
<!--                            :class=" item.id == isActive ? 'active': ' ' "-->
<!--                            :key="item.id"-->
<!--                            @click="tabSelectList(item.id)"-->
<!--                    >-->
<!--                        <text>{{item.title}}</text>-->
<!--                    </view>-->
<!--                </view>-->
<!--            </scroll-view>-->
            <view class="searchDetail-menu">
                <view class="flex align-center justify-between">
                    <view
                            v-for="(item,index) in list2"
                            :class=" item.id == isActive ? 'active': ' ' "
                            :key="item.id"
                            @click="tabSelectList(item.id)"
                    >
                        <img :src=" item.id == isActive ? item.srcActive : item.src" alt="">
                        <text>{{item.title}}</text>
                    </view>
                </view>
            </view>
            <!--  专业简介 -->
            <view class="school-info-ext" v-if="isActive == 0">
                    <view>
                        <view v-html="result.introduction  || '暂无资料' "></view>
                    </view>
                </view>
            <!--  就业前景 -->
            <view class="school-info-ext" v-if="isActive == 1">
                    <view>
                        <view v-html="result.employProspect || '暂无资料' "></view>
                    </view>
                </view>
            <!--  初试科目 -->
            <view class="subjects" v-for="( item,index) in subjects" :key="index" v-if="isActive == 2">
                    <view class="subjects-head">
                        <view>研究方向：</view>
                        <view><text>{{item.name}}</text></view>
                        <view class="flex">
                            <view>
                                <view>招生人数</view>
                                <text>{{item.number}}</text>
                            </view>
                            <view>
                                <view>学习方式</view>
                                <text>{{item.studyMothod}}</text>
                            </view>
                        </view>
                    </view>
                    <view class="subjects-ext">
                        <view><text>政治</text>{{item.tests[0].politics}}</view>
                        <view><text>外语</text>{{item.tests[0].language}}</view>
                        <view><text>业务课程一</text>{{item.tests[0].business1}}</view>
                        <view><text>业务课程二</text>{{item.tests[0].business2}}</view>
                    </view>
                </view>
            <!--  研究方向 -->
            <view class="searchDetail-direction" v-if="isActive == 3">
                    <view class="list" v-for=" (item,index) in directions " :key="index">
                        <view class="searchDetail-direction-title">{{item.name}}</view>
                        <view>
                            <view>专业类别：<text v-if="item.type == 1">学术学位</text><text>专业学位</text></view>
                            <view>招生方式：{{item.examinationMethod}}</view>
                            <view>拟招人数：{{item.number}}</view>
                        </view>
                    </view>
                </view>
            <!--  参考书目 -->
            <view class="table" v-if="isActive == 4">
                    <view class="thead flex align-center justify-between">
                        <view>条目</view>
                        <view class="w35">科目名称</view>
                        <view>序号</view>
                        <view class="w35">参考书目</view>
                        <view>资料</view>
                    </view>
                    <view class="tbody flex  align-center justify-between" v-for="(item,index) in books" :key="item">
                        <view>{{item.entry}}</view>
                        <view class="w35">{{item.name}}</view>
                        <view>{{item.code}}</view>
                        <view class="w35">{{item.reference || '暂无制定参考书'}}</view>
                        <view>{{item.nature || '暂无资料'}}</view>
                    </view>
                </view>
            <!--  历年分数 -->
            <view class="history-lines" v-if="isActive == 5">
                <view>
                    <view class="flex align-center">
                        <view>数据</view>
                        <view v-for="item in row" :key="index">{{item.year}}</view>
                        <view>平均分</view>
                    </view>
                    <view class="flex align-center">
                        <view>目标分</view>
                        <view v-for="item in row" :key="index">{{item.maxScore || ' '}}</view>
                        <view>{{maxAvg}}</view>
                    </view>
                    <view class="flex align-center">
                        <view>最低分</view>
                        <view v-for="item in row" :key="index">{{item.minScore || ' '}}</view>
                        <view>{{minAvg}}</view>
                    </view>
                </view>
            </view>

            <view class="name-list" v-if="isActive == 5">
                <view class="flex align-center">
                    <view>
                        <view class="tr">姓名</view>
                        <view class="td">111</view>
                        <view class="td">222</view>
                    </view>
                    <view>
                        <view class="tr">初试分数</view>
                        <view class="td">111</view>
                        <view class="td">222</view>
                    </view>
                    <view>
                        <view class="tr">复试分数</view>
                        <view class="td">111</view>
                        <view class="td">222</view>
                    </view>
                    <view>
                        <view class="tr">来源</view>
                        <view class="td">111</view>
                        <view class="td">222</view>
                    </view>
                </view>
            </view>

        </view>

        <hans-tabber :isActive="1" />
    </view>
</template>
<script>

    export default {
        data(){
            return{
                resData:'',// 返回学校的数据
                result:'',// 返回学校专业的数据
                list:[
                    {id:0,title:'专业简介'},
                    {id:1,title:'就业前景'},
                    {id:2,title:'初试科目'},
                    {id:3,title:'研究方向'},
                    {id:4,title:'参考书目'},
                    {id:5,title:'历年分数'},
                ],
                list2:[
                    {id:0,title:'专业简介',src:'../../../static/image/icon/chose/zhuanye.png',srcActive:'../../../static/image/icon/chose/zhuanye1.png',},
                    {id:1,title:'就业前景',src:'../../../static/image/icon/chose/jiuye.png',srcActive:'../../../static/image/icon/chose/jiuye1.png',},
                    {id:2,title:'初试科目',src:'../../../static/image/icon/chose/yuanxiao.png',srcActive:'../../../static/image/icon/chose/yuanxiao1.png',},
                    {id:3,title:'研究方向',src:'../../../static/image/icon/chose/paiming.png',srcActive:'../../../static/image/icon/chose/paiming1.png',},
                    {id:4,title:'参考书目',src:'../../../static/image/icon/chose/book.png',srcActive:'../../../static/image/icon/chose/book1.png',},
                    {id:5,title:'历年分数',src:'../../../static/image/icon/chose/fangxiang.png',srcActive:'../../../static/image/icon/chose/fangxiang.png',},
                ],
                isActive:0,
                schCode:'', // 学校code
                composeCode:'', // 专业code
                majorCode:'', // 初试科目code
                books:'',// 参考书目
                row:'',// 历年分数
                maxAvg:'',// 目标分数
                minAvg:'',// 最低分数
                subjects:[],//初试科目
                directions:[],//研究方向
            }
        },
        computed: {
            scrollLeft() {
                return (this.tabCur - 1) * 60;
            }
        },
        onLoad (option) {
            if(option.data){
                this.schCode = JSON.parse(option.data).schCode
                this.composeCode = JSON.parse(option.data).composeCode
                this.majorCode = JSON.parse(option.data).majorCode

                // 获取学校详情
                this.getSchDetails(this.schCode)
                this.getMajorDetails(this.composeCode)
            }


        },
        onShareAppMessage: function () {},
        methods:{
            // 招生专业---》点击查看前往专业详情
            toMajor(){
                uni.navigateTo({
                    url:'/pages/index/searchDetail/details'
                })
            },
            // 菜单的相互切换
            tabSelectList(id){
                console.log(id);
                this.isActive = id
                if(id == 5){
                    // 查询历年分数
                    this.getMajorsScores()
                }else if(id == 4){
                    // 参考书目
                    this.getSchReference()
                }else if( id == 3){
                    // 研究方向
                    this.getMajorDirections(this.schCode,this.majorCode)
                }else if( id == 2){
                    // 获取初试科目内容
                    this.getMajorDirectionTest(this.schCode,this.majorCode)
                }else if( id == 1){
                    // 获取专业详情
                    this.getMajorDetails(this.composeCode)
                }
            },

            // 获取学校详情
            async getSchDetails(schCode){
                let data = {
                    code : schCode
                },
                    res= await this.$api.getSchoolDetails(data);
                console.log(res);
                if(res.code == 200){
                    this.resData = res.result
                }
            },
            // 获取专业详情
            async getMajorDetails(composeCode){
                let data = {
                    schCode: this.schCode,
                    composeCode,
                },
                    res = await this.$api.getMajorDetails(data);
                console.log(res);
                if(res.code == 200){
                    this.result = res.result
                    this.maxAvg = res.maxAvg
                    this.minAvg = res.minAvg
                }
            },
            // 获取初试科目
            async getMajorDirectionTest( schCode,majorCode ){
                let data = {
                    schCode,majorCode
                },
                    res = await this.$api.getMajorDirectionTest(data);
                console.log(res);
                if(res.code == 200){
                    this.subjects = res.rows
                }

            },
            // 获取研究方向
            async getMajorDirections( schCode,majorCode ){
                let data = {
                        schCode,majorCode
                    },
                    res = await this.$api.getMajorDirections(data);
                console.log(res);
                this.directions = res.rows
            },
            // 获取参考书目
            async getSchReference (){
                let data = {
                        schCode : this.schCode,
                        composeCode : this.composeCode,
                    },
                    res = await this.$api.getSchReference(data)
                console.log(res);
                this.books = res.rows
            },
            // 获取历年分数
            async getMajorsScores(){
                let data = {
                    schCode : this.schCode,
                    composeCode : this.composeCode,
                },
                    res = await this.$api.getMajorsScores(data)
                console.log(res);
                this.row = res.rows
                this.maxAvg = res.maxAvg
                this.minAvg = res.minAvg
            },

        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .page{
        background-color: #f8f8f8;
    }
    .searchDetail{
        background-color: #f8f8f8;
        min-height: 100vh;
        overflow: hidden;
        .searchDetail-head{
            flex-wrap: nowrap;
            margin: 20upx 10upx 0 10upx;
            >img{
                width: 120upx;
                height: 120upx;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 20upx;
            }
            .searchDetail-head-right{
                .searchDetail-head-right-title{
                    font-size: 30upx;
                    margin-bottom: 10upx;
                }
                .searchDetail-tags{
                    box-sizing: border-box;
                    .flex{
                        margin-bottom: 10upx;
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
            }
        }
        .searchDetail-desc{
            padding: 20upx 10upx;
            border: 1upx solid #eee;
            border-left: 0;
            border-right: 0;
            >view{
                margin: 4upx 0;
                color: #999;
                text{
                    color: #333;
                }
            }
            .searchDetail-desc-title{
                font-size: 30upx;
                color: #333;
                .icon{
                    margin-left: 60upx;
                    font-size: 26upx;
                    color: #999 !important;
                    text{
                        padding-right: 10upx;
                        color: #999 !important;
                    }
                }
            }
        }
        .searchDetail-menuInfo{
            .searchDetail-menu{
            /*    border: 1px solid #000;*/
            /*    border-left: 0;*/
            /*    border-right: 0;*/
                margin: 20upx 0;
            /*    padding: 20upx 10upx;*/
            /*    width: 100%;*/
            /*    overflow: hidden;*/
                .flex{
                    /*width: 120%;*/
                    /*overflow-x: scroll;*/
                    width: 100%;
                    flex-wrap: wrap;
                    box-sizing: border-box;
                    padding:0 10upx;
                    view{
                        width: 23%;
                        margin: 4%;
                        background-color: #f9f9f9;
                        text-align: center;
                        border-radius: 10upx;
                        padding: 10upx;
                        font-size: 24upx;
                        img{
                            display: block;
                            margin: 10upx auto ;
                            width: 50upx;
                            height: 50upx;
                        }
                        &.active{
                            background-color: #1AD3CD;
                            color: #fff;
                        }
                    }
                }
            }
            .school-info-ext{
                >view{
                    /*background-color: #c9cace;*/
                    /*border-radius: 10upx;*/
                    box-sizing: border-box;
                    padding: 10upx 14upx;
                    margin: 10upx;
                }
            }
            .subjects{
                box-sizing: border-box;
                margin: 20upx;
                border-radius: 10upx;
                background-color: #fff;
                overflow: hidden;
            }
            .subjects-head{
                background-color: #dff1f1;
                padding: 12upx;
                view{
                    color: #999;
                    line-height: 1.75;
                    font-size: 26upx;
                    text{
                        color: #333;
                        font-size: 28upx;
                    }
                }
                .flex{
                    text{
                        color: #333;
                        font-size: 30upx;
                    }
                    view:first-child{
                        margin-right: 30upx;
                    }
                }
            }
            .subjects-ext{
                margin: 10upx;
                view{
                    display: flex;
                    align-items: center;
                    flex-wrap: nowrap;
                    margin-top: 20upx;
                    text{
                        width: 180upx;
                        color: #999;
                        font-size: 26upx;
                    }
                }

            }
            .searchDetail-direction{
                margin: 10upx;
                overflow: hidden;
                padding-bottom: 20upx;
                background-color: #f6fafd;
                .list{
                    background-color: #fff;
                    margin-bottom: 20upx;
                    box-sizing: border-box;
                    padding: 20upx;
                    border-radius: 10upx;
                    border: 1upx solid #eee;
                    .searchDetail-direction-title{
                        font-weight: bold;
                        font-size: 30upx;
                        margin-bottom: 20upx;
                        color: #333;
                    }
                    view{
                        color:#999;
                    }
                }
            }
            .table {
                border: 1upx solid #ccc;
                font-size: 24upx;
                border-right: none;
                border-top: none;
                line-height: 1.5;
                text-align: center;
                margin: 0 10upx;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                .w35{width: 35%!important;}
                .flex{
                    >view{
                        width: 10%;
                        border: 1upx solid #ccc;
                    }
                }
                .thead{
                    border-top: 1upx solid #ccc;
                    border-right: 1upx solid #ccc;
                    view{
                        white-space: nowrap;
                    }
                }
                .tbody{
                    border-right: 1upx solid #ccc;
                    view{
                        height: 86upx;
                        overflow: hidden;
                        &.w35{
                            text-align: justify;
                            padding: 6upx;
                            -webkit-box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            box-sizing: border-box;
                        }
                    }
                }

            }
            .books{
                margin:0 10upx;
                border: 1upx solid #ccc;
                .books-list{
                    flex-wrap: nowrap;
                    view {
                        width: 10%;
                        text-align: center;
                        &.nospace{
                            width: 35%;
                            text:last-child{
                                box-sizing: border-box;
                                text-align: justify;
                                padding: 0 10upx;
                            }
                        }
                        text{
                            display: block;
                            font-size: 24upx;
                            line-height: 1.5;
                            border-left: 1upx solid #ccc;
                            border-bottom: 1upx solid #ccc;
                            &:first-child{
                                height: 36upx;
                                white-space: nowrap;
                            }
                            &:last-child{
                                height: 72upx;
                                border-bottom: 0;
                            }
                        }
                    }
                }
            }
            .history-lines{
                margin: 10upx;
                >view{
                    .flex{
                        width: 100%;
                        border: 1upx solid #000;
                        border-left: 0;
                        border-right: 0;
                        border-top:0;
                        &:first-child{
                            border-top:1upx solid #000;
                        }
                        view{
                            width: 16.66%;
                            height: 50upx;
                            text-align: center;
                            border-right: 1upx solid #000;
                            line-height: 1.75;
                            border-left: 0;
                            &:first-child{
                                border-left: 1upx solid #000;
                            }
                        }
                    }
                }
            }
            .name-list{
                margin: 10upx;
                .flex{
                    width: 100%;
                    >view{
                        width: 25%;
                        height: 50upx;
                        text-align: center;
                        line-height: 1.75;
                        >view{
                            width: 100%;
                        }
                        .tr{
                            border: 1upx solid #000;
                        }
                        .td{
                            border: 1upx solid #000;
                        }
                    }
                }

            }
        }
    }
</style>
