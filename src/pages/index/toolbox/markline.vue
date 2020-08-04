<template>
    <view class="searchDetail body">
        <view class="searchDetail-top-img" mode="widthFix"><img src="../../../static/image/list/line.png" alt=""></view>
        <view class="searchDetail-content">
            <view class="searchDetail-content-head flex align-center justify-between">
                <view
                        :class=" isMenu == index ? 'active' :'' "
                        v-for=" (item,index) in navs "
                        :key="index" @click="showMore(item,index)"
                >{{item.title}}</view>
            </view>
            <view class="searchDetail-content-desc">
                <view v-if="isMenu == 0" class="searchDetail-content-desc-one">
                    <view v-for=" (item,index) in list1 " :key="index" >
                        <view class="searchDetail-content-desc-one-title">{{item.universityId + '  ' + item.universityName}}</view>
                        <view class="searchDetail-content-desc-one-ext flex align-center justify-between">
                            <text v-for=" (citem,cindex) in item.scoreList " :key="cindex" @click="toWebview(citem)">{{citem.year}}</text>
                        </view>
                    </view>
                </view>
                <view v-else-if="isMenu == 1" class="nationLine flex align-center justify-between">
                    <view v-for=" (item,index) in list2 " :key="index" @click="toLine(item)">{{item.majorId + ' ' + item.majorName}}</view>
                </view>
                <view v-else class="nationLine flex align-center justify-between">
                    <view v-for=" (item,index) in list2 " :key="index" @click="toLine(item)">{{item.majorId + ' ' + item.majorName}}</view>
                </view>
            </view>
        </view>
        <view :class=" flag ? 'cu-modal show' : 'cu-modal' ">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">{{model.majorName}}</view>
                    <view class="action" @click="choseFlag">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class="padding-xl fenshu-header">
                    <view class="flex align-center justify-end">
                        <view
                              :class=" fenshuActive == item.index ? 'active' : '' "
                              v-for=" item in fenshu " :key="item.index"
                              @click="fenshuClick(item.index)"
                        >{{item.title}}</view>
                    </view>
                    <view v-if="fenshuActive == 0">
                        <block v-for="(item, index) in arr" :key="index">
                            <view class="qiun-columns" style="background-color: #FFFFFF;">
                                <echarts :canvas-id="item.id" :chartType="item.chartType" :cWidth="cWidth" :cHeight="cHeight" :opts="item.opts" :ref="item.id"/>
                            </view>
                        </block>
                    </view>

                    <view v-if="fenshuActive == 1">
                    <block v-for="(item, index) in arr1" :key="index">
                        <view class="qiun-columns" style="background-color: #FFFFFF;">
                            <echarts :canvas-id="item.id" :chartType="item.chartType" :cWidth="cWidth" :cHeight="cHeight" :opts="item.opts" :ref="item.id"/>
                        </view>
                    </block>
                    </view>

                    <view v-if="fenshuActive == 2">
                    <block v-for="(item, index) in arr2" :key="index">
                        <view class="qiun-columns" style="background-color: #FFFFFF;">
                            <echarts :canvas-id="item.id" :chartType="item.chartType" :cWidth="cWidth" :cHeight="cHeight" :opts="item.opts" :ref="item.id"/>
                        </view>
                    </block>
                    </view>
                    <view style="background-color: #fff;">点击折线显示具体分数</view>
                </view>
                <view class="cu-bar bg-white justify-end">
                    <view class="action">
                        <button class="cu-btn line-green text-green" @click="choseFlag">确定</button>
                    </view>
                </view>
            </view>
        </view>
        <hans-tabber :isActive="1" />
    </view>
</template>
<script>
    import echarts from "../../components/echarts";
    export default {
        data(){
            return{
                isMenu:0,
                flag:false,
                navs:[
                    { index:0,title:'自划线',id:0, },
                    { index:1,title:'学术学位国家线',id:1, },
                    { index:2,title:'专业学位国家线',id:2 },
                ],
                list1:[],
                list2:[],
                model:null,

                cWidth:'',
                cHeight:'',

                arr: [],
                chartData : {
                    categories: [],
                    series: [
                        {name: 'A类考生', data: []},
                        {name: 'B类考生', data: []},
                    ],
                },

                arr1: [],
                chartData1 : {
                    categories: [],
                    series: [
                        {name: 'A类考生', data: []},
                        {name: 'B类考生', data: []},
                    ],
                },

                arr2: [],
                chartData2 : {
                    categories: [],
                    series: [
                        {name: 'A类考生', data: []},
                        {name: 'B类考生', data: []},
                    ],
                },

                fenshuActive:0,
                fenshu:[
                    { index:0,title:'总分' },
                    { index:1,title:'单科=100' },
                    { index:2,title:'单科>100' },
                ]
            }
        },
        components:{echarts},
        onShareAppMessage: function () {},
        onShow(){
            this.getSelfLine()
            this.cWidth=uni.upx2px(600);
            this.cHeight=uni.upx2px(400);
        },
        methods:{
            // 切换
            showMore(item,index){
                this.isMenu = index
                console.log(item);
                if(this.isMenu == 0){
                    this.getSelfLine()
                }else if(this.isMenu == 1){
                    this.getNationLine(item.id)
                }else{
                    this.getNationLine(item.id)
                }
            },
            // 获取自划线
            async getSelfLine(){
                let res = await this.$api.getSelfLine()
                console.log(res);
                if(res.code == 200){
                    this.list1 = res.rows
                }
            },
            // 查看自划线
            toWebview(citem){
                console.log(citem);
                uni.navigateTo({
                    url:`/pages/index/toolbox/markline/marklineImg?url=${citem.scoreLineImage}`
                })
            },
            // 获取国家线
            async getNationLine(id){
                console.log(id);
                let data = {type : id}, res = await this.$api.getNationLine(data)
                if(res.code == 200){
                    console.log(res);
                    this.list2 = res.rows
                }
            },

            // 查看国家线 打开模态框
            toLine(item){
                this.flag = true
                // 点开模态框，设置默认显示总分
                this.fenshuActive = 0;
                this.model = item
                console.log(item);
                for( let i of item.scoreList ){
                    this.chartData.categories.push(i.year)
                    this.chartData1.categories.push(i.year)
                    this.chartData2.categories.push(i.year)

                    this.chartData.series[0].data.push(i.atotalScore);
                    this.chartData.series[1].data.push(i.btotalScore);

                    this.chartData1.series[0].data.push(i.ascoreEqHundred);
                    this.chartData1.series[1].data.push(i.bscoreEqHundred);

                    this.chartData2.series[0].data.push(i.ascoreGtHundred);
                    this.chartData2.series[1].data.push(i.bscoreEqHundred);
                }
                let serverData = [
                    {
                        opts: this.chartData, chartType: "line", id: "abc",
                    },
                ];
                let serverData1 = [{opts: this.chartData1, chartType: "line", id: "def",},];
                let serverData2 = [{opts: this.chartData2, chartType: "line", id: "gih"},];
                this.arr = serverData;
                this.arr1 = serverData1;
                this.arr2 = serverData2;
            },
            // 模态框里面的总分，单科=100，单科>100的切换
            fenshuClick( index ){
                this.fenshuActive = index
            },
            // 关闭国家线的模态框
            choseFlag(){
                this.flag = false
                setTimeout( ()=>{
                    this.arr  = this.arr1 =this.arr2 = []
                    this.chartData = this.chartData1 = this.chartData2 = {
                        categories: [],
                        series: [
                            {name: 'A类考生', data: []},
                            {name: 'B类考生', data: []},
                        ],
                    }
                },500 )

            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .searchDetail{
        overflow: hidden;
        .searchDetail-top-img{
            width: 100%;
            background-color: #1e00f9;
            img{
                width: 100%;
            }
        }
        .searchDetail-content{
            .searchDetail-content-head{
                height: 80upx;
                background-color: #54b6e8;
                text-align: center;
                view{
                    width: 33.33%;
                    height: 100%;
                    line-height: 80upx;
                    color: #fff;
                    font-size: 26upx;
                    &.active{
                        background-color: #5f96e8;
                    }
                }
            }
            .searchDetail-content-desc{
                margin: 20upx;
                .searchDetail-content-desc-one{
                    border-radius: 10upx;
                    border: 1upx solid #ccc;
                    background-color: #dff1f1;
                    overflow: hidden;
                    .searchDetail-content-desc-one-title{
                        height: 80upx;
                        line-height: 80upx;
                        padding: 0 20upx;
                        box-sizing: border-box;
                    }
                    .searchDetail-content-desc-one-ext{
                        text{
                            width: 25%;
                            text-align: center;
                            background-color: #fff;
                            color: #1e00f9;
                            line-height: 80upx;
                            border-right: 1upx solid #ccc;
                        }
                    }
                }
                .nationLine{
                    flex-wrap: wrap;
                    view{
                        border-radius: 10upx;
                        text-align: center;
                        margin-bottom: 20upx;
                        background-color: #dff1f1;
                        width: 46%;
                        height: 80upx;
                        line-height: 80upx;
                        overflow: hidden;
                        box-sizing: border-box;
                        padding:0 10upx;
                        font-size: 26upx;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
        .fenshu-header{
            .flex{
                height: 60upx;
                margin-bottom: 20upx;
                view{
                    width: 140upx;
                    text-align: center;
                    height: 60upx;
                    line-height: 60upx;
                    border: 1upx solid #ccc;
                    color: #8b93a6;
                    border-left: 0;
                    font-size: 24upx;
                    &.active{
                        background: #345cee;
                        color: #fff;
                    }
                    &:first-child{
                        border-left: 1upx solid #ccc;
                    }
                }
            }
        }
    }
</style>
