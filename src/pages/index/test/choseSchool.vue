<template>
    <view class="page">
        <view class="pageTitle">请选择正确的选项</view>
        <view class="pageContent">
            <block v-if="flag1">
                <view>{{radioTitle}}</view>
                <view>
                    <radio-group class="uni-list" @change="radioChange1">
                        <view v-for="(item,index) in radioItems" :key="index">
                            <label>
                                <view>
                                    <radio :disabled="item.disabled" class="blue" :id="item.name" :value="item.name" :checked="item.checked"></radio>
                                    <text class="radio-text">{{item.value}}</text>
                                </view>
                            </label>
                        </view>
                    </radio-group>
                </view>
            </block>
            <block v-if="flag2">
                <view>2：本科专业（一级学科）：</view>
                <view>
                    <radio-group class="uni-list" @change="radioChange2">
                        <view v-for="(item,index) in radioItems2" :key="index">
                            <label>
                                <view>
                                    <radio :disabled="item.disabled" class="blue" :id="item.subjectCode" :value="item.subjectCode" :checked="item.checked"></radio>
                                    <text class="radio-text">{{item.subjectName}}</text>
                                </view>
                            </label>
                        </view>
                    </radio-group>
                </view>
            </block>
            <block v-if="flag3">
                <view>3：是否跨考：</view>
                <view>
                    <radio-group class="uni-list" @change="radioChange3">
                        <view v-for="(item,index) in radioItems3" :key="index">
                            <label>
                                <view>
                                    <radio :disabled="item.disabled" class="blue" :id="item.name" :value="item.name" :checked="item.checked"></radio>
                                    <text class="radio-text">{{item.value}}</text>
                                </view>
                            </label>
                        </view>
                    </radio-group>
                </view>
            </block>
            <block v-if="flag4">
                <view>4：是否想考数学：</view>
                <view>
                    <radio-group class="uni-list" @change="radioChange4">
                        <view v-for="(item,index) in radioItems4" :key="index">
                            <label>
                                <view>
                                    <radio :disabled="item.disabled" class="blue" :id="item.name" :value="item.name" :checked="item.checked"></radio>
                                    <text class="radio-text">{{item.value}}</text>
                                </view>
                            </label>
                        </view>
                    </radio-group>
                </view>
            </block>
            <block v-if="flag5">
                <view>5：你绝不考虑从事的行业：</view>
                <view>
                    <checkbox-group class="uni-list" @change="radioChange5">
                        <view v-for="(item,index) in radioItems5" :key="index">
                            <label>
                                <view>
                                    <radio :disabled="item.disabled" class="blue" :id="item.name" :value="item.name" :checked="item.checked"></radio>
                                    <text class="radio-text">{{item.value}}</text>
                                </view>
                            </label>
                        </view>
                    </checkbox-group>
                </view>
            </block>
            <block v-if="rowFlag">
                <view v-for="item in list" :key="item.id" class="margin-top">

                    <block>
                        <!--   如果是完形填空这样的题  -->
                        <view v-if="item.groupContent">{{item.groupCode}}：<rich-text :nodes="item.groupContent" /></view>
                        <view v-if="item.groupContent" class="flex align-start margin-top"
                              v-for="(aitem,index) in item.testQuestionList" :key="aitem.id">
                            <view class="aitemCode">{{aitem.code}}</view>
                            <radio-group v-if="aitem.questionType != 1" class="uni-list" @change="radioTopic">
                                <view v-for="(citem,index) in aitem.testOptionList" :key="index">
                                    <label>
                                        <view class="flex align-center">
                                            <radio :disabled="citem.disabled" class="blue" :id="citem.optionCode"
                                                   :value="[aitem.code,citem.optionCode]" :checked="citem.checked"></radio>

                                            <text class="radio-text flex">
                                                <text style="margin-right: 30upx;">{{citem.optionCode}}</text>
                                                <text>{{citem.optionValue}}</text>
                                            </text>

                                        </view>
                                    </label>
                                </view>
                            </radio-group>

                            <checkbox-group v-else class="uni-list" @change="checkTopic">
                                <view v-for="(citem,index) in aitem.testOptionList" :key="index">
                                    <label>
                                        <view class="flex align-center">
                                            <radio :disabled="citem.disabled" class="blue" :id="citem.optionCode"
                                                   :value="[aitem.code,citem.optionCode]" :checked="citem.checked"></radio>
                                            <text class="radio-text flex">
                                                <text style="margin-right: 30upx;">{{citem.optionCode}}</text>
                                                <text>{{citem.optionValue}}</text>
                                            </text>
                                        </view>
                                    </label>
                                </view>
                            </checkbox-group>
                        </view>
                        <!--   如果不是完形填空这样的题  -->
                        <view v-if="!item.groupContent" class=" margin-top"
                              v-for="(aitem,index) in item.testQuestionList" :key="aitem.id">
                            <view class="aitemCode flex align-start" style="width: 100%;">
                                {{aitem.code}}
                                <img v-if="aitem.imageUrl" :src="aitem.imageUrl" mode="widthFix" style="width: 95%;" />
                                <text v-else>{{aitem.title}}</text>
                            </view>
                            <radio-group v-if="aitem.questionType != 1" class="uni-list" @change="radioTopic">
                                <view v-for="(citem,index) in aitem.testOptionList" :key="index">
                                    <label>
                                        <view class="flex align-center">
                                            <radio :disabled="citem.disabled" class="blue" :id="citem.optionCode"
                                                   :value="[aitem.code,citem.optionCode]" :checked="citem.checked"></radio>
                                            <view class="radio-text flex align-center" style="width: 90%;">
                                                <text style="margin-right: 30upx;">{{citem.optionCode}}</text>
                                                <img v-if="citem.optionUrl" mode="widthFix" :src="citem.optionUrl" style="width: 90%;height: 80upx;" />
                                                <text v-else>{{citem.optionValue}}</text>
                                            </view>
                                        </view>
                                    </label>
                                </view>
                            </radio-group>
                        </view>
                    </block>
                </view>
            </block>
            <view v-if="btnFlag" class="next"><button class="cu-btn" @click="nextBtn">下一页</button></view>
            <view v-if="subBtn" class="next"><button class="cu-btn" @click="subVal">提交</button></view>
        </view>
    </view>
</template>

<script>
    export default {
        data(){
            return{
                checkeding:{
                    data1:'',
                    data2:'',
                    data3:'',
                    data4:'',
                    data5:'',
                },
                flag1:true,// 本科专业（学科门类）
                flag2:false,// 本科专业（一级学科）：
                flag3:false,// 是否跨考：
                flag4:false,// 是否想考数学
                flag5:false,// 你绝不考虑从事的行业
                btnFlag:false,// 显示下一页按钮
                subBtn:false,// 如果下一页没有了题目，就设置true
                rowFlag:false,// 显示所有题型
                radioTitle:'1:本科专业（学科门类）',
                radioItems: [
                    { name: '01', value: '01 哲学',disabled:false, },
                    { name: '02', value: '02 经济学',disabled:false, },
                    { name: '03', value: '03 法学',disabled:false, },
                    { name: '04', value: '04 教育学',disabled:false, },
                    { name: '05', value: '05 文学',disabled:false, },
                    { name: '06', value: '06 历史学',disabled:false, },
                    { name: '07', value: '07 理学',disabled:false, },
                    { name: '08', value: '08 工学',disabled:false, },
                    { name: '09', value: '09 农学',disabled:false, },
                    { name: '10', value: '10 医学',disabled:false, },
                    { name: '11', value: '11 军事学',disabled:false, },
                    { name: '12', value: '12 管理学',disabled:false, },
                    { name: '13', value: '13 艺术学',disabled:false, },
                ],
                radioItems2:[],
                radioItems3:[
                    { name: '1', value: '是',disabled:false, },
                    { name: '2', value: '否',disabled:false, },
                ],
                radioItems4:[
                    { name: '1', value: '可以考虑',disabled:false, },
                    { name: '2', value: '不考虑',disabled:false, },
                ],
                radioItems5:[
                    { name: '1', value: '警务类',disabled:false, },
                    { name: '2', value: '教育类',disabled:false, },
                    { name: '3', value: '科研类',disabled:false, },
                    { name: '4', value: '勘探类',disabled:false, },
                    { name: '5', value: '矿业类',disabled:false, },
                    { name: '6', value: '化工类',disabled:false, },
                    { name: '7', value: '土木类',disabled:false, },
                    { name: '8', value: '农业类',disabled:false, },
                    { name: '9', value: '医疗类',disabled:false, },
                ],

                submitType:'',// 择校测试--1，能力测试--2，专业测试--3，智能推荐--4，
                testType:'',
                list:[] , //所有的题型选择
                num:1,//第几页
                total:'',//总页数,
                fiveReq:null,// 用户选中后的5个选择
                reqAnswer:{}, // 用户填写的答案
            }
        },
        async onLoad(option){
            console.log(option);
            if(option.status == 2){
                this.flag1 = false
                this.rowFlag = true
                this.testType = '2,3'
                let res = await this.getTixing(this.num)
                if(res.rows.length > 0 ){
                    this.list = res.rows
                    this.total = res.total
                    this.btnFlag = true

                }else{
                    this.subBtn = true
                    return
                }
            }else if(option.status == 3){
                this.flag1 = false
                this.rowFlag = true
                this.testType = '1'
                let res = await this.getTixing(this.num)
                if(res.rows.length > 0 ){
                    this.list = res.rows
                    this.total = res.total
                    this.btnFlag = true
                }else{
                    this.subBtn = true
                    return
                }
            }else{
                this.submitType = option.status
            }
        },
        onShareAppMessage: function () {},
        methods:{
            // 1:本科专业（学科门类）
            async radioChange1 (e) {
                this.checkeding.data1 =  e.target.value
                for ( let i in this.radioItems ){this.radioItems[i].disabled = true}
                let data = {categoryCode:e.target.value}, res = await this.$api.getySubjects(data);
                res = res.map( item=>{
                    item.flag = false
                    return item
                } );
                console.log(res);
                this.radioItems2 = res
                this.flag1 = false
                this.flag2 = true
            },
            // 本科专业（一级学科）：
            async radioChange2 (e) {
                console.log(e);
                this.checkeding.data2 =  e.target.value
                for ( let i in this.radioItems2 ){
                    this.radioItems2[i].disabled = true
                }
                console.log(this.checkeding);
                this.flag2 = false
                this.flag3 = true
            },
            // 是否跨考：
            async radioChange3 (e) {
                this.checkeding.data3 =  e.target.value
                for ( let i in this.radioItems3 ){this.radioItems3[i].disabled = true}
                this.flag3 = false
                this.flag4 = true
            },
            // 是否想考数学：
            async radioChange4 (e) {
                this.checkeding.data4 =  e.target.value
                for ( let i in this.radioItems4 ){this.radioItems4[i].disabled = true}
                this.flag4 = false
                this.flag5 = true
                console.log(this.checkeding);
            },
            // 你绝不考虑从事的行业：
            async radioChange5 (e) {
                this.checkeding.data5 =  e.target.value
                // for ( let i in this.radioItems5 ){this.radioItems5[i].disabled = true}
                this.btnFlag = true
                console.log(this.checkeding);
                this.fiveReq = {
                    categoryCode : this.checkeding.data1,
                    subjectCode : this.checkeding.data2,
                    isCrossMajor : this.checkeding.data3,
                    isExamMath : this.checkeding.data4,
                    rejectedIndustry : this.checkeding.data5.join(),
                }
            },
            // 下一页
            async nextBtn(){
                this.flag5 = false; // 隐藏当前选择
                this.rowFlag = true; // 显示所有的题型
                // 用户的喜好选择
                console.log(this.fiveReq);
                // 如果用户从智能推荐进来的话，需要做前置筛选
                if(this.testType == 4){
                    let codeRes = await this.$api.preScreenSubmit(this.fiveReq)
                    if(codeRes.code == 200){
                        this.testType = codeRes.result.testType
                        let num = this.num++;
                        let res = await this.getTixing(num)
                        if(res.rows.length > 0 ){
                            this.list = res.rows
                            this.total = res.total
                        }else{
                            this.btnFlag = false
                            this.subBtn = true
                            return
                        }
                    }
                // 如果不是智能推荐，就不需要做前置筛选
                }else{
                    let num = this.num++;
                    let res = await this.getTixing(num)
                    if(res.rows.length > 0 ){
                        this.list = res.rows
                        this.total = res.total
                    }else{
                        this.btnFlag = false
                        this.subBtn = true
                        return
                    }
                }


            },
            // 获取题型
            async getTixing(num){
                let data = {
                    testType: this.testType,//1专业测试 2英语测试 3数学测试
                    pageNum: num,//第几页
                    pageSize: 1,//每页数量
                },res = await this.$api.getTestQuestionList(data)
                return res
            },
            // 用户选择题（单选）
            radioTopic(e){
                let datails = e.detail.value
                this.reqAnswer[datails.split(',')[0]] = datails.split(',')[1]
            },
            // 用户选择题（多选）
            checkTopic(e){
                let datails = e.detail.value

                let no = ''
                let answer = ''
                for( let i in datails ){
                    no = datails[0].split(',')[0]
                    answer += datails[i].split(',')[1] + ','
                }
                console.log(no);
                console.log(answer);
                this.reqAnswer[no] = answer
            },
            // 提交
            async subVal(){
                uni.showLoading({title:'提交中'})
                console.log(this.reqAnswer); //用户的选中
                let newList = [];
                for( let i in this.reqAnswer ){
                    let data = {'questionId' : i, 'answer' : this.reqAnswer[i]}
                    newList = [ ...newList,data ]
                }
                // 只有智能推荐才请求这条接口
                let data = {answerData:newList,testType : this.testType,submitType : this.submitType,},
                    res = await this.$api.testQuestionSubmit(data);

                if( res.code == 200 && res.rows.length > 0 ){
                    uni.hideLoading()
                    uni.navigateTo({
                        url:'/pages/index/test/details?data='+JSON.stringify(data)
                    })
                }else{
                    uni.hideLoading()
                    uni.showModal({
                        title:'温馨提示:',
                        content:res.msg,
                        showCancel:false,
                        success:res=>{
                            uni.switchTab({
                                url : '/pages/index/index'
                            })
                        }
                    })
                }



            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .page{
        .pageTitle{
            text-align: center;
            font-size: 32upx;
            margin: 20upx 0;
        }
        .pageContent{
            box-sizing: border-box;
            padding: 0 30upx;
        }
        .uni-list{
            width: 100%;
            overflow: hidden;
            >view{
                margin-top: 20upx;
            }
        }

        .uni-list .radio-text{
            margin-left: 20upx;
        }
        .aitemCode{
            width: 60upx;
            text-align: left;
            padding-top: 30upx;
        }
        .next{
            text-align: center;
            margin: 30upx 0;
        }
    }
</style>