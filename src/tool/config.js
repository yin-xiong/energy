let base_url = "" ;

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    base_url = 'https://www.qingdaohaitian.cn:8080';
}else{
    // 生产环境
    base_url = 'https://www.qingdaohaitian.cn:8080';
}

export default base_url;
