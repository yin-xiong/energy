<template>
    <view class="professional">
        <view class="professional-head">
            <view class="professional-head-warp">
                <view class="flex align-center justify-between professional-head-top">
                    <view class="professional-head-top-left">
                        <img src="../../../../static/image/icon/zhuanye01.png" />
                    </view>
                    <view class="flex align-center justify-between professional-head-top-right">
                        <view>
                            <view>{{result.code}}</view>
                            <view class="professional-head-top-right-title">{{result.majorName}}</view>
                        </view>
                        <view class="professional-head-top-right-look"><text class="cuIcon-attention"></text>{{result.reading}}</view>
                    </view>
                </view>
                <view class="professional-head-warp-ext">
                    <view class="">
                        学科门类：<text>{{result.categoryCode}}{{result.categoryName}}</text>
                    </view>
                    <view class="">
                        一级学科：<text>{{result.subjectCode}}{{result.subjectName}}</text>
                    </view>
                    <view class="">
                        专业类型：<text v-if="result.type == 1">学术学位</text><text v-else>专业学位</text>
                    </view>
                    <view v-if="reqData.minScore&&reqData.maxScore">
                        已选分数：<text>{{reqData.minScore +'--'+ reqData.maxScore}}</text>
                    </view>
                </view>
            </view>
        </view>
        <scroll-view v-if="nobooks !=5 " class="searchDetail-menu " scroll-with-animation scroll-x :scroll-left="scrollLeft">
            <view class="flex align-center justify-between">
                <view
                    v-for="(item,index) in list"
                    :class=" item.id == isActive ? 'active': ' ' "
                    :key="item.id"
                    @click="tabSelectList(item.id)"
                >
                    <img :src=" item.id == isActive ? item.srcActive : item.src" alt="">
                    <text>{{item.title}}</text>
                </view>
            </view>
        </scroll-view>
        <view class="professional-info">
            <view v-if="isActive == 0">
                <view v-html="result.introduction"></view>
            </view>
            <view v-else-if="isActive == 1">
                <view v-html="result.employProspect"></view>
            </view>
            <view v-else-if="isActive == 2">
                <view class="recommendeds">
                    <view class="recommended-list">
                        <!-- 院校属地选择 -->
                        <view :class=" showSchoolFlag1 ? 'recommended-list-item active ' : 'recommended-list-item '  ">
                            <view @click="showSchool" class="recommended-list-item-title flex align-center justify-between">
                                <view>院校属地：</view>
                                <view>
                                    <text v-for="(item,index) in addressList" :key="index" v-if="item.flag == true">{{ item.text }}</text>
                                    <text class="cuIcon-right"></text>
                                </view>
                            </view>
                            <view class="btn-list recommended-list-item-content">
                                <button
                                        :class=" item.flag ? 'cu-btn active' : 'cu-btn' "
                                        v-for=" (item,index) in addressList " :key="index"
                                        @click="choseSchoolTerritorial(index,item.text,item.val)"
                                >{{item.text}}</button>
                            </view>
                        </view>
                        <!-- 院校属性选择 -->
                        <view :class=" showSchoolFlag2 ? 'recommended-list-item active ' : 'recommended-list-item '  ">
                            <view @click="showAttr" class="recommended-list-item-title flex align-center justify-between">
                                <view>院校属性：</view>
                                <view class="one-txt-cut">
                                    <text>
                                        <text v-for="(item,index) in attributeList" :key="index" v-if="item.flag == true">{{ item.text }}</text>
                                    </text>
                                    <text class="cuIcon-right"></text>
                                </view>
                            </view>
                            <view class="recommended-list-item-content">
                                <view class="recommended-list-chose flex align-center justify-between">
                                    <text>可多选</text>
                                    <text @click="showSchoolFlag2 = false">确定</text>
                                </view>
                                <view class="btn-list">
                                    <button
                                            :class=" item.flag ? 'cu-btn active' : 'cu-btn' "
                                            v-for=" (item,index) in attributeList " :key="index"
                                            @click="choseSchoolAttr(index,item.text,item.val,item.status)"
                                    >{{item.text}}</button>
                                </view>
                            </view>
                        </view>
                        <!-- 院校类型选择 -->
                        <view :class=" showSchoolFlag3 ? 'recommended-list-item active ' : 'recommended-list-item '  ">
                            <view @click="showType" class="recommended-list-item-title flex align-center justify-between">
                                <view>院校类型：</view>
                                <view class="one-txt-cut">
                                    <text class="">
                                        <text v-for="(item,index) in typeList" :key="index" v-if="item.flag == true">{{ item.text }}</text>
                                    </text>
                                    <text class="cuIcon-right"></text>
                                </view>
                            </view>
                            <view class="recommended-list-item-content">
                                <view class="recommended-list-chose flex align-center justify-between">
                                    <text>可多选</text>
                                    <text @click="showSchoolFlag3 = false">确定</text>
                                </view>
                                <view class="btn-list">
                                    <button
                                            :class=" item.flag ? 'cu-btn active' : 'cu-btn' "
                                            v-for=" (item,index) in typeList " :key="index"
                                            @click="choseSchoolType(index,item.text,item.val,item.status)"
                                    >{{item.text}}</button>
                                </view>
                            </view>
                        </view>
                    </view>

                    <view class="school-total">共收录{{total}}所高校数据</view>
                    <view class="school-list">
                        <view
                                class="school-list-item flex align-center justify-between"
                                v-for=" ( item,index ) in rows " :key="index"
                                @click="goZhuanye(item.code)"
                        >
                            <view class="school-list-item-left"><img :src="item.avatar" alt=""></view>
                            <view class="school-list-item-right">
                                <view class="school-list-item-right-top flex align-center justify-between">
                                    <text>{{item.universityName}}</text>
                                    <text class="icon"><text class="cuIcon-attention"></text>{{item.reading}}</text>
                                </view>
                                <view class="school-list-item-right-type">
                                    <text v-for="(citem,cindex) in item.proSchoolState" :key="cindex">{{citem}}</text>
                                </view>
                                <view class="school-list-item-right-bom">
                                    <text class="cuIcon-location" style="margin-right: 30upx;">{{item.province}}</text>
                                    <text class="cuIcon-cascades">{{item.universityType}}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view v-else-if="isActive == 3">
                <view class="schoolRank" v-html="schoolRank"></view>
            </view>
            <view v-else-if="isActive == 4">
                <view class="searchDetail-direction">
                    <view class="list" v-for=" (item,index) in directions " :key="index">
                        <view class="searchDetail-direction-title">{{item.name}}</view>
                        <view>
                            <view>专业类别：<text v-if="item.type == 1">学术学位</text><text>专业学位</text></view>
                            <view>招生方式：{{item.examinationMethod}}</view>
                            <view>拟招人数：{{item.number}}</view>
                        </view>
                    </view>
                </view>
            </view>
            <view v-else :style="{ 'margin-top': mtop + 'px' }" class="history-lines">
                <view class="table">
                    <view class="tr thead flex justify-between">
                        <view class="td1" style="font-weight:600">序号</view>
                        <view class="td2 " style="font-weight:600;text-align:center;">参考书目</view>
                        <view class="td1" style="font-weight:600">资料</view>
                    </view>
                    <view class="tr tbody flex justify-between" v-for="(item,index) in books" :key="index">
                        <view class="td1">{{item.code}}</view>
                        <view class="td2">{{item.reference}}</view>
                        <view class="td1">{{item.nature}}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    export default {
        data(){
            return{
                isActive:2,
                list:[
                    {id:0,title:'专业简介',src:'../../../../static/image/icon/chose/zhuanye.png',srcActive:'../../../../static/image/icon/chose/zhuanye1.png',},
                    {id:1,title:'就业前景',src:'../../../../static/image/icon/chose/jiuye.png',srcActive:'../../../../static/image/icon/chose/jiuye1.png',},
                    {id:2,title:'院校推荐',src:'../../../../static/image/icon/chose/yuanxiao.png',srcActive:'../../../../static/image/icon/chose/yuanxiao1.png',},
                    {id:3,title:'院校排名',src:'../../../../static/image/icon/chose/paiming.png',srcActive:'../../../../static/image/icon/chose/paiming1.png',},
                    {id:4,title:'专业方向',src:'../../../../static/image/icon/chose/fangxiang.png',srcActive:'../../../../static/image/icon/chose/fangxiang.png',},
                    {id:5,title:'参考书目',src:'../../../../static/image/icon/chose/book.png',srcActive:'../../../../static/image/icon/chose/book1.png',},
                ],
                result:'',
                schoolRank:'',
                composeCode:'',
                schCode:'',
                majorCode:'',
                books:'',

                isChose1:'', // 选中的院校属地
                isChose2:'', // 选中的院校属性
                isChose3:'', // 选中的院校类型

                showSchoolFlag1:false,//院校属地的展开关闭
                showSchoolFlag2:false,//院校属性的展开关闭
                showSchoolFlag3:false,//院校类型的展开关闭

                addressList:[
                    {flag : true,text: "不限", val : ""},
                    {flag : false, text : "北京", val : "北京"},
                    {flag : false, text : "天津", val : "天津"},
                    {flag : false, text : "河北", val : "河北"},
                    {flag : false, text : "山西", val : "山西"},
                    {flag : false, text : "辽宁", val : "辽宁"},
                    {flag : false, text : "吉林", val : "吉林"},
                    {flag : false, text : "黑龙江",val : "黑龙江"},
                    {flag : false, text : "上海", val : "上海"},
                    {flag : false, text : "江苏", val : "江苏"},
                    {flag : false, text : "浙江", val : "浙江"},
                    {flag : false, text : "安徽", val : "安徽"},
                    {flag : false, text : "福建", val : "福建"},
                    {flag : false, text : "江西", val : "江西"},
                    {flag : false, text : "山东", val : "山东"},
                    {flag : false, text : "河南", val : "河南"},
                    {flag : false, text : "湖北", val : "湖北"},
                    {flag : false, text : "湖南", val : "湖南"},
                    {flag : false, text : "广东", val : "广东"},
                    {flag : false, text : "重庆", val : "重庆"},
                    {flag : false, text : "四川", val : "四川"},
                    {flag : false, text : "陕西", val : "陕西"},
                    {flag : false, text : "内蒙古",val : "内蒙古"},
                    {flag : false, text : "广西", val : "广西"},
                    {flag : false, text : "海南", val : "海南"},
                    {flag : false, text : "贵州", val : "贵州"},
                    {flag : false, text : "云南", val : "云南"},
                    {flag : false, text : "西藏", val : "西藏"},
                    {flag : false, text : "甘肃", val : "甘肃"},
                    {flag : false, text : "青海", val : "青海"},
                    {flag : false, text : "宁夏", val : "宁夏"},
                    {flag : false, text : "新疆", val : "新疆"},
                    {flag : false, text : "香港", val : "香港"},
                    {flag : false, text : "澳门", val : "澳门"},
                    {flag : false, text : "台湾", val : "台湾"}
                ], // 院校属地
                attributeList:[
                    { flag : true, text: "不限", val: 0, status: 1},
                    { flag : false, text: "985", val: 1, status: 0},
                    { flag : false, text: "211", val: 3, status: 0},
                    { flag : false, text: "双一流", val: 4, status: 0},
                    { flag : false, text: "自划线", val: 2, status: 0}
                ] ,// 院校属性
                typeList:[
                    { flag : true, val: -1, text: "不限", status: 1 },
                    { flag : false, val: 0, text: "其他", status: 0 },
                    { flag : false, val : 1, text : "综合类", status : 0 },
                    { flag : false, val : 2, text : "理工类", status : 0 },
                    { flag : false, val : 3, text : "医药类", status : 0 },
                    { flag : false, val : 4, text : "师范类", status : 0 },
                    { flag : false, val : 5, text : "农林类", status : 0 },
                    { flag : false, val : 6, text : "政法类", status : 0 },
                    { flag : false, val : 7, text : "财经类", status : 0 },
                    { flag : false, val : 8, text : "民族类", status : 0 },
                    { flag : false, val : 9, text : "语言类", status : 0 },
                    { flag : false, val : 10, text : "艺术类", status : 0 },
                    { flag : false, val : 11, text : "体育类", status : 0 },
                    { flag : false, val : 12, text : "军事类", status : 0 },
                    { flag : false, val : 13, text : "旅游类", status : 0 }
                ], // 院校类型
                rows:[],
                directions:[], // 专业方向的列表
                total:'',
                reqData:{
                    pageNum: 1,
                    pageSize: 20,
                    province:'',
                    proSchoolStates:'',
                    universityType:'',
                    minScore:'',
                    maxScore:'',
                    orderByColumn: 'code',
                    isAsc: 'asc',
                    subjectCode:'',
                    language:'',
                    categoryCode:'',
                    business1:'',
                    majorCode: '',
                    majorName: '',
                    type:'',
                },
                nobooks:'',//如果用户从专业课资料进来，那么只显示参考书目
                mtop:0,
            }
        },
        computed: {
            scrollLeft() {
                return (this.tabCur - 1) * 60;
            }
        },
        onShareAppMessage: function () {},
        onLoad( option ){
            if(option.nobook && option.nobook == 5){
                this.nobooks = option.nobook
                this.isActive = option.nobook
                this.mtop = 80
                this.getMajorReference(this.composeCode)
            }else{
                this.isActive = 2
                this.mtop = 0
            }
            if(option.minScore && option.maxScore){
                console.log(option.minScore);
                console.log(option.maxScore);
                this.reqData.minScore = option.minScore
                this.reqData.maxScore = option.maxScore
            }
            this.composeCode = option.composeCode
            this.professionalDetails(this.composeCode)
            this.getSchoolRank(this.composeCode)

        },
        //上拉加载更多
        async onReachBottom(){
            uni.showLoading({title:'加载中……'});
            this.reqData.pageNum ++;
            let res = await this.$api.getSchoolList(this.reqData);
            if (res.code == 200 && res.rows.length > 0){
                this.rows = [...this.rows,...res.rows]
                uni.hideLoading()
            }else{
                uni.hideLoading()
                return
            }
        },
        methods:{
            // 菜单的相互切换
            tabSelectList(id){
                console.log(id);
                this.isActive = id
                if(id == 4){
                    this.getMajorDirections(this.majorCode)
                }else if( id == 5){
                    this.getMajorReference(this.composeCode)
                }
            },
            // 院校属地下的下拉展开菜单
            showSchool(){
                this.showSchoolFlag1 = !this.showSchoolFlag1
                this.showSchoolFlag2 = false
                this.showSchoolFlag3 = false
            },
            // 单选院校属地
            choseSchoolTerritorial(index,text,val){
                for ( let item of this.addressList ){
                    item.flag = false
                }
                this.addressList[index].flag = true

                this.reqData.pageNum = 1
                this.reqData.province = val
                this.getSchoolList(this.reqData)
                this.showSchoolFlag1 = false
            },

            // 院校属性下的下拉展开菜单
            showAttr(){
                this.showSchoolFlag1 = false
                this.showSchoolFlag2 = !this.showSchoolFlag2
                this.showSchoolFlag3 = false
            },
            // 院校属性
            choseSchoolAttr(index,text,val,status){
                console.log(text);
                this.reqData.pageNum = 1
                // 如果点击的是 不限 ，就设置其他所有的flag == true
                if(index == 0){
                    this.reqData.proSchoolStates = ''
                    for( let item of this.attributeList){
                        item.flag = false
                    }
                    this.attributeList[0].flag = true
                }else{
                    // 点击了其他分类，设置第一个身上的flag == false,设置参数为空字符
                    this.attributeList[0].flag = false
                    this.attributeList[index].flag = !this.attributeList[index].flag
                    let newAttr = '';
                    for( let item of this.attributeList){
                        if(item.flag){
                            console.log(item);
                            newAttr += item.text+','
                        }
                    }
                    this.reqData.proSchoolStates = newAttr
                }
                console.log(this.reqData.proSchoolStates);
                this.getSchoolList(this.reqData)
            },
            // 院校类型下的下拉展开菜单
            showType(){
                this.showSchoolFlag1 = false
                this.showSchoolFlag2 = false
                this.showSchoolFlag3 = !this.showSchoolFlag3
            },
            // 院校类型
            choseSchoolType(index,text,val,status){
                console.log(text);
                this.reqData.pageNum = 1
                // 如果点击的是 不限 ，就设置其他所有的flag == true
                if(index == 0){
                    this.reqData.universityType = ''
                    for( let item of this.typeList){
                        item.flag = false
                    }
                    this.typeList[0].flag = true
                }else{
                    // 点击了其他分类，设置第一个身上的flag == false,设置参数为空字符
                    this.typeList[0].flag = false
                    this.typeList[index].flag = !this.typeList[index].flag
                    let newAttr = '';
                    for( let item of this.typeList){
                        if(item.flag){
                            console.log(item);
                            newAttr += item.text+','
                        }
                    }
                    this.reqData.universityType = newAttr
                }
                console.log(this.reqData.universityType);
                this.getSchoolList(this.reqData)
            },

            // 点击学校列表进入专业详情
            async goZhuanye(code){
                let odata = {
                    composeCode : this.composeCode,
                    schCode: code,
                    majorCode:this.majorCode
                };
                uni.navigateTo({
                    url: "/pages/index/searchDetail/details?data=" + JSON.stringify(odata)
                });
            },

            // 获取改专业的详情
            async professionalDetails(composeCode){
                uni.showLoading({title:'加载中……'});
                let data = {composeCode}, res = await this.$api.professionalDetails(data);
                console.log(res);
                if(res.code == 200){
                    uni.hideLoading()
                    this.result = res.result
                    this.majorCode = res.result.code
                    this.reqData.majorCode = res.result.code
                    this.reqData.majorName = res.result.majorName
                    this.getSchoolList(this.reqData)
                }else{
                    uni.hideLoading()
                }
            },

            async getSchoolList(reqData){
                let resp = await this.$api.getSchoolList(reqData)
                if(resp.code == 200){
                    this.rows = resp.rows
                    this.total = resp.total
                }
            },

            // 获取院校排名
            async getSchoolRank(composeCode){
                let data = {composeCode}, res = await this.$api.getSchoolRank(data);
                if(res.code == 200){
                    console.log(res);
                    let ricehImg = res.result.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
                    this.schoolRank = ricehImg
                }else{
                    return
                }
            },

            // 获取专业方向
            async getMajorDirections(majorCode){
                let data = {
                        majorCode,
                        pageNum: 1,
                        pageSize: 20,
                    },
                    res = await this.$api.getMajorDirections(data);
                if(res.code == 200){
                    console.log(res);
                    this.directions = res.rows
                }else{
                    return
                }
            },

            // 获取参考书目
            async getMajorReference(composeCode){
                let data = {composeCode}, res = await this.$api.getMajorReference(data);
                if(res.code == 200){
                    console.log(res);
                    this.books = res.rows
                }else{
                    return
                }
            },
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .professional{
        width: 100%;
        background-color: #f8f8f8;
        min-height: 100vh;
        .professional-head{
            background: #00b3a0;
            width: 100%;
            height: 180upx;
            .professional-head-warp{
                width: 90%;
                box-sizing: border-box;
                padding: 30upx;
                background: #fff;
                position: absolute;
                top: 20upx;
                left: 0;
                right: 0;
                margin: auto;
                border-radius: 15upx;
                box-shadow: 0 0.8vw 5.333vw 0 rgba(17, 66, 61, 0.1);
                .professional-head-top{
                    margin-bottom: 30upx;
                    .professional-head-top-left{
                        width: 100upx;
                        height: 100upx;
                        background-color: #e5f5f3;
                        border-radius: 50%;
                        img{
                            width: 100%;
                            height: 100upx;
                        }
                    }
                    .professional-head-top-right{
                        width: 75%;
                        .professional-head-top-right-title{
                            font-size: 40upx;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .professional-head-top-right-look{
                            color: #8b93a6;
                            text{
                                margin-right: 10upx;
                            }
                        }
                    }
                }
                .professional-head-warp-ext{
                    view{
                        font-size: 26upx;
                        color: #8b93a6;
                        text{
                            font-size: 28upx;
                            color: #262626;
                        }
                    }

                }
            }
        }
        .searchDetail-menu{
            margin: 210upx auto 0 auto;
            width: 90%;
            overflow: hidden;
            white-space: nowrap;
            view.flex{
                overflow-x: scroll;
                view{
                    width: 170upx;
                    height: 140upx;
                    margin-left: 30upx;
                    background-color: #f1f1f1;
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
                    &:first-child{
                        margin-left: 0;
                    }
                    &.active{
                        background-image: linear-gradient(135deg, #2fcda7, #02a190);
                        color: #fff;
                    }
                }
            }
        }
        .professional-info{
            width: 90%;
            margin: 10upx auto;
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
            .history-lines{
                margin: 10upx;
                .table{
                    border: 1upx solid #000;
                    background: #fff;
                    .thead,.tbody{
                        border-bottom: 1upx solid #000;
                        view{
                            border-left: 1upx solid #000;
                            &:first-child{
                                border-left: 0;
                            }
                        }
                    }
                    .td1{
                        width: 15%;
                        text-align: center;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        padding: 6upx;
                    }
                    .td2{
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        padding: 6upx;
                        width: 70%;
                        text-align: justify;
                    }
                }
            }
            .schoolRank{
                img{
                    width: 100%;
                }
            }
            .recommendeds{
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                .recommended-list{
                    .recommended-list-item{
                        border-bottom: 1upx solid #ccc;
                        &.active{
                            .recommended-list-item-title{
                                .cuIcon-right{
                                    transform: rotate(90deg);
                                }
                            }
                            .recommended-list-item-content{
                                height: auto;
                            }
                        }
                        .recommended-list-item-title{
                            height: 80upx;
                            font-size: 30upx;
                            view{
                                text{
                                    display: inline-block;
                                    font-size: 26upx;
                                    color: #8b93a6;
                                    &.cuIcon-right{
                                        margin-left: 10upx;
                                        transition: all .8s;
                                    }
                                }
                            }
                            .one-txt-cut{
                                display: flex;
                                align-items: center;
                                >text:first-child{
                                    display: block;
                                    text-overflow: ellipsis;
                                    width: 400upx;
                                    text-align: right;
                                    overflow: hidden;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                    text{
                                        margin-right: 4upx;
                                    }
                                }
                            }
                        }
                        .recommended-list-chose{
                            height: 100upx;
                            text{
                                color: #00b3a0;
                                &:first-child{
                                    color: #8b93a6;
                                }
                            }
                        }
                        .recommended-list-item-content{
                            height: 0;
                            overflow: hidden;
                            transition: height 1s;
                        }
                        .btn-list{
                            margin-left: -10upx;
                            margin-right: -10upx;
                            button{
                                width: 22%;
                                margin: 10upx;
                                transition: all .4s;
                                &.active{
                                    background-color: #00b3a0;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
                .school-total{
                    text-align: center;
                    font-size: 30upx;
                    color: #8b93a6;
                    margin: 20upx 0;
                }
                .school-list{
                    .school-list-item{
                        background: #fff;
                        margin-bottom: 30upx;
                        box-sizing: border-box;
                        padding: 10upx;
                        .school-list-item-left{
                            width: 190upx;
                            height: 190upx;
                            img{
                                width: 100%;
                                height: 190upx;
                            }
                        }
                        .school-list-item-right{
                            width: 60%;
                            .school-list-item-right-top{
                                height: 60upx;
                                .icon{
                                    color: #8b93a6;
                                    font-size: 24upx;
                                }
                            }
                            .school-list-item-right-type{
                                margin-top: 20upx;
                                text{
                                    color: #22a6a1;
                                    background: #e8f6f5;
                                    font-size: 24upx;
                                    margin-right: 8upx;
                                    padding: 8upx 10upx;
                                }
                            }
                            .school-list-item-right-bom{
                                margin-top: 20upx;
                                text{
                                    font-size: 24upx;
                                    color: #8b93a6;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
