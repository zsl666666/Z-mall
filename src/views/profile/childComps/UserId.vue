<template>
    <div id="user-id">
        <a href="javascript:;" class="user-infor">
            <div class="user-photo">
                <img src="~assets/img/profile/mine2.png" alt="">
            </div>
            <div class="user-status">
                <div class="usetop"><span>登录/注册</span></div>
                <div class="usebot">
                    <img src="~assets/img/profile/user-phone.png" alt="">
                    <span>暂无绑定手机</span>
                </div>
            </div>
            <div class="right">
                <img src="~assets/img/profile/right_ri.png" alt="">
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name: "UserId"
}
</script>

<style scoped>
#user-id{
    background-color: var(--color-tint);
    padding: 15px;
}
.user-infor{
    display: flex;
    align-items: center;
    justify-content: center;
}
.user-photo img{
    width: 64px;
    height: 64px;
    background-color: #fff;
    border-radius: 50%;
    padding: 3px;
}
.user-status{
    color: #fff;
    flex: 1;
    margin-left: 8px;
    line-height: 24px;
}
.right img{
    width: 25px;
    height: 25px;
}
.usetop{
    padding-left: 6px;
    
}
.usebot{
    display: flex;
    align-items: center;
}
.usebot img{
    width: 25px;
    height: 22px;
}
.usebot span{
    font-size: 14px;
    color: #fff7f7;
}
</style>