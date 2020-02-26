<template>
    <div class="inform">
        <div class="inform-list">
            <!-- <img src="~assets/img/profile/news.png" alt=""> -->
            <img src="~assets/img/profile/news.png" alt="">
            <span class="inform-list-item">我的消息</span>
        </div>
        <div class="inform-list">
            <img src="~assets/img/profile/cartshop.png" alt="">
            <span class="inform-list-item">我的订单</span>
        </div>
        <div class="inform-list">
            <img src="~assets/img/profile/member.png" alt="">
            <span class="inform-list-item">会员卡</span>
        </div>
        <div class="inform-list">
            <img src="~assets/img/profile/integral.png" alt="">
            <span class="inform-list-item">积分商城</span>
        </div>
        <div class="inform-list">
            <img src="~assets/img/profile/download.png" alt="">
            <span class="inform-list-item">下载购物APP</span>
        </div>
        <div class="inform-list">
            <img src="~assets/img/profile/reset.png" alt="">
            <span class="inform-list-item">设置</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileInfo"
}
</script>

<style scoped>
.inform{
    background-color: #fff;
    margin-top: 10px;
}
.inform-list{
    height: 44px;
    line-height: 44px;
    position: relative;
}
.inform-list img{
    position: absolute;
    width: 18px;
    height: 18px;
    top: 50%;
    margin-top: -9px;
    left: 15px;
}
.inform-list-item{
    display: block;
    margin-left: 40px;
    font-size: 14px;
    border-bottom: 1px solid #f5f5f5;
}
</style>