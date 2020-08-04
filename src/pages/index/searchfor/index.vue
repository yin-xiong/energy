<template>
    <view class="searchfor body">
        <view class="searchfor-mark" v-if="isChose == 1">
            <view class="searchfor-mark-input flex">
                <view class="flex">
                    <input type="text" placeholder="请输入最低分" v-model="reqData.minScore">
                    <text></text>
                    <input type="text" placeholder="请输入最高分" v-model="reqData.maxScore">
                    <button class="cu-btn cuIcon-search bg-blue" @click="minOrMaxSearch"> 搜索</button>
                </view>
            </view>
        </view>
        <view class="searchfor-major" v-else-if="isChose == 2">
            <view class="searchfor-input flex">
                <input type="text" placeholder="请输入专业内容" v-model="reqData.majorName" @confirm="searchMajorName"/>
                <button class="cu-btn cuIcon-search bg-blue" @click="searchMajorName"> 搜索</button>
            </view>
        </view>
        <view class="searchfor-major" v-else>
            <view class="searchfor-input flex">
                <input type="text" placeholder="请输入查询方向内容" v-model="reqDataDirection.name" @blur="directionSearch" />
                <button class="cu-btn cuIcon-search bg-blue" @click="directionSearch"> 搜索</button>
            </view>
        </view>
        <view class="searchfor-condition">
            <view :class=" active1 ? 'cu-item active ' : 'cu-item ' ">
                <view class="content flex justify-between align-center" @click="chang1">
                    <view>学科门类</view>
                    <view>
                        <text v-for="(item,index) in options1" :key="index" v-if="item.flag == true">{{ item.text }}</text>
                        <text class="cuIcon-right"></text>
                    </view>
                </view>
                <view class="cu-item-btn">
                <button
                    :class=" item.flag ? 'cu-btn shadow active ' : 'cu-btn shadow ' "
                    v-for="(item,index) in options1"
                    :key="index"
                    @click="chose1(index,item.val)"
                    >{{item.text}}</button>
                </view>
            </view>
            <view :class=" active2 ? 'cu-item active ' : 'cu-item ' ">
                <view class="content flex justify-between align-center" @click="chang2">
                    <view>一级学科</view>
                    <view>
                        <text v-for="(item,index) in options2" :key="index" v-if="item.flag == true">{{ item.subjectName }}</text>
                        <text class="cuIcon-right"></text>
                    </view>
                </view>
                <view class="cu-item-btn">
                    <button
                            :class=" item.flag ? 'cu-btn shadow active ' : 'cu-btn shadow ' "
                            v-for="(item,index) in options2"
                            :key="index"
                            @click="chose2(index,item.subjectCode)"
                    >{{item.subjectName}}</button>
                </view>
            </view>
            <view :class=" active3 ? 'cu-item active ' : 'cu-item ' ">
                <view class="content flex justify-between align-center" @click="chang3">
                    <view>专业类型</view>
                    <view>
                        <text v-for="(item,index) in options3" :key="index" v-if="item.flag == true">{{ item.text }}</text>
                        <text class="cuIcon-right"></text>
                    </view>
                </view>
                <view class="cu-item-btn">
                    <button
                            :class=" item.flag ? 'cu-btn shadow active ' : 'cu-btn shadow ' "
                            v-for="(item,index) in options3"
                            :key="index"
                            @click="chose3(index,item.val)"
                    >{{item.text}}</button>
                </view>
            </view>
            <view :class=" active4 ? 'cu-item active ' : 'cu-item ' ">
                <view class="content flex justify-between align-center" @click="chang4">
                    <view>外语类别</view>
                    <view>
                        <text v-for="(item,index) in options4" :key="index" v-if="item.flag == true">{{ item.text }}</text>
                        <text class="cuIcon-right"></text>
                    </view>
                </view>
                <view class="cu-item-btn">
                    <button
                            :class=" item.flag ? 'cu-btn shadow active ' : 'cu-btn shadow ' "
                            v-for="(item,index) in options4"
                            :key="index"
                            @click="chose4(index,item.text)"
                    >{{item.text}}</button>
                </view>
            </view>
            <view :class=" active5 ? 'cu-item active ' : 'cu-item ' ">
                <view class="content flex justify-between align-center" @click="chang5">
                    <view>是否考数学</view>
                    <view>
                        <text v-for="(item,index) in options5" :key="index" v-if="item.flag == true">{{ item.text }}</text>
                        <text class="cuIcon-right"></text>
                    </view>
                </view>
                <view class="cu-item-btn">
                    <button
                            :class=" item.flag ? 'cu-btn shadow active ' : 'cu-btn shadow ' "
                            v-for="(item,index) in options5"
                            :key="index"
                            @click="chose5(index,item.text)"
                    >{{item.text}}</button>
                </view>
            </view>

            <view class="searchfor-condition-result">为您筛选{{total}}个满足条件的专业</view>
        </view>
        <!-- 方向 查询返回的列表 -->
        <view v-if="isChose == 3">
            <view class="directions">
                <view class="flex align-center" v-for=" ( item,index ) in direction" :key="index" @click="toDirectionDetails(item.majorCode,item.name)">{{item.name}}</view>
            </view>
        </view>
        <!-- 专业||分数 查询返回的列表 -->
        <view class="searchfor-list" v-else>
            <view class="searchfor-item" v-for=" ( item,index) in list " :key="index" @click="checkToDetails( item.composeCode )">
                <view class="searchfor-item-title flex justify-between align-center">
                    <view class="searchfor-item-title-left">{{item.majorName}}</view>
                    <view class="icon"><text class="cuIcon-attention"></text>{{item.reading}}</view>
                </view>
                <view><text>门类类别:</text>{{item.categoryCode}}-{{item.categoryName}}</view>
                <view><text>专业类别:</text><text v-if='item.type == 1'>学术学位</text><text v-else>专业学位</text></view>
                <view class="flex searchfor-item-imgs align-center">
                    <view class="cu-avatar-group">
                        <view
                                class="cu-avatar round sm"
                                v-for="(citem,cindex) in item.schools"
                                :key="cindex"
                                :style=" 'background-image:url('+ citem.avatar+');' "
                        ></view>
                    </view>
                    <view><text>{{item.schoolCount}}所高校开设此专业</text></view>
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
                isActive:1,
                isChose:'',
                options1: [
                    { text: "不限", val: "",flag:true, },
                    { text: "01 哲学", val: "01" ,flag:false,},
                    { text: "02 经济学", val: "02" ,flag:false,},
                    { text: "03 法学", val: "03",flag:false, },
                    { text: "04 教育学", val: "04" ,flag:false,},
                    { text: "05 文学", val: "05" ,flag:false,},
                    { text: "06 历史学", val: "06" ,flag:false,},
                    { text: "07 理学", val: "07",flag:false, },
                    { text: "08 工学", val: "08",flag:false, },
                    { text: "09 农学", val: "09" ,flag:false,},
                    { text: "10 医学", val: "10" ,flag:false,},
                    { text: "11 军事学", val: "11" ,flag:false,},
                    { text: "12 管理学", val: "12",flag:false, },
                    { text: "13 艺术学", val: "13",flag:false, }
                ], // 学科门类
                options2: [
                    { subjectName: "不限", val: "" ,subjectCode:'',flag:true,},
                ], // 一级学科
                options3: [
                    { text: "不限", val: "" ,flag:true,},
                    { text: "专业学位", val: "0" ,flag:false,},
                    { text: "学术学位", val: "1" ,flag:false,},
                ], // 专业类型
                options4: [
                    { text: "不限", val: 0,flag:true,},
                    { text: "英语", val: 1,flag:false, },
                    { text: "德语", val: 2,flag:false,},
                    { text: "日语", val: 3,flag:false,},
                    { text: "法语", val: 4,flag:false,},
                    { text: "俄语", val: 5,flag:false,},
                ], // 外语类别
                options5: [
                    { text: "不限", val: '',flag:true,},
                    { text: "数学一", val: 1, flag:false,},
                    { text: "数学二", val: 2,flag:false, },
                    { text: "数学三", val: 3, flag:false,},
                    { text: "不考数学", val: '不考数学',flag:false, },
                ], // 是否考数学
                active1:false, // 学科门类
                active2:false, // 一级学科
                active3:false, // 专业类型
                active4:false, // 外语类别
                active5:false, // 是否考数学
                reqData :{
                    minScore:'',// 最低分
                    maxScore:'',// 最高分
                    majorName:'',// 用户输入的专业名称
                    categoryCode:'',// 选中的学科门类
                    subjectCode:'',// 选中的一级学科
                    type:'',// 选中的专业类型
                    language:'',// 选中的外语类别
                    business1:'',// 选中的数学考试
                    pageNum: 1,
                    pageSize: 20,
                    orderByColumn: 'code',
                    isAsc: 'asc',
                },
                reqDataDirection:{
                    name:'',// 用户输入的选择方向名称
                    categoryCode:'',// 选中的学科门类
                    subjectCode:'',// 选中的一级学科
                    type:'',// 选中的专业类型
                    language:'',// 选中的外语类别
                    business1:'',// 选中的数学考试
                    pageNum: 1,
                    pageSize: 20,
                    orderByColumn: 'major_code',
                    isAsc: 'asc'
                },
                total:'',//总数
                list:[], // 分数查询和专业查询的列表
                direction:[], // 方向查询的列表
            }
        },
        onLoad(option){
            this.isChose = option.id
            console.log(this.isChose);
            this.isActive = option.id
            console.log(option);
            if(option.id == 1){
                // 按分数检索
                this.getMajors(this.reqData)
            }else if(option.id == 2){
                // 按专业检索
                this.getMajors(this.reqData)
            }else{
                this.getDirections(this.reqDataDirection)
            }
        },
        //上拉加载更多
        async onReachBottom(){
            if(this.isChose != 3){
                this.reqData.pageNum ++;
                let res = await this.$api.getMajors(this.reqData);
                if (res.code == 200 && res.rows.length > 0){
                    this.list = [...this.list,...res.rows]
                }else{
                    return
                }
            }else{
                this.reqDataDirection.pageNum ++;
                let res = await this.$api.getDirections(this.reqDataDirection);
                if (res.code == 200 && res.rows.length > 0){
                    this.direction = [...this.direction,...res.rows]
                }else{
                    return
                }
            }

        },
        onShareAppMessage: function () {},
        methods:{
            // 按分数查询页--点击搜索查询最高分最低分
            minOrMaxSearch(){
                if(!this.reqData.minScore && !this.reqData.maxScore){
                    uni.showModal({
                        title:'温馨提示',
                        content:'请输入查询所需内容',
                        showCancel:false
                    })
                    return
                }else{
                    this.reqData.pageNum = 1
                    this.getMajors(this.reqData)
                }

            },
            // 按方向查询页--点击搜索
            directionSearch(){
                if(!this.reqDataDirection.name){
                    uni.showModal({
                        title:'温馨提示',
                        content:'请输入查询所需内容',
                        showCancel:false
                    })
                    return
                }else{
                    this.reqDataDirection.pageNum = 1
                    this.getDirections(this.reqDataDirection)
                }
            },
            // 学科门类的展开
            chang1(){
                this.active1 = !this.active1
                this.active2 = false
                this.active3 = false
                this.active4 = false
                this.active5 = false
            },
            // 学科门类的选择
            async chose1(index,val){
                // 单选的话，就将所有的设置为false
                for ( let item of this.options1) {
                    item.flag = false
                }
                // 设置当前选中
                this.options1[index].flag = true

                this.active2 = false
                this.active3 = false
                this.active4 = false
                this.active5 = false
                console.log(index);
                console.log(val);

                let data = {categoryCode:val}, res = await this.$api.getySubjects(data);
                res = res.map( item=>{
                    item.flag = false
                    return item
                } );
                console.log(res);
                this.options2 = [ ...this.options2,...res ];

                if(this.isChose != 3){
                    this.reqData.pageNum = 1
                    let req2Data = this.reqData;
                    req2Data.categoryCode = val;
                    console.log(req2Data);
                    this.getMajors(req2Data)
                }else{
                    this.reqDataDirection.pageNum = 1
                    let reqDataDirection2 = this.reqDataDirection;
                    reqDataDirection2.categoryCode = val;
                    console.log(reqDataDirection2);
                    this.getDirections(reqDataDirection2)
                }

            },

            // 一级学科的展开
            chang2(){
                this.active1 = false
                this.active2 = !this.active2
                this.active3 = false
                this.active4 = false
                this.active5 = false
            },
            // 一级学科的选择
            chose2(index,subjectCode){
                // 单选的话，就将所有的设置为false
                for ( let item of this.options2) {
                    item.flag = false
                }
                // 设置当前选中
                this.options2[index].flag = true
                this.active1 = false
                this.active3 = false
                this.active4 = false
                this.active5 = false

                console.log(subjectCode);

                if(this.isChose != 3){
                    this.reqData.subjectCode = subjectCode
                    console.log(this.reqData);
                    this.reqData.pageNum = 1
                    this.getMajors(this.reqData)
                }else{
                    this.reqDataDirection.subjectCode = subjectCode
                    console.log(this.reqDataDirection);
                    this.reqDataDirection.pageNum = 1
                    this.getDirections(this.reqDataDirection)
                }
            },

            // 专业类型的展开
            chang3(){
                this.active1 = false
                this.active2 = false
                this.active3 = !this.active3
                this.active4 = false
                this.active5 = false
            },
            // 专业类型的选择
            chose3(index,val){
                // 单选的话，就将所有的设置为false
                for ( let item of this.options3) {
                    item.flag = false
                }
                // 设置当前选中
                this.options3[index].flag = true
                this.active4 = false
                this.active5 = false
                this.active1 = false
                this.active2 = false
                console.log(val);

                if(this.isChose != 3){
                    this.reqData.type = val
                    console.log(this.reqData);
                    this.reqData.pageNum = 1
                    this.getMajors(this.reqData)
                }else{
                    this.reqDataDirection.type = val
                    console.log(this.reqDataDirection);
                    this.reqDataDirection.pageNum = 1
                    this.getDirections(this.reqDataDirection)
                }
            },

            // 外语类别的展开
            chang4(){
                this.active1 = false
                this.active2 = false
                this.active3 = false
                this.active4 = !this.active4
                this.active5 = false
            },
            // 外语类别的选择
            chose4(index,text){
                console.log(index);
                console.log(text);
                // 单选的话，就将所有的设置为false
                for ( let item of this.options4) {
                    item.flag = false
                }
                // 设置当前选中
                this.options4[index].flag = true
                this.active5 = false
                this.active1 = false
                this.active2 = false
                this.active3 = false


                if(this.isChose != 3){
                    this.reqData.language = text
                    console.log(this.reqData);
                    this.reqData.pageNum = 1
                    this.getMajors(this.reqData)
                }else{
                    this.reqDataDirection.language = text
                    console.log(this.reqDataDirection);
                    this.reqDataDirection.pageNum = 1
                    this.getDirections(this.reqDataDirection)
                }
            },

            // 是否考数学的展开
            chang5(){
                this.active1 = false
                this.active2 = false
                this.active3 = false
                this.active4 = false
                this.active5 = !this.active5
            },
            // 是否考数学的选择
            chose5(index,val){
                console.log(index);
                console.log(val);
                // 单选的话，就将所有的设置为false
                for ( let item of this.options5) {
                    item.flag = false
                }
                // 设置当前选中
                this.options5[index].flag = true
                this.active1 = false
                this.active2 = false
                this.active3 = false
                this.active4 = false
                console.log(this.reqData);

                if(this.isChose != 3){
                    this.reqData.business1 = val
                    this.reqData.pageNum = 1
                    this.getMajors(this.reqData)
                }else{
                    this.reqDataDirection.business1 = val
                    this.reqDataDirection.pageNum = 1
                    this.getDirections(this.reqDataDirection)
                }
            },
            // 如果用户是按专业进来，并且输入了内容然后搜索
            searchMajorName(){
                this.reqData.majorName = this.reqData.majorName
                console.log(this.reqData.majorName);
                if(this.reqData.majorName){
                    this.getMajors(this.reqData)
                }else{
                    uni.showModal({
                        title:'温馨提示',
                        content:'请输入查询的内容',
                        showCancel:false
                    })
                }

            },
            // 如果用户是按分数查询
            async getMajors(data){
                uni.showLoading({title:'加载中……',})
                let res = await this.$api.getMajors(data);
                console.log(res);
                if(res.code == 200){
                    this.list = res.rows
                    this.total = res.total
                    uni.hideLoading()
                }else{
                    uni.hideLoading()
                }
            },
            // 如果用户是按方向查询
            async getDirections(data){
                uni.showLoading({title:'加载中……',})
                let res = await this.$api.getDirections(data);
                console.log(res);
                if(res.code == 200){
                    this.direction = res.rows
                    this.total = res.total
                    uni.hideLoading()
                }else{
                    uni.hideLoading()
                }
            },
            // 用户点击专业列表--前往专业详情页面
            checkToDetails( composeCode ){
                let minScore = this.reqData.minScore
                let maxScore = this.reqData.maxScore
                uni.navigateTo({
                    url:`/pages/index/searchfor/professional/index?composeCode=${composeCode}&minScore=${minScore}&maxScore=${maxScore}`,
                    // url: '/pages/index/searchfor/professional/index?composeCode='+composeCode
                })
            },
            // 点击方向查询出来的列表跳转进学校列表
            toDirectionDetails(majorCode,name){
                let data = {
                    majorCode,name
                }
                uni.navigateTo({
                    url: '/pages/index/searchfor/direction/index?data='+JSON.stringify(data)
                })
            },

        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .searchfor{
        .searchfor-mark{
            overflow: hidden;
            padding: 0 10upx;
            .searchfor-mark-input{
                margin-top: 20upx;
                flex-wrap: nowrap;
                align-items: center;
                font-size: 26upx;
                .flex{
                    padding-left: 10upx;
                    align-items: center;
                    text{
                        display: inline-block;
                        width: 30upx;
                        height: 2upx;
                        background-color: #000;
                        margin: 0 10upx;
                    }
                    input{
                        box-sizing: border-box;
                        padding: 0 8upx;
                        text-align: left;
                        width: 30%;
                        height: 64upx;
                        font-size: 24upx;
                        border: 1upx solid #000;
                    }
                    button{
                        margin-left: 20upx;
                    }
                }
            }
        }
        .searchfor-major{
            margin-top: 20upx;
            overflow: hidden;
            padding: 0 10upx;
            .searchfor-input{
                align-items: center;
                font-size: 26upx;
                input{
                    box-sizing: border-box;
                    padding: 0 8rpx;
                    text-align: left;
                    width: 70%;
                    height: 64rpx;
                    font-size: 24rpx;
                    border: 1rpx solid #000;
                    margin-right: 20upx;
                }
                button{
                    line-height: 1.5;
                }

            }
        }
        .searchfor-condition{
            overflow: hidden;
            margin-top: 20upx;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 0 30upx;
            .cu-item{
                border-bottom: 1upx solid #ccc;
                &.active{
                    .content{
                        .cuIcon-right{
                            transform: rotate(90deg);
                        }
                    }
                    .cu-item-btn{
                        height: auto;
                        padding-bottom: 20upx;
                    }
                }
                .content{
                    height: 80upx;
                    .cuIcon-right{
                        display: inline-block;
                        transition: all .6s;
                    }
                }
                .cu-item-btn{
                    height: 0;
                    overflow: hidden;
                    transition:height 2s;
                    button{
                        margin: 20upx 0 0 10upx;
                        &.active{
                            background-color: #4d9ee0;
                            color: #fff;
                        }
                    }
                }
            }

            .searchfor-condition-result{
                overflow: hidden;
                text-align: center;
                font-size: 26upx;
                color: #999;
                padding: 20upx 0;
            }
        }
        .searchfor-list{
            margin: 0 20upx;
            .searchfor-item{
                border-radius: 10upx;
                border: 1upx solid #eee;
                margin-bottom: 20upx;
                box-sizing:border-box;
                padding: 20upx;
                >view{
                    color: #999;
                    font-size: 26upx;
                    margin-bottom: 10upx;
                }
                .searchfor-item-title{
                    .searchfor-item-title-left{
                        color: #333;
                        font-size: 30upx;
                        font-weight: bold;
                    }
                    .icon{
                        color: #999;
                        font-size: 24upx;
                        .cuIcon-attention{
                            margin-right: 10upx;
                        }
                    }

                }
                .searchfor-item-imgs{
                    text{
                        color: #999;
                        font-size: 26upx;
                    }
                    .cu-avatar-group{
                        padding-left: 20upx;
                    }
                }
            }
        }
        .directions{
            margin: 10upx;
            >view{
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                padding: 20upx;
                border: 1upx solid #ccc;
                border-radius: 10upx;
                font-weight: bold;
                background-color: #fff;
                margin-bottom: 30upx;
            }
        }
    }
</style>
