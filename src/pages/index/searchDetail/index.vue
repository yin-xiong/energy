<template>
  <view class="searchDetail body">

    <schoolHeader :result="result"></schoolHeader>

    <view class="searchDetail-menuInfo">
      <scroll-view
        class="searchDetail-menu"
        :class="tabClass"
        :style="tabStyle"
        scroll-with-animation
        scroll-x
        :scroll-left="scrollLeft"
      >
        <view class="flex align-center justify-between">
          <view
            v-for="(item,index) in list"
            :class=" item.id == isActive ? 'active': ' ' "
            :key="item.id"
            @click="tabSelectList(item.id)"
          >
            <img :src="item.src" />
            <text>{{item.title}}</text>
          </view>
          <view @click="toReference">
            <img src="../../../static/image/icon/chose/book.png" />
            <text>参考资料</text>
          </view>
        </view>
      </scroll-view>
      <!--  院校简介  -->
      <view v-if="isActive == 0" class="school-info-ext">
        <template v-if="result.introduction">
          <view>
            <view>院校简介</view>
            <view v-html="result.introduction"></view>
          </view>
          <view>
            <view @click="goWebsite(result.website)">学校官网:{{result.website || ''}}</view>
            <view @click="goWebsite(result.yzChsi)">招生简章:{{result.yzChsi || ''}}</view>
          </view>
        </template>
        <template v-else>
          <nodata></nodata>
        </template>
      </view>
      <!--  院系设置  -->
      <view v-if="isActive == 1" class="settings">
        <template v-if="settings.length > 0">
          <view
            v-for="(item,index) in settings"
            :class=" item.flag ? 'item-setting' : 'item-setting active' "
            :key="index"
          >
            <view
              @click="showItemSetting(index,item.composeCode,item.schCode)"
              class="flex align-center justify-between"
            >
              <text>{{item.collegeName}}</text>
              <text class="icon">
                <text class="cuIcon-right"></text>
              </text>
            </view>
            <view class="item-setting-info">
              <view
                class="flex align-center justify-between"
                v-for="(citem,cindex) in settingsItems"
                :key="cindex"
                @click="toMajor(citem.composeCode,citem.code)"
              >
                <text>{{citem.code + ' ' + citem.majorName}}</text>
                <text class="cuIcon-right"></text>
              </view>
            </view>
          </view>
        </template>
        <nodata v-else />
      </view>
      <!--  招生专业  -->
      <view v-if="isActive == 2" class="settings">
        <template v-if="majors.length > 0">
          <view
            v-for="(item,index) in majors"
            :class=" item.flag ? 'item-setting' : 'item-setting active' "
            :key="index"
          >
            <view class="flex align-center justify-between" @click="showMajors(index)">
              <text>{{item.categoryName}}</text>
              <text class="icon">
                <text class="cuIcon-right"></text>
              </text>
            </view>
            <view class="item-setting-info">
              <view
                class="flex align-center justify-between"
                v-for="(citem,cindex) in item.majors"
                :key="cindex"
                @click="toMajor(citem.composeCode,citem.code)"
              >
                <text>{{citem.code + ' ' +citem.majorName}}</text>
                <text class="cuIcon-right"></text>
              </view>
            </view>
          </view>
        </template>
        <nodata v-else />
      </view>
      <!--  历年分数  -->
      <view v-if="isActive == 3">
        <view class="item-setting">
          <!--                        <view class="flex align-center justify-between">-->
          <!--                            <text>国家线</text>-->
          <!--                            <text class="icon"><text class="cuIcon-right"></text></text>-->
          <!--                        </view>-->
          <template v-if="marks.length > 0">
            <view class="fractional-line cu-list grid col-4 no-border">
              <view
                class="cu-item"
                v-for=" ( item,index) in marks"
                :key="index"
                @click="toMarks(item.scoreLineImage)"
              >
                <view>
                  <button class="cu-btn bg-gray">{{item.year}}</button>
                </view>
              </view>
            </view>
          </template>
          <nodata v-else />
        </view>
      </view>
    </view>

    <hans-tabber :isActive="1" />
  </view>
</template>
<script>
  import schoolHeader from '../../components/schoolHeader'

export default {
  data() {
    return {
      code: "", // 前面学校列表传过来的code

      result: null, // 基本信息
      list: [
        {
          src: "../../../static/image/icon/chose/zhuanye.png",
          title: "院校简介",
          id: 0
        },
        {
          src: "../../../static/image/icon/chose/yuanxiao.png",
          title: "院系设置",
          id: 1
        },
        {
          src: "../../../static/image/icon/chose/jiuye.png",
          title: "招生专业",
          id: 2
        },
        {
          src: "../../../static/image/icon/chose/paiming.png",
          title: "历年分数",
          id: 3
        }
      ],
      isActive: 0,
      settings: [],
      settingsItems: [],
      majors: [],
      marks: [],

    };
  },
  components:{
    schoolHeader,
  },
  onShareAppMessage: function () {},
  computed: {
    scrollLeft() {
      return (this.tabCur - 1) * 60;
    }
  },
  onLoad(option) {
    this.code = option.code;
    this.getDetails(this.code);
    setTimeout(() => {
      this.getCollegeList(this.code);
      this.getCategorys(this.code);
      this.getSchCode(this.code);
    }, 2000);
  },
  methods: {
    // 获取学校详情
    async getDetails(code) {
      let data = { code },
        res = await this.$api.getSchoolDetails(data);
      if (res.code == 200) {
        this.result = res.result;
      } else {
        uni.showModal({
          title: "温馨提示",
          content: "获取资料失败，请查看其他学校",
          showCancel: false,
          success: res => {
            uni.navigateTo();
          }
        });
      }
    },


    // 招生专业---》点击查看前往专业详情   院系设置--点击查看前往专业详情
    toMajor(composeCode, majorCode) {
      console.log(composeCode);
      let data = {
        composeCode,
        schCode: this.code,
        majorCode
      };
      uni.navigateTo({
        url: "/pages/index/searchDetail/details?data=" + JSON.stringify(data)
      });
    },
    // 菜单的相互切换
    tabSelectList(id) {
      console.log(id);
      this.isActive = id;
      if (id == 1) {
        this.getCollegeList(this.code);
      } else if (id == 2) {
        this.getCategorys(this.code);
      } else if (id == 3) {
        this.getSchCode(this.code);
      }
    },
    // 获取院系设置的列表
    async getCollegeList(code) {
      let data = { code },
        res = await this.$api.getCollegeList(data);
      console.log(res);
      if (res.code == 200) {
        res.rows = res.rows.map(item => {
          item.flag = true;
          return item;
        });
        this.settings = res.rows;
      }
      console.log(this.settings);
    },
    // 院系设置的显示隐藏
    async showItemSetting(index, composeCode, schCode) {
      for (let i of this.settings) {
        i.flag = true;
      }
      if (this.settings[index].flag) {
        this.settings[index].flag = false;
        // 获取每个学院下的列表，点击前往详情
        let data = {
            schCode: schCode,
            collegeCode: composeCode
          },
          res = await this.$api.getMajorsBySchCode(data);
        if (res.code == 200) {
          this.settingsItems = res.rows;
        } else {
          return;
        }
      } else {
        this.settings[index].flag = true;
        this.settingsItems = [];
      }
    },
    // 招生专业的显示隐藏
    showMajors(index) {
      for (let i of this.majors) {
        i.flag = true;
      }
      if (this.majors[index].flag) {
        this.majors[index].flag = false;
      } else {
        this.majors[index].flag = true;
      }
    },
    // 获取招生专业的列表
    async getCategorys(code) {
      let data = { schCode: code },
        res = await this.$api.getCategorys(data);
      console.log(res);
      if (res.code == 200) {
        res.rows = res.result.map(item => {
          item.flag = true;
          return item;
        });
        this.majors = res.result;
      }
      console.log(this.majors);
    },
    // 查看历年分数
    async getSchCode(code) {
      let data = { code },
        res = await this.$api.getSelfScoresBySchCode(data);
      if (res) this.marks = res;
      console.log(this.marks);
    },
    // 查看历年分数详情
    toMarks(url) {
      uni.navigateTo({
        url: `/pages/components/webview/webview?url=${url}`
      });
    },
    // 前往参考资料
    toReference() {
      uni.navigateTo({
        url: "/pages/index/reference/index?code=" + this.code
      });
    },
    // 前往官网,招生简章
    goWebsite(url) {
      uni.navigateTo({
        url: `/pages/components/webview/webview?url=${url}`
      });
    }
  }
};
</script>
<style type="text/scss" lang="scss" scoped>
page {
  width: 100%;
  background-color: #f8f8f8;
}
.searchDetail {
  overflow: hidden;

  .searchDetail-menuInfo {
    .searchDetail-menu {
      border: 1px solid #ccc;
      border-left: 0;
      border-right: 0;
      margin: 20upx 0;
      padding: 20upx 10upx;
      view {
        view {
          background-color: #f9f9f9;
          font-size: 20upx;
          text-align: center;
          border-radius: 10upx;
          padding: 10upx;
          &.active {
            background-color: #1ad3cd;
            color: #fff;
          }
          img {
            display: block;
            margin: 0 auto;
            width: 60upx;
            height: 60upx;
          }
        }
      }
    }
    .school-info-ext {
      > view {
        box-sizing: border-box;
        padding: 10upx 14upx;
        margin: 10upx;
      }
    }
    .settings {
      margin: 0 10upx;
      .item-setting {
        border: 1upx solid #ccc;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 10upx;
        margin-top: 20upx;
        &.active {
          .flex {
            .icon {
              transform: rotate(90deg);
            }
          }
          .item-setting-info,
          .enrollment-major-check {
            height: auto;
          }
        }
        .flex {
          padding: 20upx;
          .icon {
            color: #000;
            transition: all 0.4s;
          }
        }
        .item-setting-info {
          height: 0;
          overflow: hidden;
          transition: height 1s;
          box-sizing: border-box;
          margin: 0 20upx;
          .flex {
            border-bottom: 1upx solid #ccc;
            &:last-child {
              border-bottom: 0;
            }
          }
        }
      }
    }
    .fractional-line {
      background-color: transparent !important;
      padding-bottom: 0;
      .cu-item {
        padding: 0;
        margin: 0 0 20upx 0;
        view {
          width: 80%;
          margin: 0 auto;
        }
      }
    }
  }
  .cu-modal .cu-dialog {
    height: 70vh;
    overflow-y: scroll;
  }
  .wishContent {
    padding: 30upx;
    .wishContent-title {
      text-align: justify;
      font-size: 24upx;
    }
    .wishContent-form {
      form {
        text-align: start;
        input,
        button,
        label {
          font-size: 24upx;
        }
        .cu-form-group {
          height: 80upx;
          min-height: 80upx;
        }
        .title {
          font-size: 24upx;
          white-space: nowrap;
          width: 30%;
        }
        .subBtn {
          width: 40%;
          margin: 0 auto;
          text-align: center;
          button {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
