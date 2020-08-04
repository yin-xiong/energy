import http from './request';

export default {
    /* ================================================ 首页 ========================================================== */
    decrypt : (data )=> http.httpRequest('/api/user/decrypt','POST',data) ,    // 获取用户手机号码
    getOpenId : (data )=> http.httpRequest('/api/user/getOpenId','POST',data) ,    // 获取微信openId
    selectUser : (data )=> http.httpRequest('/api/user/selectUser','POST',data) ,    // 查询用户信息
    getBanners : ( )=> http.httpRequest('/api/others/getBanners','POST') ,    // 获取轮播详情
    applyCDKEY : (data )=> http.httpTokenRequest('/api/user/applyCDKEY','POST',data) ,    // 申请激活码
    openMemberByCDKEY : (data )=> http.httpTokenRequest('/api/user/openMemberByCDKEY','POST',data) ,    // 开通激活码
    /* ================================================ 首页 ========================================================== */
    /* ================================================ 搜索 ========================================================== */
    getSchoolList : (data )=> http.httpRequest('/api/school/getSchoolList','POST',data) ,    // 搜索学校列表
    add2MyWish : (data )=> http.httpTokenRequest('/api/user/add2MyWish','POST',data) ,    // 搜索学校列表---学校详情--加关注
    cancel2MyWish : (data )=> http.httpTokenRequest('/api/user/cancel2MyWish','POST',data) ,    // 搜索学校列表---学校详情--取消关注
    getSchoolDetails : (data )=> http.httpRequest('/api/school/getSchoolDetails','POST',data) ,    // 搜索学校列表---学校详情
    getCollegeList : (data )=> http.httpRequest('/api/school/getCollegeList','POST',data) ,    // 搜索学校列表---学校详情--获取学校院系设置
    getMajorsBySchCode : (data )=> http.httpRequest('/api/major/getMajorsBySchCode','POST',data) ,    // 搜索学校列表---学校详情--获取学校院系设置--院系设置下的列表
    getCategorys : (data )=> http.httpRequest('/api/major/getMajorsBySchCode2','POST',data) ,    // 搜索学校列表---学校详情--获取招生专业
    getMajorDetails : (data )=> http.httpRequest('/api/major/getSchMajorDetails','POST',data) ,    // 获取招生专业--查看该专业详情
    getMajorsScores : (data )=> http.httpRequest('/api/major/getMajorsScores','POST',data) ,    // 专业详情---历年分数
    getSchReference : (data )=> http.httpRequest('/api/major/getSchReference','POST',data) ,    // 专业详情---参考书目
    getMajorDirectionTest : (data )=> http.httpRequest('/api/major/getMajorDirectionTest','POST',data) ,    // 专业详情---初试科目
    getMajorDirections : (data )=> http.httpRequest('//api/major/getMajorDirections','POST',data) ,    // 专业详情---专业方向
    getSelfScoresBySchCode : (data )=> http.httpRequest('/api/school/getSelfScoresBySchCode','POST',data) ,    // 搜索学校列表---学校详情--获取专业历年分数

    
    getySubjects : (data )=> http.httpRequest('/api/school/getySubjects','POST',data) ,    // 分数检索---专业检索---点击了学科门类去获取一级学科
    getMajors : (data )=> http.httpRequest('/api/major/getMajors','POST',data) ,    // 分数检索---专业检索
    professionalDetails : (data )=> http.httpRequest('/api/major/getMajorDetails','POST',data) ,    // 分数检索---专业检索---查专业详情
    getSchoolRank : (data )=> http.httpRequest('/api/major/getSchoolRank','POST',data) ,    // 分数检索---专业检索---查专业详情--院校排名
    getMajorReference : (data )=> http.httpRequest('/api/major/getMajorReference','POST',data) ,    // 分数检索---专业检索---查专业详情--参考书目
    // getMajorDirections : (data )=> http.httpRequest('/api/major/getMajorDirections','POST',data) ,    // 分数检索---专业检索---查专业详情--专业方向
    
    
    getDirections : (data )=> http.httpRequest('/api/direction/getDirections','POST',data) ,    // 方向检索
    getDirectionSchools : (data )=> http.httpRequest('/api/direction/getDirectionSchools','POST',data) ,    // 方向检索---查询学校列表


    getCourses : (data )=> http.httpRequest('/api/score/getCourses','POST',data) ,    // 公共课真题列表
    getCoursesExams : (data )=> http.httpRequest('/api/score/getCoursesExams','POST',data) ,    // 公共课真题详情
    getTool : (data )=> http.httpRequest('/api/score/getTool','POST',data) ,    // 全程复习规划
    getSelfLine : (data )=> http.httpRequest('/api/score/getSelfLine','POST',data) ,    // 历年分数线--获取自划线
    getNationLine : (data )=> http.httpRequest('/api/score/getNationLine','POST',data) ,    // 历年分数线--获取国家线

    /* ================================================ 搜索 ========================================================== */
    adjustAdd : (data )=> http.httpTokenRequest('/api/dispensingApply/add','POST',data) ,    // 申请调剂保录
    addRecommendSave : (data )=> http.httpTokenRequest('/api/dispensingApply/addRecommendSave','POST',data) ,    // 研究生自荐申请

    /* ================================================ 个人中心 ========================================================== */
    myWish : ( data )=> http.httpTokenRequest('/api/user/myWish','POST',data) ,     // 我的心愿单
    getCode : ( )=> http.httpTokenRequest('/captcha/captchaImage?type=math','POST') ,     // 发送验证码
    /* ================================================ 个人中心 ========================================================== */
    createOrder : (data )=> http.httpTokenRequest('/api/pay/createOrder','POST',data) ,    // 创建订单
    queryOrder : (data )=> http.httpTokenRequest('/api/pay/queryOrder','GET',data) ,    // 查询订单

    preScreenSubmit : (data )=> http.httpTokenRequest('/api/testquestion/preScreenSubmit','POST',data) ,    // 提交前置筛选条件
    getTestQuestionList : (data )=> http.httpTokenRequest('/api/testquestion/getTestQuestionList','POST',data) ,    // 查询考试题目
    testQuestionSubmit : (data )=> http.httpQuestion('/api/testquestion/testQuestionSubmit','POST',data) ,    // 提交考试题目
};
