<template>
    <view class="library body">
        <view :class=" active == index ? 'library-list active' : 'library-list' " v-for="(item,index) in list" :key="index">
            <view class="library-content-title flex align-center justify-between" @click="checkMore(index,item.val)">
                <text>{{item.text}}</text>
                <text class="icon"><text class="cuIcon-right"></text></text>
            </view>
            <view class="library-content-ext">
                <view class="flex justify-between align-center" v-for=" (citem,cindex) in library " :key="cindex">
                    <text>{{citem.subjectCode + '  ' + citem.subjectName}}</text>
                    <button class="cu-btn" @click="goDetails(citem)">查看</button>
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
                active:-1,
                list: [
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
                library:[]
            }
        },
        onShareAppMessage: function () {},
        methods:{
            // 点击展开
            async checkMore(index,val){
                console.log(index);
                console.log(val);
                if(this.active == index){
                    this.active = -1
                }else{
                    this.active = index
                }
                let data = {categoryCode : val}, resp = await this.$api.getySubjects(data);
                console.log(resp);
                this.library = resp
            },
            // 查看当前专业详情
            // pages/index/toolbox/library/index
            goDetails(citem){
                console.log(citem);
                uni.navigateTo({
                    url:`/pages/index/toolbox/library/index?categoryCode=${citem.categoryCode}&subjectCode=${citem.subjectCode}`
                })
            },
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .library{
        padding: 10upx;
        .library-list{
            margin-top: 20upx;
            &.active{
                .library-content-title{
                    .icon{
                        transform: rotate(90deg);
                    }
                }
                .library-content-ext{
                    height: auto;
                }
            }
            .library-content-title{
                font-weight: bold;
                background-color: #1AD3CD;
                padding: 20upx;
                border-radius: 10upx;
                text{
                    font-size: 30upx;
                    color:#fff;
                }
                .icon{
                    transition: all .4s;
                    display: inline-block;
                    width: 40upx;
                    height: 40upx;
                    line-height: 40upx;
                    text-align: center;
                    text{
                        color: #fff;
                    }
                }
            }
            .library-content-ext{
                overflow: hidden;
                height: 0;
                transition: all .4s;
                .flex{
                    margin-top: 20upx;
                    border-radius: 10upx;
                    background-color: #57b6e4;
                    padding: 10upx;
                    button{
                        height: 50upx;
                        font-size: 24upx;
                    }
                }
            }
        }
    }
</style>
