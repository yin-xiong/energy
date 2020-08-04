<template>
  <view class="material body">
    <view class="material-top-img">
      <img mode="widthFile" src="../../../static/image/list/zhenti.jpg" alt />
    </view>
    <view class="material-list">
      <view class="material-list-top">
        <view class="material-title">公共课</view>
        <view class="material-cont flex align-center justify-between">
          <view
            class="flex align-center"
            v-for="( item,index ) in list"
            :key="index"
            @click="getDown(item)"
          >
            <view class="material-cont-left">
              <img v-if="index%2 == 0" src="../../../static/image/icon/folder.png" alt />
              <img v-else src="../../../static/image/icon/daan.png" alt />
            </view>
            <text class="desc">{{item.examPaperName}}</text>
            <text class="cuIcon-pulldown"></text>
          </view>
        </view>
      </view>
    </view>

    <hans-tabber :isActive="1" />
  </view>
</template>
<script>
export default {
  data() {
    return {
      reqData: {
        courseId: "" // 真题id
      },
      list: []
    };
  },
  onLoad(option) {
    console.log(option);
    this.reqData.courseId = option.id;
    this.getCoursesExams(this.reqData);
  },
  onShareAppMessage: function () {},
  methods: {
    // 获取下载的列表
    async getCoursesExams(data) {
      let res = await this.$api.getCoursesExams(data);
      if (res.code == 200) {
        console.log(res);
        this.list = res.rows;
      }
    },
    // 用户点击下载
    getDown(item) {
      if (uni.getStorageSync("isVip") == false) {
        uni.showModal({
          title: "温馨提示",
          content: "您不是会员，请购买会员继续操作",
          success: () => {
            if (res.confirm) {
              this.$tool.gobuyVip();
            }
          }
        });
      } else {
        console.log(item);
        uni.showLoading({
          title: "文档下载中"
        });
        // 文档需要先下载到本地，然后才能打开
        uni.downloadFile({
          url: item.examPaperAnswerUrl,
          success: res => {
            uni.hideLoading();
            if (res.statusCode === 200) {
              uni.openDocument({
                filePath: res.tempFilePath,
                fail: res => {
                  console.log(res);
                  uni.showToast({
                    icon: "none",
                    title: "文档打开异常"
                  });
                }
              });
            } else {
              uni.showToast({
                icon: "none",
                title: "文档下载异常"
              });
            }
          },
          fail: res => {
            uni.hideLoading();
            uni.showToast({
              icon: "none",
              title: "文档下载异常"
            });
          }
        });
      }
    }
  }
};
</script>
<style type="text/scss" lang="scss" scoped>
.material {
  min-height: 100vh;
  background-color: #f8f8f8;
  .material-top-img {
    width: 100%;
    font-size: 0;
    img {
      width: 100%;
      height: 350upx;
    }
  }
  .material-list {
    box-sizing: border-box;
    margin: 0 20px;
    .material-title {
      color: #000;
      font-size: 32upx;
      letter-spacing: 2upx;
      margin-top: 20upx;
    }
    .material-cont {
      flex-wrap: wrap;
      view {
        margin-top: 20upx;
        width: 48%;
        height: 100upx;
        box-sizing: border-box;
        background-color: #fff;
        color: #8b93a6;
        .material-cont-left {
          width: 60upx;
          height: 60upx;
          margin: 0 10upx;
          img {
            width: 60upx;
            height: 60upx;
          }
        }

        text.desc {
          width: 50%;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 10upx;
        }
      }
    }
  }
}
</style>